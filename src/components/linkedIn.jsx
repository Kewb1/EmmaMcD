import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import image from '/src/assets/linked.png';

const LinkedSphere = ({ position = [0, 0, 0] }) => {
  const sphereRef = useRef();
  const movementRef = useRef(0.01);
  
  // Load the texture using THREE's TextureLoader
  const texture = useLoader(THREE.TextureLoader, image);
  
  // Optional: Add rotation and bouncing animation
  useFrame(() => {
    if (sphereRef.current) {
      // Rotate the sphere
      sphereRef.current.rotation.y += 0.005;
      
      // Move the sphere up and down
      sphereRef.current.position.y += movementRef.current;
      
      // Check boundaries and reverse direction
      // Using threshold checks instead of exact equality
      if (sphereRef.current.position.y <= -0.5) {
        movementRef.current = Math.abs(movementRef.current); // Ensure positive value
      } else if (sphereRef.current.position.y >= 0.5) {
        movementRef.current = -Math.abs(movementRef.current); // Ensure negative value
      }
    }
  });
  
  return (
    <mesh ref={sphereRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} /> {/* radius, widthSegments, heightSegments */}
      <meshStandardMaterial 
        map={texture} 
        side={THREE.FrontSide}
      />
    </mesh>
  );
};

export default LinkedSphere;