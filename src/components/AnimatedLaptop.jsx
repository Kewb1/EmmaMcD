import Laptop from './laptop'
import { useRef } from "react";
import * as THREE from 'three'; 
import { useFrame } from "@react-three/fiber";

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


export default AnimatedLaptop;