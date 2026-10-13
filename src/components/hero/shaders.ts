export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // 2D simplex noise — Ashima Arts / Stefan Gustavson, MIT licensed.
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 x1 = x0.xy + C.xx - i1;
    vec2 x2 = x0.xy + C.zz;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * vec2(x1.x, x2.x) + h.yz * vec2(x1.y, x2.y);
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2(uv.x * aspect, uv.y);

    vec3 charcoal = vec3(0.1098, 0.1059, 0.1020);
    vec3 espresso = vec3(0.2314, 0.1412, 0.0941);
    vec3 copper   = vec3(0.7216, 0.4510, 0.2000);

    vec2 mouseP = vec2(uMouse.x * aspect, uMouse.y);
    vec2 toMouse = mouseP - p;
    float distToMouse = length(toMouse);

    // Bend the liquid field toward the cursor.
    float pull = smoothstep(0.9, 0.0, distToMouse) * 0.18;
    vec2 warped = p + normalize(toMouse + 1e-5) * pull;

    float n = fbm(warped * 1.6 + vec2(uTime * 0.045, uTime * 0.03));
    n = n * 0.5 + 0.5;

    vec3 color = mix(charcoal, espresso, smoothstep(0.25, 0.75, n));

    // A thin copper ridge that brightens near the cursor.
    float ridge = 1.0 - smoothstep(0.0, 0.035, abs(n - 0.52));
    float highlight = ridge * (0.25 + 0.75 * smoothstep(0.8, 0.0, distToMouse));
    color = mix(color, copper, highlight);

    gl_FragColor = vec4(color, 1.0);
  }
`;
