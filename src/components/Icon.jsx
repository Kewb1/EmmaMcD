import React, { useState, useEffect, useRef } from 'react';
import Folder from './folder.jsx';
import { Text } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { useThree } from '@react-three/fiber';

const Icon = ({
    text, 
    position = [0, 0, 0], 
    rotation = [0, 0, 0], 
    scale = [1, 1, 1],
    onIconClick  // New prop for handling clicks
}) => {
    const [visible, setVisible] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(false);
    const [userClicked, setUserClicked] = useState(false);
    const loader = new FontLoader();
    var position2 = [position[0], position[1] - 3, position[2]];
    
    // Get the canvas container element
    const { gl } = useThree();
    const canvasRef = useRef(gl.domElement.parentNode);
    
    // Effect to track 17 seconds elapsed
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeElapsed(true);
            // If user has already clicked, show the icon
            if (userClicked) {
                setVisible(true);
            }
        }, 18800); // seconds in milliseconds
        
        // Clear timeout if component unmounts
        return () => clearTimeout(timer);
    }, [userClicked]);
    
    // Effect to listen for user click
    useEffect(() => {
        const handleClick = () => {
            setUserClicked(true);
            // If 17 seconds have already elapsed, show the icon
            if (timeElapsed) {
                setVisible(true);
            }
        };
        
        // Get the canvas DOM element
        const canvas = canvasRef.current;
        
        if (canvas) {
            canvas.addEventListener('click', handleClick);
        }
        
        // Cleanup event listener
        return () => {
            if (canvas) {
                canvas.removeEventListener('click', handleClick);
            }
        };
    }, [timeElapsed]);

    // Updated click handler to call the passed onIconClick function
    const handleIconClick = (event) => {
        // Stop propagation to prevent the event from bubbling up
        event.stopPropagation();
        console.log("Icon clicked!");
        
        // Call the parent's click handler if provided
        if (onIconClick) {
            onIconClick();
        }
    };
    
    // Don't render anything if not yet visible
    if (!visible) return null;
    
    // Render the icon when visible
    return (
        <>
            <Folder onClick={handleIconClick} position={position} rotation={rotation} scale={scale} />
            <Text
                position={position2}
                color={"white"}
                fontSize={2}
                maxWidth={10}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </Text>
        </>
    );
};

export default Icon;