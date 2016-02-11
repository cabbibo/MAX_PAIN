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
uniform float speed;


varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vNoise;

varying vec3 vAudio;

varying float vID;

varying vec3 vCenter;


$uvNormalMap
$semLookup


// Branch Code stolen from : https://www.shadertoy.com/view/ltlSRl
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

const float MAX_TRACE_DISTANCE = 1.0;             // max trace distance
const float INTERSECTION_PRECISION = 0.0001;        // precision of the intersection
const int NUM_OF_TRACE_STEPS = 40;
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


    float nVal = .1 * pNoise( pos * 90.0 + vec3( 0, time * pain , 0) );
    nVal += pNoise( pos * 30.0 + vec3( 0, time * pain , 0) );
//
    //vec3 aVal = texture2D( t_audio , vec2( abs(nVal) , 0.)).xyz;
    //nVal *= length( aVal ) * length( aVal ) * pain * .01;

    vec3 repSize = vec3( .08 , .08 , .08 );

    vec3 newPos = mod( pos , repSize )-0.5* repSize;
    vec3 blobDir = normalize((vCenter - cameraPosition));
    vec3 blobCenter = vCenter - blobDir  * .1 - vec3( 0. , .1 , 0);//normalize((vCenter - cameraPosition )- vec3( 0. , 0.1, .4 );
    vec2 centerBlob = vec2( length(pos - blobCenter) - (.1 + .1 * (pain+love * .5)), 1. );
    centerBlob.x -= nVal  * -.06 * (pain+love);
    //centerBlob.x = max( centerBlob.x , 0. );
    res = opU( res , centerBlob  );
    centerBlob = vec2( length(pos - blobCenter + vec3(  .06 * speed * 1000. ,.004 * speed * 1000. ,  0.)) - .02 , 1. );

    res = smoothU( res , centerBlob , .2 );

    centerBlob = vec2( length(newPos) - .0 , 2. );
    centerBlob.x -= nVal  * .02;// * pain;

    //res = opU( res , centerBlob );
    //res = opU( res , centerBlob  );

    //for( int i = 0; i< LINKS; i++ ){
//
    //  vec2 centerBlob = vec2( length( pos - vLinks[i].xyz ) - .02, float( i ) );
    //  res = smoothU( res , centerBlob , .05 );
    //}
//
    //if( vHovered.w > 0. ){
    //  vec2 centerBlob = vec2( length( pos - vHovered.xyz ) - .023 * vHovered.w, 10. );
    //  res = opU( res , centerBlob  );
    //}
//
    //if( vActive.w > 0. ){
    //  vec2 centerBlob = vec2( length( pos - vActive.xyz ) - .025 * vActive.w, 11. );
    //  res = opU( res , centerBlob  );
    //}







    return res;
    
}


$calcIntersection
$calcNormal
$calcAO



vec3 normCol(vec3 pos , vec3 norm , vec3 rd , vec3 lightDir , vec3 refl ){


  float lamb = dot( norm , normalize(lightDir));
  vec3 aCol = texture2D( t_audio , semLookup( rd , norm , modelViewMatrix , normalMatrix ) ).xyz;

 // if( length(col) < .5 ){
  vec3 col =  aCol * aCol * aCol;
  //}


  col += vec3( lamb );

  col *= vec3( .4, .4, 1.) ;

  return col;


}

vec3 painCol(vec3 pos , vec3 norm ,  vec3 rd , vec3 lightDir , vec3 refl  ){
  

    //col = texture2D( t_matcap , semLookup( rd , n , modelViewMatrix , normalMatrix ) ).xyz;

  float lamb = dot( norm , normalize(lightDir));

  vec3 col = texture2D( t_audio , vec2( lamb , 0. )).xyz * lamb * vec3( 1. , 0. , 0.);

  return col;

}

vec3 loveCol( vec3 pos,  vec3 norm ,  vec3 rd , vec3 lightDir , vec3 refl ){


  float lamb = dot( norm , normalize(lightDir));

  vec3 col = texture2D( t_audio , vec2( lamb , 0. )).xyz * lamb;//vec3( 0 , 0 , 0 );

  return vec3(1.) - (col * (norm * .5 + .5));// - col; //normalize(  col ); //vec3( 1. , 1. , 1. );

}


void main(){

  vec2 h = vec2(hash( vPos.z  * 100000.0), hash( vPos.z * 200000.0 ));

  vec3 fNorm = uvNormalMap( t_normal , vPos , vUv + h  , vec3( 0. , 1. , 0. ) , .1 , .6 );

  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );

  vec3 p = vec3( 0. );
  vec3 col =  vec3( 0. , 0. , 0. );

  vec3 bgCol = vec3( 0., 0. , 1.);

  col = bgCol;



  vec2 res = calcIntersection( ro , rd );

  if( res.y > -.5 ){

    p = ro + rd * res.x;
    vec3 n = calcNormal( p );
    col = n * .5 + .5;


    vec3 lightDir = lightPos-p;
    vec3 refl = reflect( lightDir , n );


    vec3 nCol = normCol( p , n , rd , lightDir , refl  );
    vec3 pCol = painCol( p , n , rd , lightDir , refl  );
    vec3 lCol = loveCol( p , n , rd , lightDir , refl  );

    col = nCol  * norm + pCol * pain + lCol * love;

  }else{
    discard;
  }



  //col = mix( col , vec3( 0.05 , 0.05 , 1. ), 1.-started);// + 1.0 * started

  //col = vec3( vUv.x , vUv.y , 0.);


   col = mix( col , vec3( 0.05 , 0.05 , 1. ), 1.-started);// + 1.0 * started


  gl_FragColor = vec4( col , 1. );

}