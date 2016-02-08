
uniform mat4 iModelMat;
uniform float time;
uniform sampler2D t_audio;
uniform float idVal;

varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vDis;


$simplex




void main(){

  vUv = uv;

  vPos = position;
  vNorm = normal;

  vMNorm = normalize( normalMatrix * normal );
  vMPos = (modelMatrix * vec4( position , 1. )).xyz;

  vec3 tVal = texture2D( t_audio , vec2( idVal  + (sin(vUv.x * 20. + vUv.y * 20.))/10., 0.)  ).xyz;

  vPos += .2 * tVal * .2 * (idVal+1.); //+ vec3( 0., .1 , 0.);
  //vPos *= vPos;

  vDis = length( tVal );

  // Use this position to get the final position 
  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1.);

}