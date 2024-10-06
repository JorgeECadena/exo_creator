import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { getFresnelMat } from './shaders/getFresnelMap';  // Fresnel Shader for atmosphere

const Planet = ({ texturePath, cloudPath, temperature, cloudOpacity, planetSize }) => {
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
        temperature: temperature, // Pass temperature to getFresnelMat
        facingHex: 0x000000,
        scale: 1.5,
        opacity: 0.2, // Reduced opacity for less invasive glow
    });

    return (
        <group ref={planetRef}> {/* Group for planet and atmosphere */}
            {/* Render planet mesh only if the texture is loaded */}
            {planetTexture ? (
                <mesh>
                    <sphereGeometry args={[planetSize, 10, 10]} /> {/* Adjusted for higher detail */}
                    <meshStandardMaterial map={planetTexture} />
                </mesh>
            ) : (
                <mesh>
                    <sphereGeometry args={[planetSize, 10, 10]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
            )}

            {/* Atmosphere Glow Mesh */}
            <mesh>
                <sphereGeometry args={[planetSize * 1.05, 10, 10]} /> {/* Slightly larger for the atmosphere */}
                <shaderMaterial attach="material" args={[fresnelMaterial]} />
            </mesh>

            {/* Render clouds mesh only if the texture is loaded */}
            {cloudTexture ? (
                <mesh>
                    <sphereGeometry args={[planetSize * 1.02, 10, 10]} /> {/* Slightly larger than planet */}
                    <meshStandardMaterial
                        map={cloudTexture}
                        transparent={true}
                        opacity={cloudOpacity} // Adjust opacity for cloud effect
                        flatShading={true} // Activate flat shading
                    />
                </mesh>
            ) : (
                <mesh>
                    <sphereGeometry args={[planetSize * 1.02, 10, 10]} />
                    <meshStandardMaterial
                        color="white"
                        transparent={true}
                        opacity={cloudOpacity}
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
    const navigate = useNavigate();
    const [planetRadius, setPlanetRadius] = useState(0);
    const [sunMass, setSunMass] = useState(0);
    const [planetDistance, setPlanetDistance] = useState(0);
    const [textureIndex, setTextureIndex] = useState(0);
    const [temperature, setTemperature] = useState(0); // State for temperature
    const [cloudOpacity, setCloudOpacity] = useState(0.5); // Default opacity
    const [planetSize, setPlanetSize] = useState(1); // Default planet size

    // Define texture paths
    const textures = [
        '/textures/texture.jpg', // Update with actual paths
        '/textures/planet_texture.png',
        '/textures/texture.jpg', // Add more textures as needed
    ];

    const cloudTextures = [
        '/textures/clouds.png', // Update with actual paths
        '/textures/clouds.png',
    ];

    // Calculate current texture paths based on slider indices
    const texturePath = textures[textureIndex];
    const cloudPath = cloudTextures[0]; // Use a fixed cloud texture

    const handleCloudSliderChange = (event) => {
        setCloudOpacity(event.target.value / 100); // Assuming slider value is between 0 and 100
    };

    const handleSizeSliderChange = (event) => {
        setPlanetSize(event.target.value); // Assuming slider value is between 0.5 and 2
    };

    const makePlanetRequest = async (e) => {
        try {
            const response = await fetch('https://ibjosnief4.execute-api.us-east-2.amazonaws.com/dev/exo/info/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({
                    planetRadius: planetRadius,
                    sunMass: sunMass,
                    planetDistance: planetDistance,
                    temperature: temperature,
                    cloudOpacity: cloudOpacity,
                    planetSize: planetSize,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                //navigate('/Exo-Planet/your-planets');
            } else {
                console.error('Failed to create planet');
            }
        } catch (error) {
            console.error('Failed on POST request:', error);
        }
    };

    return (
        <div className="container"> {/* Flex container for layout */}
            <div className="menu"> {/* Left menu */}
                <h2>Menu</h2>
                {/* Slider for planet texture selection */}
                <label>
                    Select Sun's mass:
                    <input
                        type="range"
                        min="0"
                        max={sunMass.length - 1}
                        value={sunMass}
                        onChange={(e) => setSunMass(Number(e.target.value))}
                    />
                </label>
                <br />
                <label>
                    Select Planet Radius:
                    <input
                        type="range"
                        min="0"
                        max={planetRadius.length - 1}
                        value={planetRadius}
                        onChange={(e) => setPlanetRadius(Number(e.target.value))}
                    />
                </label>
                <br />
                <label>
                    Select Planet Distance:
                    <input
                        type="range"
                        min="0"
                        max={planetDistance.length - 1}
                        value={planetDistance}
                        onChange={(e) => setPlanetDistance(Number(e.target.value))}
                    />
                </label>
                <br />
                {/* Slider for temperature */}
                <label>
                    Select Temperature:
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                    />
                </label>
                <br />
                {/* Slider for cloud opacity */}
                <label>
                    Select Cloud Opacity:
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={cloudOpacity * 100}
                        onChange={handleCloudSliderChange}
                    />
                </label>
                <br />
                {/* Slider for planet size */}
                <label>
                    Select Planet Size:
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={planetSize}
                        onChange={handleSizeSliderChange}
                    />
                </label>
                <br />
                <button
                    className="changePage"
                    onClick={() => makePlanetRequest()}>
                    Change Page
                </button>
            </div>

            <div className="TextInputs">
                <label>
                    Name your planet:
                    <input type="text" class="inputBox" />
                </label>
                <br />
                <label>
                    Name the civilization:
                    <input type="text" class="inputBox" />
                </label>
                <br />
                <label>
                    What did they used to do?
                    <input type="text" class="inputBox" />
                </label>
                <br />
                <label>
                    What happened to the planet?
                    <input type="text" class="inputBox" />
                </label>
                <br />
                <label>
                    What are the special features of the planet?
                    <input type="text" class="inputBox" />
                </label>
                <br />
                <button
                    className="submitText"
                    onClick={() => alert("Your planet has been submitted!")}
                >Get your story!</button>
            </div>

            <div className="simulator-container"> {/* Right simulator container */}
                <Canvas className="canvas" camera={{ position: [0, 0, 5], fov: 60 }}>
                    <ambientLight intensity={0.1} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />

                    {/* Low-poly Planet with atmosphere and clouds */}
                    <Planet texturePath={texturePath} cloudPath={cloudPath} temperature={temperature} cloudOpacity={cloudOpacity} planetSize={planetSize} />

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