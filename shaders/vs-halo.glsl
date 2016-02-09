
uniform mat4 iModelMat;
uniform float time;
uniform sampler2D t_audio;

uniform float life;
uniform float norm;
uniform float pain;
uniform float love;


varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;

varying vec3 vAudio;



$simplex




void main(){

  vUv = uv;

  vPos = position;
  vNorm = normal;

  vMNorm = normalize( normalMatrix * normal );
  vMPos = (modelMatrix * vec4( position , 1. )).xyz;

  vec3 aCol = texture2D( t_audio , (vUv + vUv.yx ) / ( 2. - 1. * love) ).xyz;
  vAudio = aCol;

  vPos += .3 * aCol * (.6 + pain * pain * 1.2 + love * .2 );
  vPos -= (vec3( .3 ) * ( pain * pain));



  vPos *= vPos;
  vPos += vec3( 0 , 0 , .07 )* love;
  vPos += vec3( 0 , 0 , .01 )* pain * pain;


  // Use this position to get the final position 
  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1.);

}