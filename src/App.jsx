import { OrbitControls } from "@react-three/drei"
import {Canvas, useFrame} from "@react-three/fiber"
import { useRef } from "react";
import { Sparkles } from "@react-three/drei";

const RotatingCube = ()=> {
  const meshRef = useRef();

  useFrame(() => {

    if(meshRef.current){
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.02;

    }
  })


  return(
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1,1,1]}  />
      <meshLambertMaterial color='#C37A52' emissive='#C37A52'/>
      <Sparkles count={100} size={6} scale={5} speed={0.002} noise={0.2} color="#FFFFFF" />
    </mesh>
  )

}

const App = () => {
  return(
    <Canvas style={{height: "100vh", width: "100vh", display: "flex", justifyContent:"center", alignItems: "center"}}>
    <OrbitControls enableZoom  enablePan enableRotate></OrbitControls>
    <directionalLight position={[1,1,1]} intensity={10} color={0x9CDBA6}/>
    <color attach="background" args={[' #F0F0F0']}/>


    <RotatingCube/>
    </Canvas>

  )
}

export default App
