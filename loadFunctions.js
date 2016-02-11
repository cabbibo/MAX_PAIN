function beginLoad(){
  loadShaders();
  loadImages();
  loadModels();
  loadAudio();
}

function loadShaders(){

  //shaders.load( 'ss-curlFront'    , 'sim'    , 'simulation' );

  G.loading.neededToLoad ++;

  G.shaders.load( 'fs-trace'  , 'trace' , 'fragment' );
  G.shaders.load( 'vs-trace'  , 'trace' , 'vertex'   );

  G.shaders.load( 'vs-halo' , 'halo' , 'vertex' );
  G.shaders.load( 'fs-halo' , 'halo' , 'fragment' );

  G.shaders.load( 'vs-trailParticles' , 'trailParticles' , 'vertex' );
  G.shaders.load( 'fs-trailParticles' , 'trailParticles' , 'fragment' );

  
  G.shaders.shaderSetLoaded = function(){
    onLoad();
  }

}



function loadImage(url){

  G.loading.neededToLoad ++;
  var r = THREE.RepeatWrapping;

  var t = THREE.ImageUtils.loadTexture(url, r , onLoad, onError);
  t.wrapT = t.wrapS = THREE.RepeatWrapping;
  return t;

}

function loadImages(){

  G.textures = {};

  G.textures.matcap   = loadImage('img/rough-aluminium.jpg');
  G.textures.normal   = loadImage('img/t_n_snakeSkin.png' );
  G.textures.colorTex = loadImage('assets/Model.jpg' );

}

function loadModels(){

  G.loading.neededToLoad += 1;

  var loader = new THREE.OBJLoader();
  var faceGeo,highGeo;
  /*loader.load( 'assets/low.obj', function ( object ) {


    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {

        if( child.name == "Model"){

          G.faceGeo = child.geometry
          G.faceGeo.computeFaceNormals();
          G.faceGeo.computeVertexNormals();

        }

      }

    } );

    onLoad();

  }, onProgress, onError );*/


  loader.load( 'assets/high.obj', function ( object ) {


    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {

        if( child.name == "Model"){

          G.highGeo = child.geometry
          G.highGeo.computeFaceNormals();
          G.highGeo.computeVertexNormals();

        }

      }

    } );

    onLoad();

  }, onProgress, onError );

}

function loadAudio(){

  loadBuffer( "loveLoopBuffer"  , "audio/love.mp3"      );
  loadBuffer( "painLoopBuffer"  , "audio/pain.mp3"      );
  loadBuffer( "normLoopBuffer"  , "audio/norm.mp3"      );

  loadBuffer( "clickNoteBuffer" , "audio/switch.mp3"    );
  loadBuffer( "startNoteBuffer" , "audio/startNote.mp3" );
  loadBuffer( "jestNoteBuffer"  , "audio/jest.mp3" );



}

function loadBuffer(name , bufferFile){

  var aBuff = new AudioBuffer( G.audio , bufferFile);
  G[name] = aBuff;
  G.loading.neededToLoad += 1;
  aBuff.addLoadEvent(function(){
    onLoad();
  })

}

function onLoad(){

  G.loading.loaded ++;

  console.log( G.loading );


  if( G.loading.loaded == G.loading.neededToLoad ){

    finishedLoading();

  }

}

// TODO: these catch?
function onProgress(e){
  console.log( e );
}

function onError(e){
  console.log( e );
}

function finishedLoading(){
  init(); 
  start();
}
