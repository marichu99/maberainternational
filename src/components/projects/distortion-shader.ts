export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uVelocity;
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float speed = clamp(length(uVelocity), 0.0, 1.0);
    vec2 dir = length(uVelocity) > 0.0001 ? normalize(uVelocity) : vec2(0.0);

    vec2 ripple = dir * sin(vUv.yx * 12.0 + uTime * 5.0) * 0.015 * speed;
    vec2 uv = vUv + ripple;

    vec3 copper = vec3(0.7216, 0.4510, 0.2000);

    float shift = 0.01 * speed;
    float r = texture2D(uTexture, uv + dir * shift).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - dir * shift).b;
    vec3 color = vec3(r, g, b);

    color = mix(color, copper, speed * 0.35);

    gl_FragColor = vec4(color, uOpacity);
  }
`;
