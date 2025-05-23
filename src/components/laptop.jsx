import { useGLTF } from '@react-three/drei'
import { Plane } from '@react-three/drei'
import { EffectComposer, Bloom, Selection, Select } from '@react-three/postprocessing'
import VideoMaterial from './VideoMaterial'
import videoSrc from '/Screen.mp4'

const laptop = new URL('/src/assets/Laptop.glb', import.meta.url).href

export function Model(props) {
  const { nodes, materials } = useGLTF(laptop)
  
  return (
    <>
       
        
        
        <group {...props} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ChamferBox017_1.geometry}
            material={materials['03___Default']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ChamferBox017_1_1.geometry}
            material={materials['05___Default']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ChamferBox017_1_2.geometry}
            material={materials['01___Default']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ChamferBox017_1_3.geometry}
            material={materials['04___Default']}
          />
     
           <VideoMaterial url={videoSrc} glowIntensity={2.5}/>
        </group>
       
    </>
  )
}

useGLTF.preload(laptop)

export default Model;