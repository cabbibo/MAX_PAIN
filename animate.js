
  function animate(){

    if( G.ended == false ){
      var oLife = G.life;

      requestAnimationFrame( animate );
      G.slider.update();

      G.bgBox.position.x = -1 + G.life * .6;
      G.rotator.position.x = -.1 + G.life * .3;

      G.life = G.slider.life;
      convertLife();

      G.uniforms.speed.value = G.life - oLife;

      var rotFactor = Math.pow(Math.max(0 ,(G.life - G.love * 2)),8);
      for( var i = 0; i < G.mandala.length; i++ ){
        G.mandala[i].rotation.z += .02 * rotFactor * ( Math.floor(i/10) +1 );
      }

      updateVolumes();
      updateUniforms();
      convertLifeToRenderColor();
      G.rotator.rotation.y  = -G.life * 10 - .9;

      //G.three.controls.update();
      //G.three.objectControls.update();

      G.audio.update();

      TWEEN.update();

      G.three.renderer.render( G.three.scene , G.three.camera );
      G.three.stats.update();

    }


  }
