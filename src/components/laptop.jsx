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
      <Selection>
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
        
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
          
          <Select enabled>
            <Plane 
              args={[99, 65, 10]} 
              rotation={[-(Math.PI / 12), 0, 0]} 
              position={[-0.5, 38, -36.4]}
            >
              <VideoMaterial url={videoSrc} glowIntensity={2.5}/>
            </Plane>
          </Select>
        </group>
      </Selection>
    </>
  )
}

useGLTF.preload(laptop)

export default Model;