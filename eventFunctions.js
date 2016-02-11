

function start(){


  G.startNote.play();

  animate();

  startTween(50);

}

function end(){

  G.jestNote.play();
  G.volumes.jest.gain.value = 3;

  endTween( 5000 );

}

function endTween( time ){
  var tween = new TWEEN.Tween( 0 ).to(1 , time );

  var sL = G.volumes.love.gain.value;
  var sP = G.volumes.pain.gain.value;
  var sN = G.volumes.norm.gain.value;
  var startLife = G.life;

  tween.onUpdate(function(t){

   // G.volumes.start.gain.value = t;
    G.uniforms.started.value = 1-t;
    G.volumes.love.gain.value = sL * ( 1 - t);
    G.volumes.pain.gain.value = sP * ( 1 - t);
    G.volumes.norm.gain.value = sN * ( 1 - t);

    G.life = startLife * ( 1 - t );

    G.slider.setNewPos( G.life );

  }.bind( this));

  tween.onComplete( function(){
    trueEnd();
  })

  tween.start();
}

function trueEnd(){
  console.log( "DONE" );

  G.volumes.love.gain.value = 0;
  G.volumes.pain.gain.value = 0;
  G.volumes.norm.gain.value = 0;

  G.ended = true;
  G.slider.removeFromDoc();

}

function startTween( time ){

  var start = G.life;
  var end = 0
  var dif = end - start;
  var tween = new TWEEN.Tween( 0 ).to(1 , time );

 
  tween.onUpdate(function(t){
    G.volumes.start.gain.value = 1-t;

    G.uniforms.started.value = t;
    //G.life = t * dif + start;
    //console.log( e );
  }.bind( this));

  tween.onComplete( function(){
      trueStart();
  })

  tween.start();



}

function trueStart(){

  for( var i = 0; i < G.mandala.length; i++ ){
    G.mandala[i].visible = true;
  }

  G.clickNote.play();

  G.painLoop.play();
  G.volumes.pain.gain.value = 0;
  G.loveLoop.play();
  G.volumes.love.gain.value = 0;
  G.normLoop.play();

  G.slider.addToDoc();
  G.slider.active = true;



}