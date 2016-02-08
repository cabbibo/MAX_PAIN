function Song( audio , controls , id , params ){

  this.params = params;
  
  this.body = new THREE.Mesh( this.params.geo , this.params.mat );
  this.position = this.body.position;
  this.velocity = new THREE.Vector3();
  this.force    = new THREE.Vector3();

  controls.add( this.body );

  this.body.hoverOver = this.hoverOver.bind( this );
  this.body.hoverOut  = this.hoverOut.bind( this );
  this.body.select    = this.select.bind( this );

  this.hovered = 0;

  this.audio = this.params.audio;

  this.file = this.params.file;
  this.title = this.params.title;
  console.log( this.params.buffer )

  this.sound = new BufferedAudio( this.params.buffer , audio.ctx , audio.gain , false );1
  this.uniform = new THREE.Vector4();


  var fs = shaders.setValue( shaders.fs[params.playne] , 'links' , LINKS.length );
  var vs = shaders.setValue( shaders.vs[params.playne] , 'links' , LINKS.length );
  
  this.playneMat = new THREE.ShaderMaterial({
    uniforms:uniforms,
    vertexShader  : vs,
    fragmentShader: fs,
  });

  this.bgVS = shaders.vs[params.bg];
  this.bgFS = shaders.fs[params.bg];

  this.bgMat = new THREE.ShaderMaterial({
    uniforms:uniforms,
    vertexShader  : shaders.vs[params.bg],
    fragmentShader: shaders.fs[params.bg],
  });


}

Song.prototype.updatePosition = function(v){

  this.uniform.x = v.x;
  this.uniform.y = v.y;
  this.uniform.z = v.z;
  this.body.position.copy( v );

}

Song.prototype.updateForces = function(){

  this.force.set( 0 , 0 , 0 );
  v1.set( 0 , .03 , -.06 );

  this.force.copy( this.position );
  this.force.sub( v1 );
  this.force.multiplyScalar( -2.1 );

  for( var i = 0; i < links.length; i++ ){
    if( links[i] != this ){
      v1.copy( links[i].position );
      v1.sub( this.position );
      var l = v1.length();
      l -= .4;
      this.force.add( v1.normalize().multiplyScalar( l * l * l ) );
    }
  }


  this.velocity.add( this.force.multiplyScalar( .01 ) );



}

Song.prototype.update = function(){


  this.position.add( this.velocity );
  this.updatePosition( this.position );


  this.velocity.multiplyScalar( .95 );
  

}

Song.prototype.hoverOver = function(){

  this.sound.play();

  this.hovered = 1;


  hoveredLink = this;

  //mainBody.visible = true;
  //highBody.visible = false;

  //controls.velocity += .01;


}

Song.prototype.hoverOut = function(){

  this.hovered = 0;

  hoveredLink = undefined;

 // mainBody.visible = false;
 // highBody.visible = true;
  
  
}


Song.prototype.select = function(){

  v1.set( Math.random() - .5 ,Math.random() - .5,Math.random() - .5 );
  v1.multiplyScalar( .02 );
  this.velocity.add( v1 );

  if( activeLink !== this ){

    var file = "audio/" + this.file + ".mp3";

    switchStream( file , this );

    activeLink = this;

  }

  
}