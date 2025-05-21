import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three'; 


import AnimatedLaptop from './components/AnimatedLaptop';


const Scene = () => {
  // Reference to the camera for zoom animation
  const { camera } = useThree();
  const initialCameraPosition = useRef(new THREE.Vector3(0, 0, 800));
  const targetCameraPosition = useRef(new THREE.Vector3(0, 10, 280)); // Zoomed in position
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
  }
);

  return (
    <>      
      <ambientLight intensity={0.05} />
      <AnimatedLaptop position={[0, -20, 0]} initialRotation={[0, 0, 0]} />
      <directionalLight position={[0, 40, 0]} intensity={0.5} color="white"  />
    </>
  );
};

const App = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'rgb(15, 12, 12)' }}>
        <PerspectiveCamera position={[0,50,500]} makeDefault fov={35} near={0.1} far={1000} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Scene/>
      </Canvas>
    </div>
  );
};

export default App;