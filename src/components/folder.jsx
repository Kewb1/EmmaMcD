import { EffectComposer, Bloom } from '@react-three/postprocessing'
import React, { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'

const folder = new URL('/src/assets/windows_explorer.glb', import.meta.url).href

export function Model(props) {
  const { nodes, materials } = useGLTF(folder)
  
  // Create emissive materials while preserving original colors
  const emissiveMaterials = useMemo(() => {
    const newMaterials = {}
    
    // Clone each material and make it emissive
    for (const [key, material] of Object.entries(materials)) {
      newMaterials[key] = material.clone()
      newMaterials[key].emissive = material.color.clone() // Use same color for emission
      newMaterials[key].emissiveIntensity = 0.8 // Control glow strength
    }
    
    return newMaterials
  }, [materials])
  
  return (
    <>
      <group {...props} dispose={null}>
        <group scale={0.01}>
          <group position={[20.936, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube001_Material002_0.geometry}
              material={emissiveMaterials['Material.002']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube001_Material002_0_1.geometry}
              material={emissiveMaterials['Material.002']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube001_Material003_0.geometry}
              material={emissiveMaterials['Material.003']}
            />
          </group>
          
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_Material001_0.geometry}
            material={emissiveMaterials['Material.001']}
            position={[0, 101.547, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[79.971, 100, 100]}
          />
        </group>
      </group>
      
     
    </>
  )
}

useGLTF.preload(folder)
export default Model;