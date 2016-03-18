

attribute float id;

uniform mat4 iModelMat;
uniform float time;
uniform float started;
uniform sampler2D t_audio;

uniform float life;
uniform float norm;
uniform float pain;
uniform float love;
uniform vec3 lightPos;

uniform float speed;



varying vec3 vPos;
varying vec3 vNorm;
varying vec3 vCam;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vNoise;

varying vec4 vHovered;
varying vec4 vActive;

varying vec3 vAudio;
varying vec3 vCenter;




void main(){

  vec3 pos = position;


  vPos = pos;
  vUv = uv;


 

  vCam   = cameraPosition;//( iModelMat * vec4( cameraPosition , 1. ) ).xyz;

  gl_Position = projectionMatrix * modelMatrix * vec4( vPos , 1.);

}
