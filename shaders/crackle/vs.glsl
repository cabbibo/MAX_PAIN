
uniform mat4 iModelMat;
uniform float time;
uniform sampler2D t_audio;
uniform float idVal;

varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;




$simplex
$noise




void main(){

  vUv = uv;

  vPos = position;
  vNorm = normal;

  vMNorm = normalize( normalMatrix * normal );
  vMPos = (modelMatrix * vec4( position , 1. )).xyz;

  vec3 tValX = texture2D( t_audio , vec2( idVal * .5 + sin(vUv.x * 200.) / 10. , 0.) ).xyz;
  vec3 tValY = texture2D( t_audio , vec2( idVal * .5 + sin(vUv.y * 200.) / 10. , 0.) ).xyz;
  float nX = noise( tValX );
  float nY = noise( tValY );
  vPos = .1 * tValX + vec3( 0. , nX, nY ) * .2;
  vPos -= .1 * tValY + vec3( 0., nY , nX ) * .2;
  vPos += vec3(.2 , 0. , 0. ) * idVal;
 // vPos *= vPos;
 // vPos.x /= 100.;


  // Use this position to get the final position 
  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1.);

}