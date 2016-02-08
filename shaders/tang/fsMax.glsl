
uniform float time;
uniform sampler2D t_audio;

uniform sampler2D t_matcap;
uniform sampler2D t_normal;
uniform sampler2D t_color;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;


varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vNoise;


#define LINKS @links

varying vec4 vLinks[LINKS];


uniform vec4 links[LINKS];
varying vec4 vHovered;
varying vec4 vActive;

$uvNormalMap
$semLookup


// Branch Code stolen from : https://www.shadertoy.com/view/ltlSRl
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

const float MAX_TRACE_DISTANCE = 1.0;             // max trace distance
const float INTERSECTION_PRECISION = 0.001;        // precision of the intersection
const int NUM_OF_TRACE_STEPS = 25;
const float PI = 3.14159;



$smoothU
$opU

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


    //vec2 centerBlob = vec2( length( pos - vec3( 0. , -0.03 , .05 ) ) - .03, 1. );
   // res = smoothU( res , centerBlob , .2 );

    for( int i = 0; i< LINKS; i++ ){

      vec2 centerBlob = vec2( length( pos - vLinks[i].xyz ) - .02, float( i ) );
      res = smoothU( res , centerBlob , .05 );
    }

    if( vHovered.w > 0. ){
      vec2 centerBlob = vec2( length( pos - vHovered.xyz ) - .023 * vHovered.w, 10. );
      res = opU( res , centerBlob  );
    }

    if( vActive.w > 0. ){
      vec2 centerBlob = vec2( length( pos - vActive.xyz ) - .025 * vActive.w, 11. );
      res = opU( res , centerBlob  );
    }







    return res;
    
}


$calcIntersection
$calcNormal
$calcAO




void main(){

  vec3 fNorm = uvNormalMap( t_normal , vPos , vUv * 20. , vNorm , 2.1 , 3.9 );

  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );

  vec3 p = vec3( 0. );
  vec3 col =  vec3( 0. );

  vec3 uvCol = texture2D( t_color , vUv ).xyz;



  float m = max(0.,dot( -rd , fNorm ));

  //col += fNorm * .5 + .5;

  vec3 refr = refract( rd , fNorm , 1. / 1.0 ) ;

  vec2 res = calcIntersection( ro , refr );

  //col = texture2D( t_matcap , semLookup( refr , fNorm , modelViewMatrix , normalMatrix ) ).xyz;
 
  float fr = 1.+dot( fNorm, rd );
  col = vec3( .1 , 0. , .2 );
  col += (-fNorm * .5 + .5) * texture2D( t_audio , vec2( fr , 0.)).xyz * fr;
  float alpha =  .1;
  if( res.y > -.5 ){

    p = ro + refr * res.x;
    vec3 n = calcNormal( p );
    if( res.y < 10. ){



    col += (-n * .5 + .5) *  texture2D( t_matcap , semLookup( refr , n , modelViewMatrix , normalMatrix ) ).xyz;

    alpha = 1.;

    }else{
 
        col = (-n * .5 + .5); //vec3( 1. );
  
    }
    //col *= texture2D( t_audio , vec2(  abs( n.x ) , 0. ) ).xyz;

  }

  float h = rgb2hsv( uvCol ).x;
  if(abs(h - abs(sin( time ))) > .55){
    //col = uvCol;
  }



  gl_FragColor = vec4( col , 1. );

}
