
function setUpGlobal(){

  G = {

    link:[],
    audioBuffers:[],

    loading:{

      loaded:0,
      neededToLoad:0

    },

    TOTAL_LINKS: 5,

  };

  G.ended = false;

  G.pain = 0;
  G.norm = 1;
  G.love = 0;
  G.life = 0;

  G.colors = {

    norm: new THREE.Color(0x1a1aff),
    pain: new THREE.Color(0x550000),
    love: new THREE.Color(0xffffff),
    
  }

  G.three = {

    scene           : undefined,
    camera          : undefined,
    renderer        : undefined,
    clock           : undefined,
    controls        : undefined,
    objectControls  : undefined,

  }

  var iPoint;


  G.shaders = new ShaderLoader( 'shaders' , 'shaders/chunks' );
  G.v1      = new THREE.Vector3();

  /*

     Setting up Audio

  */
  G.audio = new AudioController();
  //G.audio.mute.gain.value = 0;




  G.controlMat = new THREE.MeshBasicMaterial();
  G.controlGeo = new THREE.IcosahedronGeometry(.03 , 2);


  TWEEN.origTween = TWEEN.Tween;
  TWEEN.Tween = function (options){
    var res = new TWEEN.origTween(options);
    res.easing(TWEEN.Easing.Quadratic.InOut);
    return res;
  };


  G.v1 = new THREE.Vector3();

}