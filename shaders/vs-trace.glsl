
uniform mat4 iModelMat;
uniform float time;
uniform float started;
uniform sampler2D t_audio;

uniform float life;
uniform float norm;
uniform float pain;
uniform float love;
uniform vec3 lightPos;



varying vec3 vPos;
varying vec3 vNorm;
varying vec3 vCam;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vNoise;

varying vec3 vAudio;

$simplex




void main(){

  vUv = uv;

  vPos = position - normal * (.3 - started * .3);

  float fr = max(0.,dot( normal , normalize(lightPos - cameraPosition)));
  vec3 aCol = texture2D( t_audio , vec2( fr , 0 )).xyz;
  vAudio = aCol;
  vPos += aCol * .003 * norm;
  vPos -=  normal * length( aCol ) * length( aCol ) * length( aCol ) * .0002 * pain;
  vPos += normal * love * .4; //+ vec3( 0 , 0 , .2 )* love;
  vNorm = normal;

  vMNorm = normalMatrix * normal;
  vMPos = (modelMatrix * vec4( vPos , 1. )).xyz;

  vCam   = ( iModelMat * vec4( cameraPosition , 1. ) ).xyz;

  vNoise = snoise( vMPos  * 10. + vec3(0. , time , 0.));



  //vLight = ( iModelMat * vec4(  vec3( 400. , 1000. , 400. ) , 1. ) ).xyz;


  // Use this position to get the final position 
  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1.);

}