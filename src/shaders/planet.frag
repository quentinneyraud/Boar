varying vec2 vUv;
varying float force;

void main() {
  gl_FragColor = vec4( vec3( 0.1, 0.307* smoothstep(0., 0.4, force), 0.731 * smoothstep(0., 0.2, force)  ), force );
}
