import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line, Text, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { getFresnelMat } from '../shaders/getFresnelMap';
import { useLocation } from 'react-router-dom';

const planetData = [
  {
    texturePath: "/textures/texture.jpg",
    cloudPath: "/textures/clouds.png",
    position: [-10, 0, -7],
    name: "Earth",
  },
  // Removed second planet to keep only one static planet
];

const Planet = ({ texturePath, cloudPath, position, temperature, cloudOpacity, planetSize, name }) => {
  const planetRef = useRef();

  const [planetTexture, setPlanetTexture] = useState(null);
  const [cloudTexture, setCloudTexture] = useState(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(texturePath, setPlanetTexture);
    textureLoader.load(cloudPath, setCloudTexture);
  }, [texturePath, cloudPath]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
    }
  });

  const fresnelMaterial = getFresnelMat({
    temperature: temperature,
    facingHex: 0x000000,
    scale: 1.5,
    opacity: 0.2,
  });

  return (
    <group ref={planetRef} position={position}>
      {planetTexture && (
        <mesh>
          <sphereGeometry args={[planetSize, 32, 32]} />
          <meshStandardMaterial map={planetTexture} />
        </mesh>
      )}
      {cloudTexture && (
        <mesh>
          <sphereGeometry args={[planetSize * 1.02, 32, 32]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent={true}
            opacity={cloudOpacity}
            flatShading={true}
          />
        </mesh>
      )}
      <mesh>
        <sphereGeometry args={[planetSize * 1.05, 32, 32]} />
        <shaderMaterial attach="material" args={[fresnelMaterial]} />
      </mesh>
      <group position={[0, planetSize * 1.5, 0]}>
      <Plane args={[2, 0.5]} position={[0, 0, 0]}>
        <meshBasicMaterial attach="material" color="black" side={THREE.DoubleSide} />
      </Plane>
      <Text
        position={[0, 0, 0.01]} // Slightly in front of the plane to avoid z-fighting
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
    </group>
  );
};

const Planets = () => {
  const location = useLocation();
  const { dynamicPlanetProps } = location.state || {};

  const staticPlanet = planetData[0]; // Get the first static planet

  // Log dynamicPlanetProps to debug
  console.log('dynamicPlanetProps:', dynamicPlanetProps);

  const staticPlanetPosition = staticPlanet.position;
  const dynamicPlanetPosition = [0, 0, 0];

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Render only one static planet */}
      <Planet
        texturePath={staticPlanet.texturePath}
        cloudPath={staticPlanet.cloudPath}
        position={staticPlanet.position}
        temperature={0} // Default temperature
        cloudOpacity={0.5} // Default cloud opacity
        planetSize={1} // Default planet size
        name={staticPlanet.name} // Static planet name
      />

      {/* Render the dynamic planet */}
      {dynamicPlanetProps && (
        <Planet
          {...dynamicPlanetProps}
          position={dynamicPlanetPosition}
          name="Your planet" // Dynamic planet name
        />
      )}

      {/* Render a dotted line between the static and dynamic planets */}
      {dynamicPlanetProps && (
        <Line
          points={[staticPlanetPosition, dynamicPlanetPosition]}
          color="white"
          lineWidth={1}
          dashed={true}
          dashSize={0.5}
          gapSize={0.5}
        />
      )}

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default Planets;
