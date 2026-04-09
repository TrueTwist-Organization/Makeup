import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles, Wand2, CheckCircle2, RefreshCw, Eye, Camera, CameraOff, Target, Settings2, UserCircle2 } from 'lucide-react';

const ModelPage = () => {
  const [lipstickColor, setLipstickColor] = useState({ name: 'Classic Crimson', hex: '#B91D1D' });
  const [eyeshadowColor, setEyeshadowColor] = useState({ name: 'Golden Shimmer', hex: '#D4AF37' });
  const [useReference, setUseReference] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Precision Positions (Percentages) - Standard Centered Calibration
  const [eyePos, setEyePos] = useState({ x: 50, y: 38 });
  const [lipPos, setLipPos] = useState({ x: 50, y: 62 });

  const lipstickColors = [
    { name: 'Classic Crimson', hex: '#B91D1D' },
    { name: 'Dusty Rose', hex: '#D68C8C' },
    { name: 'Plum Passion', hex: '#631836' },
    { name: 'Peach Sorbet', hex: '#F9A8D4' },
    { name: 'Berry Bliss', hex: '#A21CAF' }
  ];

  const eyeshadowColors = [
    { name: 'Golden Shimmer', hex: '#D4AF37' },
    { name: 'Deep Bronze', hex: '#804A00' },
    { name: 'Soft Mauve', hex: '#A38E92' },
    { name: 'Ocean Mist', hex: '#779ECB' },
    { name: 'Emerald Velvet', hex: '#004B49' }
  ];

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(newStream);
      setIsCameraActive(true);
      setUseReference(false);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Please allow camera access to use the live test model.");
    }
  };

  useEffect(() => {
    if (isCameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraActive, stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraActive(false);
    setUseReference(true);
  };

  const notifyChange = (type, color) => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 800);
  };

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }}>
        
        {/* Left Side: Media Window */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="glass-card" style={{ padding: '0.8rem', borderRadius: '32px', position: 'relative' }}>
             <div style={{ 
               position: 'relative', 
               height: '700px', 
               background: '#0a0a0a', 
               borderRadius: '24px', 
               overflow: 'hidden',
               boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)'
             }}>
                {useReference ? (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                     <img 
                       src="/reference_model.png" 
                       alt="Reference Model" 
                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                     <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                        <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800' }}>
                           REFERENCE MODE ACTIVE
                        </div>
                     </div>
                  </div>
                ) : (
                  !isCameraActive ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                       <CameraOff size={44} color="rgba(255,255,255,0.1)" />
                       <button className="btn btn-primary" onClick={startCamera}>INITIALIZE CAMERA</button>
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <video 
                        ref={videoRef} autoPlay playsInline muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
                      />
                      {/* Face Alignment Guide Overlay */}
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: 0.4 }}>
                         <div style={{ width: '50%', height: '60%', border: '2px dashed rgba(255,255,255,0.4)', borderRadius: '50%', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '40%', left: '0', width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                            <div style={{ position: 'absolute', top: '70%', left: '20%', width: '60%', height: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                         </div>
                      </div>
                      <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', color: 'white', fontSize: '0.7rem', fontWeight: '800', opacity: 0.8 }}>
                         ALIGN FACE WITHIN THE GUIDE FOR ACCURACY
                      </div>
                    </div>
                  )
                )}

                {/* AR Precision Mask (Applies to both modes) */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                   {/* Eyeshadow Mask */}
                   <motion.div 
                      drag={isCalibrating} dragMomentum={false}
                      onDrag={(e, info) => {
                         const container = e.target.parentElement;
                         const rect = container.getBoundingClientRect();
                         setEyePos({ x: ((info.point.x - rect.left) / rect.width) * 100, y: ((info.point.y - rect.top) / rect.height) * 100 });
                      }}
                       style={{
                         position: 'absolute', top: `${eyePos.y}%`, left: `${eyePos.x}%`, 
                         width: '26%', height: '6%', transform: 'translate(-50%, -50%)',
                         background: `radial-gradient(ellipse at 50% 50%, ${eyeshadowColor.hex}FF 0%, ${eyeshadowColor.hex}44 60%, transparent 100%)`,
                         mixBlendMode: 'soft-light', filter: 'blur(6px)', opacity: 0.8,
                         border: isCalibrating ? '2px solid white' : 'none',
                         pointerEvents: isCalibrating ? 'auto' : 'none',
                         zIndex: 5
                      }}
                   />
                    /* High-Precision Lipstick Mask with Gloss Overlay */
                    <motion.div 
                       drag={isCalibrating} dragMomentum={false}
                       onDrag={(e, info) => {
                          const container = e.target.parentElement;
                          const rect = container.getBoundingClientRect();
                          setLipPos({ x: ((info.point.x - rect.left) / rect.width) * 100, y: ((info.point.y - rect.top) / rect.height) * 100 });
                       }}
                       style={{
                          position: 'absolute', top: `${lipPos.y}%`, left: `${lipPos.x}%`, 
                          width: '12%', height: '5.2%', transform: 'translate(-50%, -50%)',
                          background: lipstickColor.hex,
                          mixBlendMode: 'multiply', opacity: 0.9,
                          border: isCalibrating ? '3px solid white' : 'none',
                          /* Refined 16-point High-Fidelity Lip Polygon */
                          clipPath: 'polygon(5% 50%, 15% 35%, 25% 22%, 35% 18%, 45% 22%, 50% 28%, 55% 22%, 65% 18%, 75% 22%, 85% 35%, 95% 50%, 90% 75%, 75% 92%, 50% 98%, 25% 92%, 10% 75%)',
                          filter: 'blur(1.2px)',
                          pointerEvents: isCalibrating ? 'auto' : 'none',
                          zIndex: 6,
                          boxShadow: `inset 0 0 10px rgba(0,0,0,0.5)`
                       }}
                    >
                       {/* Gloss Highlight Layer */}
                       <div style={{
                          position: 'absolute', top: '15%', left: '20%', width: '60%', height: '20%',
                          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
                          borderRadius: '50%', filter: 'blur(1px)', opacity: 0.6
                       }} />
                       <div style={{
                          position: 'absolute', bottom: '15%', left: '25%', width: '50%', height: '15%',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%', filter: 'blur(1px)', opacity: 0.4
                       }} />
                    </motion.div>
                </div>

                <AnimatePresence>
                  {isProcessing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(4px)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <RefreshCw size={50} color="var(--highlight-pink)" style={{ animation: 'spin 1s linear infinite' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </motion.div>

        {/* Right Side: Setup Controls */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
             <button 
               onClick={() => { setUseReference(true); stopCamera(); }}
               style={{ background: useReference ? 'var(--primary-makeup)' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '800', transition: 'all 0.3s' }}
             >
                <UserCircle2 size={18} /> REFERENCE MODEL
             </button>
             <button 
               onClick={startCamera}
               style={{ background: isCameraActive ? 'var(--primary-makeup)' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '800', transition: 'all 0.3s' }}
             >
                <Camera size={18} /> LIVE CAMERA
             </button>
          </div>

          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: '900' }}>PRECISION <span className="highlight">TEST</span></h2>
          
          <div className="glass-card" style={{ marginBottom: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--highlight-pink)', fontWeight: '900', marginBottom: '1rem', textTransform: 'uppercase' }}>PROMPT INSTRUCTIONS</p>
            <div style={{ 
              color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', borderLeft: '3px solid var(--primary-makeup)', paddingLeft: '1.5rem', fontStyle: 'italic'
            }}>
              "Apply a realistic lipstick only on the lips using accurate lip masking and segmentation. Ensure the color stays strictly within the lip contour with clean, sharp edges. Blend smoothly for a natural finish while preserving lip texture and details. Do not apply color outside the lips or affect surrounding skin. Maintain original lighting and facial structure."
            </div>
            <p style={{ marginTop: '1.2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
               Skin tone, lighting, and facial features are maintained for professional realism.
            </p>
          </div>

          {/* Makeup Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <div>
                <p style={{ fontWeight: '900', fontSize: '0.75rem', marginBottom: '1.2rem', color: 'white' }}>LIP SHADE</p>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                   {lipstickColors.map(color => (
                     <button 
                       key={color.name} onClick={() => { setLipstickColor(color); notifyChange(); }}
                       style={{ width: '40px', height: '40px', background: color.hex, borderRadius: '50%', cursor: 'pointer', border: lipstickColor.name === color.name ? '3px solid white' : '1px solid rgba(255,255,255,0.1)', boxShadow: lipstickColor.name === color.name ? `0 0 15px ${color.hex}88` : 'none', transition: 'all 0.3s' }}
                     />
                   ))}
                </div>
             </div>
             
             <div>
                <p style={{ fontWeight: '900', fontSize: '0.75rem', marginBottom: '1.2rem', color: 'white' }}>EYE SHADE</p>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                   {eyeshadowColors.map(color => (
                     <button 
                       key={color.name} onClick={() => { setEyeshadowColor(color); notifyChange(); }}
                       style={{ width: '40px', height: '40px', background: color.hex, borderRadius: '50%', cursor: 'pointer', border: eyeshadowColor.name === color.name ? '3px solid white' : '1px solid rgba(255,255,255,0.1)', boxShadow: eyeshadowColor.name === color.name ? `0 0 15px ${color.hex}88` : 'none', transition: 'all 0.3s' }}
                     />
                   ))}
                </div>
             </div>
          </div>

          <div style={{ marginTop: '3.5rem', display: 'flex', gap: '1.5rem' }}>
             <button 
               onClick={() => setIsCalibrating(!isCalibrating)}
               style={{ flex: 1, background: isCalibrating ? 'var(--highlight-pink)' : 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '1rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}
             >
                <Settings2 size={16} /> {isCalibrating ? 'LOCK ALIGNMENT' : 'MANUAL CALIBRATE'}
             </button>
             <div className="glass" style={{ flex: 1, padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>
                <CheckCircle2 size={16} color="#10B981" /> REALISTIC BLEND
             </div>
          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ModelPage;
