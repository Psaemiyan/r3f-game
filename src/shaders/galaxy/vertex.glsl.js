export const vertexShader = `
  uniform float uSize;
  uniform float uTime;
  
  varying vec2 vUv;
  varying float vDistance;

  void main() {
    vUv = uv;
    
    // Calculate position with a very subtle wobble effect
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float wobble = sin(uTime + modelPosition.x * 30.0) * 0.008;  // Very subtle wobble
    modelPosition.y += wobble;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    // Calculate distance from camera for size attenuation
    vDistance = -viewPosition.z;
    
    // Vary size slightly based on position
    float size = uSize * (0.9 + sin(position.x * 30.0) * 0.1);  // More consistent size
    
    gl_Position = projectedPosition;
    gl_PointSize = size * (200.0 / -viewPosition.z);  // Increased base size
  }
`;
