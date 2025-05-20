import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Typing3DText2 = ({ delay = 2 }) => { // Add delay prop with default value of 2 seconds
  const fullText = "Welcome to my portfolio island!";
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false); // Start with cursor hidden
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false); // Track if typing has started
  const textRef = useRef();
  const cursorRef = useRef();
  const lastUpdateTime = useRef(0);
  const charIndex = useRef(0);
  const startTime = useRef(null);
  
  // Handle typing animation with useFrame for better control
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    // Initialize start time on first frame
    if (startTime.current === null) {
      startTime.current = elapsedTime;
    }
    
    // Check if delay has passed before starting to type
    if (!hasStartedTyping) {
      if (elapsedTime - startTime.current >= delay) {
        setHasStartedTyping(true);
        setShowCursor(true); // Only show cursor when typing begins
        lastUpdateTime.current = elapsedTime; // Reset last update time when typing starts
      } else {
        return; // Skip the rest of the function until delay is over
      }
    }
    
    // Type new character every 0.15 seconds (only after delay)
    if (hasStartedTyping && !isTypingComplete && elapsedTime - lastUpdateTime.current > 0.15) {
      if (charIndex.current < fullText.length) {
        setDisplayText(fullText.substring(0, charIndex.current + 1));
        charIndex.current += 1;
        lastUpdateTime.current = elapsedTime;
      } else {
        // Typing is complete
        setIsTypingComplete(true);
        // Make cursor visible one last time, then hide it permanently
        setShowCursor(true);
        setTimeout(() => {
          setShowCursor(false);
        }, 500);
      }
    }
    
    // Blink cursor only while typing is in progress (after delay has passed)
    if (hasStartedTyping && !isTypingComplete) {
      setShowCursor(Math.floor(elapsedTime * 2) % 2 === 0);
    }
    
    // Update cursor position based on text width
    if (showCursor && cursorRef.current && textRef.current) {
      try {
        const textWidth = textRef.current.geometry?.boundingBox?.max.x || 0;
        cursorRef.current.position.x = textWidth + 0.05;
      } catch (err) {
        cursorRef.current.position.x = displayText.length * 0.25;
      }
    }
  });
  
  return (
    <group position={[0, -2, 0]}>
      {/* Main text */}
      <Text
        ref={textRef}
        fontSize={0.5}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {displayText}
      </Text>
      
      {/* Cursor - only render when showCursor is true */}
      {showCursor && (
        <mesh 
          ref={cursorRef} 
          position={[displayText.length * 0.25, 0, 0]}
        >
          <planeGeometry args={[0.05, 0.6]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      )}
    </group>
  );
};

export default Typing3DText2;