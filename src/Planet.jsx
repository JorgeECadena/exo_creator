import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { getFresnelMat } from './shaders/getFresnelMap';

const planetData = [
  {
    texturePath: "/textures/texture.jpg",
    cloudPath: "/textures/clouds.png",
    position: [-10, 0, -7],
  },
  {
    texturePath: "/textures/planet_texture.png",
    cloudPath: "/textures/clouds.png",
    position: [10, 0, -7],
  },
  // Add more planets as needed
];

const Planet = ({ texturePath, cloudPath, position }) => {
  const planetRef = useRef();

  const [planetTexture, setPlanetTexture] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load(texturePath, setPlanetTexture);
  }, [texturePath]);

  return (
    <mesh ref={planetRef} position={position}>
      {planetTexture && <sphereGeometry args={[1, 32, 32]} />}
      {planetTexture && <meshStandardMaterial map={planetTexture} />}
    </mesh>
  );
};

const Planets = () => {
  const start = planetData[0].position;
  const end = planetData[1].position;

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {planetData.map((planet, index) => (
        <Planet
          key={index}
          texturePath={planet.texturePath}
          cloudPath={planet.cloudPath}
          position={planet.position}
        />
      ))}

      <Line
        points={[start, end]} // Array of points
        color="white" // Line color
        lineWidth={2} // Line width
        dashed={true} // Whether the line is dashed
        dashSize={0.5}
        gapSize={0.5}
      />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default Planets;