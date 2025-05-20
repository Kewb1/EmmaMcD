import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import * as THREE from 'three'; 
import { useFrame, useThree } from "@react-three/fiber";
import Typing3DText from './components/Typing3DText';
//import Typing3DText2 from './components/Typing3DText2';

import Laptop from './components/laptop';

const CameraLogger = () => {
  const { camera } = useThree();
  const prevPosRef = useRef(camera.position.clone());
  
  useFrame(() => {
    // Only log if position has changed significantly
    if (!camera.position.equals(prevPosRef.current)) {
      console.log('Camera position:', {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      });
      prevPosRef.current.copy(camera.position);
    }
  });
  
  return null;
};

// Enhanced laptop component that handles rotation animation
const AnimatedLaptop = ({ position, initialRotation }) => {
  const laptopRef = useRef();
  const rotationTargetRef = useRef(new THREE.Euler(
    initialRotation[0] + (Math.PI / 18), // 10 degrees in radians on X axis
    initialRotation[1],
    initialRotation[2]
  ));
  const animationStartTimeRef = useRef(Date.now() / 1000); // Start immediately
  const animationDurationRef = useRef(1.5); // Animation duration in seconds

  // Handle animation in the render loop
  useFrame(() => {
    if (!laptopRef.current) return;
    
    const currentTime = Date.now() / 1000;
    const elapsedTime = currentTime - animationStartTimeRef.current;
    const progress = Math.min(elapsedTime / animationDurationRef.current, 1);
    
    // Smooth easing function
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);
    
    // Interpolate rotation
    laptopRef.current.rotation.x = THREE.MathUtils.lerp(
      initialRotation[0],
      rotationTargetRef.current.x,
      easedProgress
    );
  });

  return <Laptop ref={laptopRef} position={position} rotation={initialRotation} />;
};

const Scene = () => {
  // Reference to the camera for zoom animation
  const { camera } = useThree();
  const initialCameraPosition = useRef(new THREE.Vector3(0, 0, 800));
  const targetCameraPosition = useRef(new THREE.Vector3(0, 10, 200)); // Zoomed in position
  const animationStartTime = useRef(Date.now() / 1000);
  const animationDuration = useRef(1.5); // Match laptop rotation duration
  
  // Handle camera zoom animation
  useFrame(() => {
    const currentTime = Date.now() / 1000;
    const elapsedTime = currentTime - animationStartTime.current;
    const progress = Math.min(elapsedTime / animationDuration.current, 1);
    
    // Same easing function as the laptop rotation for consistency
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);
    
    // Interpolate camera position for zoom effect
    camera.position.lerpVectors(
      initialCameraPosition.current,
      targetCameraPosition.current,
      easedProgress
    );
  });

  return (
    <>
      <OrbitControls enableZoom enablePan enableRotate />
      <ambientLight intensity={0.5} />
      <AnimatedLaptop position={[0, -20, 0]} initialRotation={[0, 0, 0]} />
      <directionalLight position={[0, 10, 5]} intensity={1} color="white" />
      {/* <Floor /> */}
    </>
  );
};

const App = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'rgb(15, 12, 12)' }}>
        <PerspectiveCamera makeDefault fov={35} near={0.1} far={1000} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default App;