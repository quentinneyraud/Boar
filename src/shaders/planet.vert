#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv;
uniform float time;

void main() {
  vUv = uv;

  if (vUv.x > 0.5) {
    vUv.x = 1. - vUv.x;
  }


  vec3 newPosition = position + normal * snoise3(position.x, position.y, 0.);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
