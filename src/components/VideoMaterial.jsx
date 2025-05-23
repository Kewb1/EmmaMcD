import { useVideoTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { Plane } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const VideoMaterial = ({ url }) => {
    // Create a ref to access the video element
    const videoRef = useRef();
    var hasplayed = false;
    
    // Configure the video texture with proper audio settings
    const videoTexture = useVideoTexture(url, {
        loop: false,
        unsuspend: 'canplay',
        muted: false, // Set initial muted state here
    });
    
    // Access the underlying HTML video element to ensure audio works
    useEffect(() => {
        if (videoTexture.source?.data) {
            const videoElement = videoTexture.source.data;
            videoRef.current = videoElement;
            
            // Set up one-time event listeners for user interaction
            const handleUserInteraction = () => {
                // Only try to play if it's not already playing
                if (videoElement.paused && !hasplayed) {
                    hasplayed = true;
                    videoElement.muted = false;
                    videoElement.volume = 1.0;
                    videoElement.play().catch(e => console.log("Play failed:", e));
                }
                
                // Clean up once interaction happens
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
            };
            
            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('touchstart', handleUserInteraction);
            
            return () => {
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
            };
        }
    }, [videoTexture]);
    
    return (
        <>
        <Plane  args={[99, 65, 10]}  rotation={[-(Math.PI / 12), 0, 0]}   position={[-0.5, 38, -36.4]} >
        <meshStandardMaterial 
            map={videoTexture} 
            emissive={new THREE.Color(0xffffff)} 
            emissiveIntensity={1} 
            emissiveMap={videoTexture} 
            toneMapped={false}
        />
        </Plane>

         <EffectComposer>
                <Bloom 
                  luminanceThreshold={0} 
                  luminanceSmoothing={0.8} 
                  intensity={1.0} 
                />
        </EffectComposer>
        </>
    );
}

export default VideoMaterial;