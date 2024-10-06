import * as THREE from 'three';

function getFresnelMat({
  temperature = 0, // Add temperature parameter
  facingHex = 0x000000, 
  scale = 1.5, 
  opacity = 0.2
} = {}) {
  // Convert temperature to HSL color
  const blue = new THREE.Color(0x0000ff);
  const red = new THREE.Color(0xff0000);
  const color = blue.clone().lerp(red, temperature / 360);
  const rimHex = color.getHex(); 

  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
    scale: { value: scale },
    opacity: { value: opacity },
  };

  const vs = `
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;

    varying float vReflectionFactor;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

      vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

      vec3 I = worldPosition.xyz - cameraPosition;

      vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );

      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fs = `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float opacity;

    varying float vReflectionFactor;

    void main() {
        float f = clamp( vReflectionFactor, 0.0, 1.0 );
        gl_FragColor = vec4(mix(color2, color1, vec3(f)), f * opacity);  // Apply opacity here
    }
  `;

  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });

  return fresnelMat;
}

export { getFresnelMat };
