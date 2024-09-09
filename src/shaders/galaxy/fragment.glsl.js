export const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;

  void main() {
    // Custom shape logic using distance formula for elliptical/rectangular shapes
    float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    vec3 color = vec3(1.0); // White particles
    gl_FragColor = vec4(color, strength);
  }
`;
