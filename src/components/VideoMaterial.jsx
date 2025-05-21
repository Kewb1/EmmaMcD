import { useVideoTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from 'three'; // Import THREE for color handling

const VideoMaterial = ({ url }) => {
    // Create a ref to access the video element
    const videoRef = useRef();
    
    // Configure the video texture with proper audio settings
    const videoTexture = useVideoTexture(url, {
        loop: false,
        unsuspend: 'canplay', // Help with browser autoplay policies
    });
    
    // Access the underlying HTML video element to ensure audio works
    useEffect(() => {
        if (videoTexture.source?.data) {
            const videoElement = videoTexture.source.data;
            videoRef.current = videoElement;
            
            // Ensure audio is enabled
            videoElement.muted = false;
            videoElement.volume = 1.0;
            
            // Some browsers require user interaction before playing audio
            // This attempts to work around that limitation
            const handleUserInteraction = () => {
                videoElement.play();
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
            };
            
            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('touchstart', handleUserInteraction);
            
            // Clean up event listeners
            return () => {
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
            };
        }
    }, [videoTexture]);
    
    return (
        <meshStandardMaterial map={videoTexture} emissive={new THREE.Color(0xffffff)} emissiveIntensity={1} emissiveMap={videoTexture} toneMapped={false}/>
    );
}

export default VideoMaterial;