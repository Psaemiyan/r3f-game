export const fragmentShader = `
  precision mediump float;
  
  varying vec2 vUv;
  varying float vDistance;
  
  void main() {
    // Calculate distance from center of point
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    // Create brighter core of the star
    float core = 1.0 - smoothstep(0.0, 0.15, dist);  // Slightly larger core
    
    // Create stronger outer glow
    float glow = exp(-2.5 * dist);  // Less steep falloff
    
    // Combine core and glow with higher glow ratio
    float strength = core + glow * 0.4;  // More glow effect
    
    // Brighter color with slight blue tint
    vec3 color = mix(
      vec3(1.0, 1.0, 1.0),     // Pure white core
      vec3(0.9, 0.95, 1.0),    // Very slight blue tint
      vDistance * 0.003        // Very subtle color variation
    );
    
    // Increase overall brightness
    color *= 1.5;  // Multiply final color for extra brightness
    
    // Gentler distance fade
    float fade = 1.0 - smoothstep(0.0, 35.0, vDistance);
    
    gl_FragColor = vec4(color, strength * fade);
  }
`;
