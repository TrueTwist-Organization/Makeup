import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';


const FloatingShapes = () => {
  return (
    <>
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[4, 2, -2]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <MeshWobbleMaterial color="#FF758F" speed={1} factor={0.6} roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={4} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-5, -1, -1]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial color="#C9184A" speed={2} distort={0.5} roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[6, -2, -3]}>
          <torusGeometry args={[0.4, 0.15, 32, 64]} />
          <meshStandardMaterial color="#FFB3C1" metalness={1} roughness={0.1} />
        </mesh>
      </Float>
    </>

  );
};

const Hero3D = ({ mousePos = { x: 0, y: 0 } }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      zIndex: 0, 
      pointerEvents: 'none',
      opacity: 0.95
    }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
        <Environment preset="night" />
        
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        
        <FloatingShapes />
        
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.3} 
          scale={15} 
          blur={2.8} 
          far={5} 
        />
      </Canvas>
    </div>
  );
};

export default Hero3D;
