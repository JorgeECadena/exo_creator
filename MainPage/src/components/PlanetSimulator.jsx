import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { getFresnelMat } from '../shaders/getFresnelMap';  // Fresnel Shader for atmosphere

const Planet = ({ texturePath, cloudPath }) => {
  const planetRef = useRef();

  // Dynamic texture loading based on props
  const [planetTexture, setPlanetTexture] = useState(null);
  const [cloudTexture, setCloudTexture] = useState(null);

  // Load textures dynamically when paths change
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      texturePath,
      (loadedTexture) => setPlanetTexture(loadedTexture),
      undefined,
      () => setPlanetTexture(null) // Handle error
    );

    textureLoader.load(
      cloudPath,
      (loadedCloudTexture) => setCloudTexture(loadedCloudTexture),
      undefined,
      () => setCloudTexture(null) // Handle error
    );
  }, [texturePath, cloudPath]);

  // Rotate the planet and the atmosphere together over time
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002; // Rotates both planet and atmosphere
    }
  });

  // Create the Fresnel material for atmosphere glow with reduced opacity
  const fresnelMaterial = getFresnelMat({
    rimHex: 0x0088ff,
    facingHex: 0x000000,
    scale: 1.5,
    opacity: 0.2, // Reduced opacity for less invasive glow
  });

  return (
    <group ref={planetRef}> {/* Group for planet and atmosphere */}
      {/* Render planet mesh only if the texture is loaded */}
      {planetTexture ? (
        <mesh>
          <sphereGeometry args={[1, 10, 10]} /> {/* Adjusted for higher detail */}
          <meshStandardMaterial map={planetTexture} />
        </mesh>
      ) : (
        <mesh>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      )}

      {/* Atmosphere Glow Mesh */}
      <mesh>
        <sphereGeometry args={[1.05, 10, 10]} /> {/* Slightly larger for the atmosphere */}
        <shaderMaterial attach="material" args={[fresnelMaterial]} />
      </mesh>

      {/* Render clouds mesh only if the texture is loaded */}
      {cloudTexture ? (
        <mesh>
          <sphereGeometry args={[1.02, 10, 10]} /> {/* Slightly larger than planet */}
          <meshStandardMaterial
            map={cloudTexture}
            transparent={true}
            opacity={0.2} // Adjust opacity for cloud effect
            flatShading={true} // Activate flat shading
          />
        </mesh>
      ) : (
        <mesh>
          <sphereGeometry args={[1.02, 10, 10]} />
          <meshStandardMaterial
            color="white"
            transparent={true}
            opacity={0.2}
            flatShading={true} // Activate flat shading
          />
        </mesh>
      )}
    </group>
  );
};

import './PlanetSimulator.css';
import { useNavigate } from 'react-router-dom';
const PlanetSimulator = () => {
  // State to hold dynamic texture paths based on slider values
  const navigate = useNavigate();;
  const [textureIndex, setTextureIndex] = useState(0);
  const [cloudIndex, setCloudIndex] = useState(0);

  // Define texture paths
  const textures = [
    '/textures/texture.jpg', // Update with actual paths
    '/textures/planet_texture.png',
    '/textures/texture.jpg', // Add more textures as needed
  ];

  const cloudTextures = [
    '/textures/clouds.png', // Update with actual paths
    '/textures/clouds.png',
    '/textures/clouds.png', // Add more cloud textures as needed
  ];

  // Calculate current texture paths based on slider indices
  const texturePath = textures[textureIndex];
  const cloudPath = cloudTextures[cloudIndex];

  return (
    <div className="container"> {/* Flex container for layout */}
      <div className="menu"> {/* Left menu */}
        <h2>Menu</h2>
        {/* Slider for planet texture selection */}
        <label>
          Select Planet Texture:
          <input
            type="range"
            min="0"
            max={textures.length - 1}
            value={textureIndex}
            onChange={(e) => setTextureIndex(Number(e.target.value))}
          />
        </label>
        <br />
        {/* Slider for cloud texture selection */}
        <label>
          Select Cloud Texture:
          <input
            type="range"
            min="0"
            max={cloudTextures.length - 1}
            value={cloudIndex}
            onChange={(e) => setCloudIndex(Number(e.target.value))}
          />
        </label>
        <button class="changePage" onClick={() => window.location.href = '/Planets'}>Change Page</button>
      </div>
      
      <div className="simulator-container"> {/* Right simulator container */}
        <Canvas className="canvas" camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          {/* Low-poly Planet with atmosphere and clouds */}
          <Planet texturePath={texturePath} cloudPath={cloudPath} />

          {/* Background starfield */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

          {/* Orbit controls */}
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default PlanetSimulator;
