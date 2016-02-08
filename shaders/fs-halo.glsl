varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;

void main(){
  vec3 col = vMNorm * .5 + .5;
  gl_FragColor = vec4( col , 1. );
}