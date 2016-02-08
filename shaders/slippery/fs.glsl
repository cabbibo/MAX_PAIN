

uniform sampler2D t_normal;
uniform sampler2D t_matcap;
uniform float idVal;

varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;

$uvNormalMap
$semLookup

void main(){

  vec3 camVec = normalize(cameraPosition - vMPos);  

  vec3 col;
  vec3 fNorm = uvNormalMap( t_normal , vMPos , vUv * 20. , vMNorm , 2.1 , 1.7 );
  col = vec3(210. * idVal ,180.,140.)/255. * texture2D( t_matcap , semLookup( camVec , vMNorm ) ).xyz;
 
  //vec3 col = vMNorm * .5 + .5;
  gl_FragColor = vec4( col , 1. );
}