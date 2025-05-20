import {useFrame, useLoader } from "@react-three/fiber";
import { useRef,} from "react";
import * as THREE from 'three';

import meImage from '/src/assets/me.png';
import meImage2 from '/src/assets/me2.png';
import leaf from '/src/assets/l4.png';

const Me = () => {
  const meshRef = useRef();
  
  // Load texture using the useLoader hook
  const texture = useLoader(THREE.TextureLoader, meImage);
  const texture2 = useLoader(THREE.TextureLoader, meImage2);
  const texture3 = useLoader(THREE.TextureLoader, leaf);

  

  // Create materials array for different parts of the cylinder
  // CylinderGeometry materials order: [side surface, top cap, bottom cap]
  const materials = [
    new THREE.MeshStandardMaterial({ map: texture3}), // Side surface (index 0)
    new THREE.MeshStandardMaterial({ map: texture }), // Top cap (index 1)
    new THREE.MeshStandardMaterial({ map: texture2 })  // Bottom cap (index 2)
  ];

  return(
    <mesh
      ref={meshRef}
      rotation={[0, Math.PI / 2, Math.PI / 2]}
      onClick={(event) => {
        console.log('Mesh clicked!');
        event.stopPropagation();
      }}
      onPointerOver={() => console.log('Hover started')}
      onPointerOut={() => console.log('Hover ended')}
    >
      <cylinderGeometry args={[1, 1, 0.05, 32]} />
      <primitive object={materials} attach="material" />
    </mesh>
  );
};

export default Me;