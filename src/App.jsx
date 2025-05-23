import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from 'three'; 
import Stack from '@mui/material/Stack';

import ScholarBox from './components/ScholarBox';
import EducationBox from "./components/EductionBox";
import ResumeBox from "./components/ResumeBox";
import Development from "./components/Development"
import LinkBox from "./components/LinkBox";
import ProjectBox from "./components/ProjectBox";
import Icon from "./components/Icon";
import Laptop from './components/laptop';
import MaterialModal from './components/Modal';

import gitLogo from '../src/assets/github.png'
import linkedLogo from '../src/assets/linked.png';
import DeansImage from '../src/assets/DeansLogo.png';
import MTSUlogo from '../src/assets/MTSULogo.png';
import HopeImage from '../src/assets/HopeImage.png';
import CompLogo from '../src/assets/CompLogo.png';


const Scene = ({ 
  onIconClick, isModalOpen, 
  onIconClick2, isModalOpen2,
  onIconClick3, isModalOpen3, 
  onIconClick4, isModalOpen4, 
  onIconClick5, isModalOpen5, 
  onIconClick6, isModalOpen6, 
  onIconClick7, isModalOpen7
 }) => {
  
  const { camera } = useThree();
  const initialCameraPosition = useRef(new THREE.Vector3(0, 0, 800));
  const targetCameraPosition = useRef(new THREE.Vector3(0, 80, 200));
  const animationStartTime = useRef(Date.now() / 1000);
  const animationDuration = useRef(1.5);
  
  // Add refs for camera rotation
  const initialCameraRotation = useRef(new THREE.Euler(0, 0, 0));
  const targetCameraRotation = useRef(new THREE.Euler(0, Math.PI / 6, Math.PI / 20)); // Rotate as specified
  const rotationAnimationStartTime = useRef(null);
  const rotationAnimationDuration = useRef(1.0); 

  // Watch both modal states for camera rotation
  const anyModalOpen = isModalOpen || isModalOpen2 || isModalOpen3 || isModalOpen4 || isModalOpen5 || isModalOpen6 || isModalOpen7;
  const previousAnyModalOpen = useRef(false);
  
  // When any modal state changes, update the rotation animation start time
  useEffect(() => {
    // Only start a new animation if the state actually changed
    if (anyModalOpen !== previousAnyModalOpen.current) {
      rotationAnimationStartTime.current = Date.now() / 1000;
      previousAnyModalOpen.current = anyModalOpen;
    }
  }, [anyModalOpen]);
  
  useFrame(() => {
    const currentTime = Date.now() / 1000;
    
    // Initial camera position animation
    const elapsedTime = currentTime - animationStartTime.current;
    const progress = Math.min(elapsedTime / animationDuration.current, 1);
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);
    
    camera.position.lerpVectors(
      initialCameraPosition.current,
      targetCameraPosition.current,
      easedProgress
    );
    
    // Handle camera rotation when any modal state changes
    if (rotationAnimationStartTime.current) {
      const rotationElapsedTime = currentTime - rotationAnimationStartTime.current;
      const rotationProgress = Math.min(rotationElapsedTime / rotationAnimationDuration.current, 1);
      const rotationEasedProgress = easeOutCubic(rotationProgress);
      
      // Determine start and end rotations based on any modal being open
      const startYRotation = anyModalOpen ? initialCameraRotation.current.y : targetCameraRotation.current.y;
      const endYRotation = anyModalOpen ? targetCameraRotation.current.y : initialCameraRotation.current.y;
      
      const startZRotation = anyModalOpen ? initialCameraRotation.current.z : targetCameraRotation.current.z;
      const endZRotation = anyModalOpen ? targetCameraRotation.current.z : initialCameraRotation.current.z;
      
      // Interpolate both y and z rotations
      const newYRotation = THREE.MathUtils.lerp(
        startYRotation,
        endYRotation,
        rotationEasedProgress
      );

      const newZRotation = THREE.MathUtils.lerp(
        startZRotation,
        endZRotation,
        rotationEasedProgress
      );
      
      // Apply the rotation
      camera.rotation.y = newYRotation;
      camera.rotation.z = newZRotation;
    }
  });

  return (
    <>          
      <ambientLight intensity={0.05} />
      <Laptop position={[0, -20, 0]} initialRotation={[0, 0, 0]} />
      <Icon 
        text="About me" 
        position={[-39, 47, -20]} 
        rotation={[0, (Math.PI / 2), (Math.PI / 2)]} 
        scale={[2, 2, 2]}
        onIconClick={() => {
          console.log("Icon clicked!");
          onIconClick();
        }}
      /> 
      <Icon 
        text="Projects" 
        position={[38, 47, -20]} 
        rotation={[0, (Math.PI / 2), (Math.PI / 2)]} 
        scale={[2, 2, 2]}
        onIconClick={() => {
          console.log("Icon clicked!");
          onIconClick2();
        }}
      /> 
      <Icon 
        text="Awards" 
        position={[-39, 27, -20]} 
        rotation={[0, (Math.PI / 2), (Math.PI / 2)]} 
        scale={[2, 2, 2]}
        onIconClick={() => {
          console.log("Icon clicked!");
          onIconClick3();
        }}
      /> 
      <Icon 
        text="Education" 
        position={[-39, 17, -20]} 
        rotation={[0, (Math.PI / 2), (Math.PI / 2)]} 
        scale={[2, 2, 2]}
        onIconClick={() => {
          console.log("Icon clicked!");
          onIconClick4();
        }}
      /> 
      <Icon 
        text="Resume" 
        position={[-39, 7, -20]} 
        rotation={[0, (Math.PI / 2), (Math.PI / 2)]} 
        scale={[2, 2, 2]}
        onIconClick={() => {
          console.log("Icon clicked!");
          onIconClick5();
        }}
      /> 
      <Icon 
        text="Volenteering" 
        position={[-39, 37, -20]} 
        rotation={[0, (Math.PI / 2), (Math.PI / 2)]} 
        scale={[2, 2, 2]}
        onIconClick={() => {
          console.log("Icon clicked!");
          onIconClick6();
        }}
      /> 
      <Icon 
        text="My links" 
        position={[38, 37, -20]} 
        rotation={[0, (Math.PI / 2), (Math.PI / 2)]} 
        scale={[2, 2, 2]}
        onIconClick={() => {
          console.log("Icon clicked!");
          onIconClick7();
        }}
      /> 
      <directionalLight position={[0, 40, 0]} intensity={0.5} color="white" />
    </>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen5, setIsModalOpen5] = useState(false);
  const [isModalOpen6, setIsModalOpen6] = useState(false);
  const [isModalOpen7, setIsModalOpen7] = useState(false);
  
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCloseModal2= () => {
    setIsModalOpen2(false);
  };

  const handleOpenModal3 = () => {
    setIsModalOpen3(true);
  };

  const handleCloseModal3 = () => {
    setIsModalOpen3(false);
  };

  const handleOpenModal4 = () => {
    setIsModalOpen4(true);
  };

  const handleCloseModal4 = () => { 
    setIsModalOpen4(false);
  };

  const handleOpenModal5 = () => { 
    setIsModalOpen5(true);
  };

  const handleCloseModal5 = () => { 
    setIsModalOpen5(false);
  };

  const handleOpenModal6 = () => { 
    setIsModalOpen6(true);
  };

  const handleCloseModal6 = () => { 
    setIsModalOpen6(false);
  };

  const handleOpenModal7 = () => { 
    setIsModalOpen7(true);
  };

  const handleCloseModal7 = () => {
    setIsModalOpen7(false);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'rgb(15, 12, 12)' }}>
        <PerspectiveCamera makeDefault fov={35} near={0.1} far={1000} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Scene onIconClick={handleOpenModal} isModalOpen={isModalOpen} onIconClick2={handleOpenModal2} isModalOpen2={isModalOpen2} 
        onIconClick3={handleOpenModal3} isModalOpen3={isModalOpen3} onIconClick4={handleOpenModal4} isModalOpen4={isModalOpen4} 
        onIconClick5={handleOpenModal5} isModalOpen5={isModalOpen5} onIconClick6={handleOpenModal6} isModalOpen6={isModalOpen6} 
        onIconClick7={handleOpenModal7} isModalOpen7={isModalOpen7}
        />
      </Canvas>
      <MaterialModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="About me"
      >
        <Development/>
      </MaterialModal>
      <MaterialModal 
        isOpen={isModalOpen2} 
        onClose={handleCloseModal2}
        title="Projects"
      >
        <ProjectBox image={MTSUlogo} topText={"MTSU Study App"}
        bottomText={"A web application designed to help students at MTSU study for their CSCI classes."}
        linkText={"Github Link : https://github.com/DokkodoCode/mtsuCSCIstudy"}
        toolText={"Tech Stack : React, JavaScript, CSS"}
        positionText={"Position : Head of Frontend Development"}
        />
       
       
        
        

      </MaterialModal>
      <MaterialModal 
        isOpen={isModalOpen3} 
        onClose={handleCloseModal3}
        title="Awards and Scholarships"
        
      >
        <Stack spacing={2}>

          <ScholarBox image={DeansImage} topText="MTSU Dean's List Fall 2022" bottomText="Maintain a current semester GPA of 3.5 or above and have earned a minimum of 12 semester hours." />
          <ScholarBox image={DeansImage} topText="MTSU Dean's List Spring 2023" bottomText="Maintain a current semester GPA of 3.5 or above and have earned a minimum of 12 semester hours." />
          <ScholarBox image={DeansImage} topText="MTSU Dean's List Fall 2023" bottomText="Maintain a current semester GPA of 3.5 or above and have earned a minimum of 12 semester hours." />
          <ScholarBox image={DeansImage} topText="MTSU Dean's List Spring 2024" bottomText="Maintain a current semester GPA of 3.5 or above and have earned a minimum of 12 semester hours." />
          <ScholarBox image={DeansImage} topText="MTSU Dean's List Fall 2024" bottomText="Maintain a current semester GPA of 3.5 or above and have earned a minimum of 12 semester hours." />
          <ScholarBox image={DeansImage} topText="MTSU Dean's List Spring 2025" bottomText="Maintain a current semester GPA of 3.5 or above and have earned a minimum of 12 semester hours." />
          <ScholarBox image={MTSUlogo} topText="Presedential Scholarship" bottomText="Maintain a 3.5 GPA and achieve ACT score between 25 and 29." />
          <ScholarBox image={HopeImage} topText="Hope Scholarship" bottomText="Receive at least a 21 on their ACT or a 1060 on the SAT or have a 3.0 or above GPA" />
          <ScholarBox image={CompLogo} topText="Computer Science Department Scholarship" bottomText="Given to a senior Computer Science major for high academic achievement." />

        </Stack>
      </MaterialModal>
      <MaterialModal 
        isOpen={isModalOpen4} 
        onClose={handleCloseModal4}
        title="Education"
      >
        


        <EducationBox image={MTSUlogo} topText={"Bachelor of Science | Computer Science"}
    
        dateText={"08/2022 - 05/2025"}
        locationText={"Middle Tennessee State University"}/>
        
      </MaterialModal>
      <MaterialModal 
        isOpen={isModalOpen5} 
        onClose={handleCloseModal5}
        title="Resume" >
        <ResumeBox topText={"Updated as of 5/22/2025"} linkUrl={"https://app.enhancv.com/share/69c47e0e/?utm_medium=growth&utm_campaign=share-resume&utm_source=dynamic"}/>
      </MaterialModal>
      <MaterialModal 
        isOpen={isModalOpen6} 
        onClose={handleCloseModal6}
        title="Volunteering"
      >
      <Development/>
      </MaterialModal>
      <MaterialModal 
        isOpen={isModalOpen7} 
        onClose={handleCloseModal7}
        title="My Links"
      >
      <Stack direction="row" spacing={2}>
        <LinkBox image={linkedLogo} linkUrl={"https://www.linkedin.com/in/emmaline-mcdonald-62b306348"}/>
        <LinkBox image={gitLogo} linkUrl={"https://www.github.com/Kewb1"}/>
        </Stack>

      </MaterialModal>
    </div>
  );
};

export default App;