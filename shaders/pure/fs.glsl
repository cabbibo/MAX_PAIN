uniform float idVal;

varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;

varying float vDis;

void main(){
  vec3 col = vMNorm * .5 + .5;
  gl_FragColor = vec4( vec3(vDis * vDis * vDis)/3., 1. );
  //gl_FragColor = vec4( vec3(idVal), 1. );
}