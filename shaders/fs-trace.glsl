
uniform float time;
uniform sampler2D t_audio;

uniform sampler2D t_matcap;
uniform sampler2D t_normal;
uniform sampler2D t_color;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

uniform float life;
uniform float norm;
uniform float pain;
uniform float love;
uniform float started;

uniform vec3 lightPos;


varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vNoise;

varying vec3 vAudio;



$uvNormalMap
$semLookup


// Branch Code stolen from : https://www.shadertoy.com/view/ltlSRl
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

const float MAX_TRACE_DISTANCE = 1.0;             // max trace distance
const float INTERSECTION_PRECISION = 0.0001;        // precision of the intersection
const int NUM_OF_TRACE_STEPS = 50;
const float PI = 3.14159;



$smoothU
$opU
$pNoise

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv(float h, float s, float v)
{
    
  return mix( vec3( 1.0 ), clamp( ( abs( fract(
    h + vec3( 3.0, 2.0, 1.0 ) / 3.0 ) * 6.0 - 3.0 ) - 1.0 ), 0.0, 1.0 ), s ) * v;
}


//--------------------------------
// Modelling 
//--------------------------------
vec2 map( vec3 pos ){  

    vec2 res = vec2( 1000000. , 0. );


    float nVal = pNoise( pos * 90.0  * pain + vec3( 0, time * pain , 0) );

    vec3 aVal = texture2D( t_audio , vec2( abs(nVal) , 0.)).xyz;
    nVal *= length( aVal ) * length( aVal ) * pain * .01;


    vec2 centerBlob = vec2( length( pos - vec3( 0. , -0.03 , .05 ) ) - .055 * ((pain)+.5) + nVal , 1. );
    res = smoothU( res , centerBlob , .2 );






    return res;
    
}


$calcIntersection
$calcNormal
$calcAO


vec3 normCol(vec3 norm , vec3 ro , vec3 rd , vec3 lightDir , vec3 refl , vec2 res ){

  float lamb = dot( norm , normalize(lightDir));

  vec3 col = texture2D( t_audio , vec2( lamb , 0. )).xyz * lamb;//vec3( 0 , 0 , 0 );

//float alpha = 0


  //if( lamb > .3 ){ col = vec3( 0 , 0.3, 6);}
  //if( lamb > .6 ){ col = vec3( 0 , 0, 1); }

  if( res.y > -.5 ){

    vec3 p = ro + rd * res.x;
    vec3 n = calcNormal( p );

    //col = texture2D( t_matcap , semLookup( rd , n , modelViewMatrix , normalMatrix ) ).xyz;

    vec3 aCol = texture2D( t_audio , semLookup( rd , n , modelViewMatrix , normalMatrix ) ).xyz;
  
    if( length(col) < .5 ){
      col =  aCol * aCol * aCol;
    }

  }

  col *= vec3( .4, .4, 1.);

  return col;


}

vec3 painCol(vec3 norm , vec3 ro , vec3 rd , vec3 lightDir , vec3 refl , vec2 res ){
  
  //vec3 col = vec3( 0. );//vec3( dot( norm , normalize(lightDir) ) , 0. , 0. );
  float fr = max( 0. , dot( -norm , rd ));
  fr = 1. - fr;
  vec3 col = fr * vec3( .3 , 0., 0. );//texture2D( t_audio , vec2( fr * .1 , 0.)).xyz * fr;
  if( res.y > -.5 ){

    vec3 p = ro + rd * res.x;
    vec3 n = calcNormal( p );

    //col = texture2D( t_matcap , semLookup( rd , n , modelViewMatrix , normalMatrix ) ).xyz;

    vec3 aCol = texture2D( t_audio , semLookup( rd , n , modelViewMatrix , normalMatrix ) ).xyz;
  
    col += vec3( .6 , 0. , 0. ) *  aCol * aCol * aCol * dot( n , rd );
  }

  col += length( vAudio ) * length( vAudio ) * length( vAudio ) * vec3( .1 , 0. , 0.);

  return col;

}

vec3 loveCol(vec3 norm , vec3 ro , vec3 rd , vec3 lightDir , vec3 refl , vec2 res ){


  float lamb = dot( norm , normalize(lightDir));

  vec3 col = texture2D( t_audio , vec2( lamb , 0. )).xyz * lamb;//vec3( 0 , 0 , 0 );

  return vec3( 1. );// - col; //normalize(  col ); //vec3( 1. , 1. , 1. );
}

void main(){

  vec3 fNorm = uvNormalMap( t_normal , vPos , vUv * 20. , vNorm , .4 * pain , .6 * pain * pain);

  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );

  vec3 p = vec3( 0. );
  vec3 col =  vec3( 0. );

  vec3 uvCol = texture2D( t_color , vUv ).xyz;


  float m = max(0.,dot( -rd , fNorm ));

  //col += fNorm * .5 + .5;

  vec3 refr = rd; //refract( rd , fNorm , 1. / (1.1 - .1 * pain ) );

  vec2 res = calcIntersection( ro , refr );

  vec3 lightDir = lightPos-vPos;
  vec3 refl = reflect( lightDir , fNorm );

  //col = texture2D( t_matcap , semLookup( refr , fNorm , modelViewMatrix , normalMatrix ) ).xyz;
 
  float fr = 1. + dot( fNorm, rd );
  col = texture2D( t_audio , vec2( fr , 0.)).xyz * fr;
  float alpha =  .1;
  if( res.y > -.5 ){

    if( res.y < 10. ){

    p = ro + refr * res.x;
    vec3 n = calcNormal( p );

    //col += n * .5 + .5;
    vec3 h = hsv( res.y / 4. , 1. , 1. );
    col += h *  texture2D( t_matcap , semLookup( refr , n , modelViewMatrix , normalMatrix ) ).xyz;

    alpha = 1.;

    }else{

      if( res.y == 10. ){
        col = vec3( 1. ) - col; //vec3( 1. );
      }else{
        col = vec3( 1. , .5 , .5 ) - col; //vec3( 1. )

      }

    }

  }

  vec3 nCol = normCol( fNorm , ro , rd , lightDir , refl , res );
  vec3 pCol = painCol( fNorm , ro , rd , lightDir , refl , res );
  vec3 lCol = loveCol( fNorm , ro , rd , lightDir , refl , res );

  col = nCol  * norm + pCol * pain + lCol * love;

  col = mix( col , vec3( 0.05 , 0.05 , 1. ), 1.-started);// + 1.0 * started


  gl_FragColor = vec4( col , 1. );

}
