import React, { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useDropzone } from 'react-dropzone';
import * as faceapi from '@vladmandic/face-api';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  ChevronDown,
  X,
  Palette,
  RefreshCcw,
  Eye,
  Smile,
  Sun,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants ---
const PRIMARY_COLOR = "#e91e63";

const DraggablePin = ({ x, y, onDrag, color, hidden }) => {
  const [isDragging, setIsDragging] = useState(false);
  if (hidden) return null;

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - rect.top) / rect.height) * 100;
    onDrag(Math.max(0, Math.min(100, newX)), Math.max(0, Math.min(100, newY)));
  }, [isDragging, onDrag]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: '18px',
        height: '18px',
        background: color,
        border: '3px solid white',
        borderRadius: '50%',
        cursor: 'move',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        zIndex: 50,
        transition: 'transform 0.1s ease'
      }}
    />
  );
};

const StudioUI = ({ initialImage, onReset, initialMode = 'photo' }) => {
  const [mode, setMode] = useState(initialMode);
  const [image, setImage] = useState(initialImage);
  const [activeTab, setActiveTab] = useState('lips');
  const [lipstickColor, setLipstickColor] = useState('#e91e63');
  const [eyeshadowColor, setEyeshadowColor] = useState('#880e4f');
  const [blushColor, setBlushColor] = useState('#ff8a80');
  const [skinGlow, setSkinGlow] = useState(0.2);
  const [opacity, setOpacity] = useState(0.65);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isAiDetectionActive, setIsAiDetectionActive] = useState(true);
  
  const webcamRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [pins, setPins] = useState([
    { id: 'left', x: 38, y: 62, color: '#3b82f6' },
    { id: 'right', x: 62, y: 62, color: '#3b82f6' },
    { id: 'top', x: 50, y: 58, color: '#10b981' },
    { id: 'bottom', x: 50, y: 72, color: '#ef4444' },
    { id: 'cupid-l', x: 46, y: 59, color: '#f59e0b' },
    { id: 'cupid-r', x: 54, y: 59, color: '#f59e0b' },
    { id: 'eye-l', x: 40, y: 40, color: '#8b5cf6' },
    { id: 'eye-r', x: 60, y: 40, color: '#8b5cf6' },
    { id: 'cheek-l', x: 35, y: 55, color: '#f43f5e' },
    { id: 'cheek-r', x: 65, y: 55, color: '#f43f5e' }
  ]);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://raw.githubusercontent.com/vladmandic/face-api/master/model/';
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
        setIsLoading(false);
      } catch (err) {
        console.error("Neural core error:", err);
        setIsLoading(false);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    let interval;
    if (modelsLoaded && isAiDetectionActive) {
      interval = setInterval(async () => {
        let source;
        if (mode === 'camera' && webcamRef.current?.video) {
          source = webcamRef.current.video;
        } else if (mode === 'photo') {
          source = document.getElementById('studio-image');
        }

        if (source) {
          const result = await faceapi.detectSingleFace(source).withFaceLandmarks();
          if (result) {
            const dims = { width: source.width || source.videoWidth, height: source.height || source.videoHeight };
            const landmarks = result.landmarks.positions;
            const mapPoint = (idx) => ({
              x: (landmarks[idx].x / dims.width) * 100,
              y: (landmarks[idx].y / dims.height) * 100
            });

            setPins([
              { id: 'left', color: '#3b82f6', ...mapPoint(48) },
              { id: 'right', color: '#3b82f6', ...mapPoint(54) },
              { id: 'top', color: '#10b981', ...mapPoint(51) },
              { id: 'bottom', color: '#ef4444', ...mapPoint(57) },
              { id: 'cupid-l', color: '#f59e0b', ...mapPoint(50) },
              { id: 'cupid-r', color: '#f59e0b', ...mapPoint(52) },
              { id: 'eye-l', color: '#8b5cf6', ...mapPoint(37) },
              { id: 'eye-r', color: '#8b5cf6', ...mapPoint(44) },
              { id: 'cheek-l', color: '#f43f5e', ...mapPoint(2) },
              { id: 'cheek-r', color: '#f43f5e', ...mapPoint(14) }
            ]);
          }
        }
      }, mode === 'camera' ? 100 : 500);
    }
    return () => clearInterval(interval);
  }, [modelsLoaded, isAiDetectionActive, mode]);

  const updatePin = (id, x, y) => {
    setPins(p => p.map(pin => pin.id === id ? { ...pin, x, y } : pin));
  };

  const getLipPath = () => {
    const p = pins.reduce((acc, pin) => ({ ...acc, [pin.id]: pin }), {});
    if (!p.left) return "";
    return `M ${p.left.x} ${p.left.y} 
            Q ${p['cupid-l'].x} ${p['cupid-l'].y - 1.5}, ${p.top.x} ${p.top.y}
            Q ${p['cupid-r'].x} ${p['cupid-r'].y - 1.5}, ${p.right.x} ${p.right.y}
            Q ${p.bottom.x} ${p.bottom.y + 4}, ${p.left.x} ${p.left.y} Z`;
  };

  const getEyePath = (side) => {
    const p = side === 'l' ? pins.find(pi => pi.id === 'eye-l') : pins.find(pi => pi.id === 'eye-r');
    if (!p) return "";
    return `M ${p.x - 3} ${p.y - 1} 
            C ${p.x - 2} ${p.y - 5}, ${p.x + 2} ${p.y - 5}, ${p.x + 3} ${p.y - 1}
            C ${p.x + 2} ${p.y + 1}, ${p.x - 2} ${p.y + 1}, ${p.x - 3} ${p.y - 1} Z`;
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }}>
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}
        >
          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={onReset} className="btn-secondary" style={{ padding: '12px' }}>
              <X size={24} />
            </button>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>AI Pro Studio</h2>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                 <span className="badge" style={{ fontSize: '0.7rem' }}>{mode.toUpperCase()} MODE</span>
                 <span className="badge" style={{ fontSize: '0.7rem', background: '#10b98120', color: '#10b981' }}>CALIBRATION: {isCalibrating ? 'OPEN' : 'LOCKED'}</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }} style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn-secondary" 
              onClick={() => {
                const newMode = mode === 'photo' ? 'camera' : 'photo';
                setMode(newMode);
                if (newMode === 'photo' && (image === true || !image)) {
                  setImage('/photo-model.png');
                }
                setIsAiDetectionActive(false);
              }}
              style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
            >
              <RefreshCcw size={18} /> Switch to {mode === 'photo' ? 'Live Camera' : 'Photo'}
            </button>
            <button className="btn-primary" onClick={() => alert("Image saved to gallery!")}>
              <Download size={20} /> Export Transformation
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="studio-layout"
        >
          <div className="glass studio-workspace" style={{ 
            position: 'relative', overflow: 'hidden', minHeight: '650px', 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: '#0f172a', borderRadius: '32px'
          }}>
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'absolute', inset: 0, zIndex: 100, background: 'rgba(15,23,42,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ color: PRIMARY_COLOR, marginBottom: '24px' }}><RefreshCcw size={64} /></motion.div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Initializing Neural Core...</h3>
                </motion.div>
              )}
            </AnimatePresence>

             <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '95%', maxHeight: '80vh', borderRadius: '16px', overflow: 'hidden' }}>
                {mode === 'photo' ? (
                  <img id="studio-image" src={image} alt="Model" style={{ width: '100%', height: 'auto', display: 'block' }} />
                ) : (
                  <Webcam ref={webcamRef} videoConstraints={{ facingMode: "user" }} style={{ width: '100%', height: 'auto', display: 'block' }} />
                )}
                
                 <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                      <defs>
                        <radialGradient id="skinGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="white" stopOpacity={skinGlow} />
                          <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      {activeTab === 'skin' && (
                        <>
                          <circle cx="50" cy="35" r="15" fill="url(#skinGlow)" style={{ mixBlendMode: 'screen' }} />
                          <circle cx="35" cy="55" r="10" fill="url(#skinGlow)" style={{ mixBlendMode: 'screen' }} />
                          <circle cx="65" cy="55" r="10" fill="url(#skinGlow)" style={{ mixBlendMode: 'screen' }} />
                        </>
                      )}
                      <path d={getEyePath('l')} fill={eyeshadowColor} style={{ opacity: opacity * 0.8, mixBlendMode: 'multiply', filter: 'blur(1.5px)' }} />
                      <path d={getEyePath('r')} fill={eyeshadowColor} style={{ opacity: opacity * 0.8, mixBlendMode: 'multiply', filter: 'blur(1.5px)' }} />
                      {pins.filter(p => p.id.includes('cheek')).map(p => (
                        <circle key={p.id} cx={p.x} cy={p.y} r="10" fill={blushColor} style={{ opacity: opacity * 0.5, mixBlendMode: 'multiply', filter: 'blur(4px)' }} />
                      ))}
                      <path d={getLipPath()} fill={lipstickColor} style={{ opacity: opacity, mixBlendMode: 'multiply', filter: 'blur(0.5px)' }} />
                    </svg>
                   {!isLoading && isCalibrating && pins.filter(p => {
                     if (activeTab === 'lips') return ['left', 'right', 'top', 'bottom', 'cupid-l', 'cupid-r'].includes(p.id);
                     if (activeTab === 'eyes') return ['eye-l', 'eye-r'].includes(p.id);
                     if (activeTab === 'face') return ['cheek-l', 'cheek-r'].includes(p.id);
                     return false;
                   }).map(pin => (
                     <DraggablePin key={pin.id} {...pin} onDrag={(x, y) => updatePin(pin.id, x, y)} />
                   ))}
                </div>
             </div>
          </div>

          <div className="studio-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', gap: '8px', padding: '4px', background: '#f8fafc', borderRadius: '12px', marginBottom: '24px' }}>
                {[
                  { id: 'lips', icon: Heart, label: 'Lips' },
                  { id: 'eyes', icon: Eye, label: 'Eyes' },
                  { id: 'face', icon: Smile, label: 'Face' },
                  { id: 'skin', icon: Sun, label: 'Skin' }
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px 0', border: 'none', borderRadius: '8px', cursor: 'pointer', background: activeTab === tab.id ? 'white' : 'transparent', color: activeTab === tab.id ? PRIMARY_COLOR : '#64748b', transition: 'all 0.2s', fontWeight: 600 }}>
                    <tab.icon size={18} /><span style={{ fontSize: '0.65rem' }}>{tab.label}</span>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Palette size={18} color={PRIMARY_COLOR} /><h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{activeTab.toUpperCase()} KIT</h4></div>
                 <button onClick={() => setIsCalibrating(!isCalibrating)} style={{ background: isCalibrating ? PRIMARY_COLOR : '#f1f5f9', color: isCalibrating ? 'white' : '#64748b', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>{isCalibrating ? 'LOCK' : 'EDIT'}</button>
              </div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', color: '#64748b' }}>COLOR PALETTE</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '24px' }}>
                {(activeTab === 'lips' ? ['#e91e63', '#c2185b', '#880e4f', '#f06292', '#8e24aa', '#d32f2f', '#ff5252', '#ff8a80', '#e65100', '#fb8c00'] : activeTab === 'eyes' ? ['#4a148c', '#311b92', '#1a237e', '#01579b', '#004d40', '#1b5e20', '#33691e', '#827717', '#f57f17', '#ff6f00'] : ['#ff8a80', '#ff80ab', '#ea80fc', '#b388ff', '#8c9eff', '#82b1ff', '#80d8ff', '#84ffff', '#a7ffeb', '#b9f6ca']).map(color => (
                    <button key={color} onClick={() => { if (activeTab === 'lips') setLipstickColor(color); else if (activeTab === 'eyes') setEyeshadowColor(color); else setBlushColor(color); }} style={{ width: '100%', paddingTop: '100%', borderRadius: '50%', background: color, border: 'none', cursor: 'pointer', boxShadow: (activeTab === 'lips' ? lipstickColor : activeTab === 'eyes' ? eyeshadowColor : blushColor) === color ? `0 0 0 2px white, 0 0 0 4px ${PRIMARY_COLOR}` : 'none', transition: 'transform 0.2s', transform: (activeTab === 'lips' ? lipstickColor : activeTab === 'eyes' ? eyeshadowColor : blushColor) === color ? 'scale(1.1)' : 'scale(1)' }} />
                ))}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{activeTab === 'skin' ? 'Skin Radiance' : 'Color Depth'}</span><span style={{ fontSize: '0.95rem', color: PRIMARY_COLOR, fontWeight: 800 }}>{Math.round((activeTab === 'skin' ? skinGlow : opacity) * 100)}%</span></div>
                <input type="range" min="0" max="1" step="0.01" value={activeTab === 'skin' ? skinGlow : opacity} onChange={(e) => activeTab === 'skin' ? setSkinGlow(parseFloat(e.target.value)) : setOpacity(parseFloat(e.target.value))} style={{ width: '100%', accentColor: PRIMARY_COLOR }} />
              </div>
            </div>
            <div className="glass" style={{ padding: '24px', background: `${PRIMARY_COLOR}05` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}><Sparkles size={22} color={PRIMARY_COLOR} /><h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Neural Tracking</h3></div>
              <button onClick={() => setIsAiDetectionActive(!isAiDetectionActive)} className={isAiDetectionActive ? "btn-primary" : "btn-secondary"} style={{ width: '100%', fontWeight: 700 }}>{isAiDetectionActive ? "Stop AI Core" : "Enable Auto-Detection"}</button>
            </div>
          </div>
        </motion.div>
    </div>
  );
};

export default function Studio() {
  const [session, setSession] = useState({ image: null, mode: 'photo' });
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setSession({ image: reader.result, mode: 'photo' });
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []}, multiple: false });

  if (session.image) {
    return <StudioUI initialImage={session.image} initialMode={session.mode} onReset={() => setSession({ image: null, mode: 'photo' })} />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.span variants={itemVariants} className="badge" style={{ display: 'inline-block', marginBottom: '1rem' }}>SECURED • PHOTOREALISTIC • FREE</motion.span>
        <motion.h1 variants={itemVariants} style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.06em' }}>AI Pro Studio</motion.h1>
        
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px' }}>
           <button className="btn btn-primary" style={{ height: '64px', fontSize: '1.1rem', padding: '0 40px' }} onClick={() => setSession({ image: true, mode: 'camera' })}>
             <Camera size={24} style={{ marginRight: '10px' }} /> Launch Live Camera
           </button>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          {...getRootProps()} 
          className="glass-card" 
          style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 40px', border: isDragActive ? `4px dashed ${PRIMARY_COLOR}` : '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', borderRadius: '40px' }}
        >
          <input {...getInputProps()} />
          <Upload size={40} style={{ color: PRIMARY_COLOR, marginBottom: '24px' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>{isDragActive ? "Ready!" : "Upload Photo for AI Studio"}</h2>
          <p style={{ opacity: 0.7 }}>Drag and drop or click to browse</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
