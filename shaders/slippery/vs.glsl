
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




void main(){

  vUv = uv;

  vPos = position;
  vNorm = normal;

  vMNorm = normalize( normalMatrix * normal );
  vMPos = (modelMatrix * vec4( position , 1. )).xyz;

  vPos += .3 * texture2D( t_audio , vec2( (idVal + vUv.x + vUv.y ) / 3. , 0.) ).xyz;
  vPos.x += idVal * .2;
  vPos *= vPos;


  // Use this position to get the final position 
  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1.);

}