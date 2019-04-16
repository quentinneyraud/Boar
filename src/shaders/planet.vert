#pragma glslify: noise = require(glsl-noise/simplex/3d)

varying vec2 vUv;
varying float force;
uniform float time;
uniform vec2 point;

void main() {
  vUv = uv;

  float ratio = smoothstep(0.05, 0.3, distance(vUv, point));
  force = noise(position * 0.05 + time * 0.1) * ratio * 2.;

  vec3 newPosition = position + normal * force;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
