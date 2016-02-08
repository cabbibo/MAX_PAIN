
uniform float time;
uniform sampler2D t_audio;

uniform sampler2D t_matcap;
uniform sampler2D t_normal;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vNoise;


$uvNormalMap
$semLookup


// Branch Code stolen from : https://www.shadertoy.com/view/ltlSRl
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

const float MAX_TRACE_DISTANCE = 5.0;             // max trace distance
const float INTERSECTION_PRECISION = 0.01;        // precision of the intersection
const int NUM_OF_TRACE_STEPS = 25;
const float PI = 3.14159;



$smoothU


//--------------------------------
// Modelling 
//--------------------------------
vec2 map( vec3 pos ){  

    vec2 res = vec2( 1000000. , 0. );




    pos.x += .1 * sin( pos.x * 40. );
    pos.y += .1 * sin( pos.y * 40. );
    pos.z += .1 * sin( pos.z * 40. );

    vec2 centerBlob = vec2( length( pos  ) - .1 , 1. );

    res = smoothU( res , centerBlob , .2 );

    return res;
    
}


$calcIntersection
$calcNormal
$calcAO




void main(){

  vec3 fNorm = uvNormalMap( t_normal , vPos , vUv * 20. , vNorm , .6 , -.1 );

  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );

  vec3 p = vec3( 0. );
  vec3 col =  vec3( 0. );

  float m = max(0.,dot( -rd , fNorm ));

  //col += fNorm * .5 + .5;

  vec3 refr = refract( rd , fNorm , 1. / 1.) ;

  vec2 res = calcIntersection( ro , refr );

  col = fNorm * .5 + .5;

  if( res.y > -.5 ){

    p = ro + refr * res.x;
    vec3 n = calcNormal( p );

    //col += n * .5 + .5;

    col +=  texture2D( t_matcap , semLookup( refr , n , modelViewMatrix , normalMatrix ) ).xyz;

    //col *= texture2D( t_audio , vec2(  abs( n.x ) , 0. ) ).xyz;

  }




  gl_FragColor = vec4( col , 1. );

}










