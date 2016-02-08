varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;

void main(){
  vec3 col = vMNorm * .5 + .5;
  float d =dot( vMNorm , vec3( 0., 0., 1.));
  gl_FragColor = vec4( vec3(d) , 1. );
}