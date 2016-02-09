varying vec3 vPos;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying vec3 vAudio;
varying vec3 vCamDir;


uniform float life;
uniform float norm;
uniform float pain;
uniform float love;
uniform float started;

uniform vec3 lightPos;

uniform sampler2D t_audio;


vec3 normCol(){

  vec3 col = vec3(0. , 0. , 1.) * 1. - dot( vMNorm , vec3( 0. , 0.,1. ));
  return col;
}

vec3 painCol(){


  vec3 col = vAudio * vAudio * vAudio * vec3( 1. , 0. , 0.) * dot( vMNorm , vec3( 0. , 1.,0 ));
  return col;

}

vec3 loveCol(){

  vec3 lightDir = normalize( vMPos - lightPos);
  vec3 refl = reflect( lightDir , vMNorm );
  float spec = dot( refl , cameraPosition - vMPos );

  vec3 col = vec3(1.);
  vec3 aCol = texture2D(t_audio, vec2( abs(spec) , 0.)).xyz;
  col -= aCol  * aCol * aCol * (vMNorm * .5 + .5);

  return col;

}

void main(){
  vec3 col = vMNorm * .5 + .5;


  vec3 nCol = normCol();
  vec3 pCol = painCol();
  vec3 lCol = loveCol();

  col = nCol * norm + pCol  * pain + lCol * love;

  col = mix( col , vec3( 0.05 , 0.05 , 1. ), 1.-started);
  gl_FragColor = vec4( col , 1. );
}





