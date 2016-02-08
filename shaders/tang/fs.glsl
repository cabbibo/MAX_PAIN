uniform sampler2D t_audio;
varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vDis;


void main(){
  vec3 col = vec3( .1 , 0. , .2 );

  vec3 aVal = texture2D(t_audio, vec2( vDis , 0.)).xyz;
  col += .3 * (vMNorm * .5 + .5 + vec3( 0.3 , 0. ,.5)) * aVal;

  gl_FragColor = vec4( col , 1. );
}