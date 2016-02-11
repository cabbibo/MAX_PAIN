
  function updateUniforms(){

    G.uniforms.time.value += G.three.clock.getDelta();
    
    G.highBody.updateMatrixWorld();
    G.uniforms.iModelMat.value.getInverse( G.highBody.matrixWorld );

    G.uniforms.pain.value = G.pain;
    G.uniforms.love.value = G.love;
    G.uniforms.norm.value = G.norm;

    G.uniforms.life.value = G.life;

   
  }

  function convertLifeToRenderColor(){

    var c = getBackgroundColor(G.life);
    G.three.renderer.setClearColor( c , 1 );
  }



  function onWindowResize() {

    G.three.camera.aspect = window.innerWidth / window.innerHeight;
    G.three.camera.updateProjectionMatrix();

    G.three.renderer.setSize( window.innerWidth, window.innerHeight );


  }

function makeNewUniforms(newPropt , newUniform ){

  var uni = {};
  for( var propt in G.uniforms){
    uni[propt] = G.uniforms[propt];
  }

  uni[newPropt] = newUniform;

  return uni;



}


function convertLife(){

  var loveStartVal = .93;
  var loveFullVal  = 1;

  var painStartVal = 0;
  var painFullVal = .6;

  if( G.life < loveStartVal ){
    G.pain = Math.min( G.life / painFullVal , 1 ); 
  }else{
    G.pain = Math.max( 1. - (G.life - loveStartVal) * 30. , 0 ); 
  }

  G.norm = Math.max( 1.0 - G.life / painFullVal , 0 );
  G.love = Math.min(Math.max( (G.life - loveStartVal) * 1.2 / ( 1-loveStartVal) , 0.) , 1. )



}

function getBackgroundColor( life ){

  
  var n = G.colors.norm.getHSL();
  var p = G.colors.pain.getHSL();
  var l = G.colors.love.getHSL();

  var fH = n.h * G.norm + p.h * G.pain + l.h * G.love;
  var fS = n.s * G.norm + p.s * G.pain + l.s * G.love;
  var fL = n.l * G.norm + p.l * G.pain + l.l * G.love;

  var color = new THREE.Color().setHSL( fH , fS , fL );

  var hex = color.getHex();


  var n = G.colors.norm;
  var p = G.colors.pain;
  var l = G.colors.love;



  var fH = n.r * G.norm + p.r * G.pain + l.r * G.love;
  var fS = n.g * G.norm + p.g * G.pain + l.g * G.love;
  var fL = n.b * G.norm + p.b * G.pain + l.b * G.love;


  fH = Math.max(Math.min(fH , 1) , 0 );
  fS = Math.max(Math.min(fS , 1) , 0 );
  fL = Math.max(Math.min(fL , 1) , 0 );



  var color = new THREE.Color().setRGB( fH , fS , fL );
  color.lerp( G.colors.norm ,1-G.uniforms.started.value );

  var hex = color.getHex();



 // console.log( color.getHexString());
  G.slider.filledBody.style.background = "#" + color.getHexString();
  G.slider.mainBody.style.border = "4px solid #" + color.getHexString();



  //G.renderer.

  return hex;

}

function updateVolumes(){
  G.volumes.love.gain.value = G.love;
  G.volumes.pain.gain.value = Math.pow( G.pain , 20) * 1.3;
  G.volumes.norm.gain.value = G.norm;
}

function tweenLife( endVal , time ){

  //changeNote.play();

  var start = G.life;
  var end = endVal
  var dif = end - start;
  var tween = new TWEEN.Tween( 0 ).to(1 , time );

 
  tween.onUpdate(function(t){
    console.log( dif );
    G.life = t * dif + start;
    G.slider.setNewPos( G.life );
  }.bind( this));

  tween.onComplete( function(){

  })

  tween.start();

}