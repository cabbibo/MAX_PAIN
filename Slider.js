function Slider(){
  
  this.mainBody = document.createElement("div");
  this.filledBody = document.createElement("div");
  this.buttonBody = document.createElement("div");
  this.infoBody = document.createElement("div");
  this.mainBody.id = "mainBody";
  this.filledBody.id = "filledBody";
  this.buttonBody.id = "buttonBody";
  this.infoBody.id ="infoBody";

  this.infoBody.innerHTML = "scroll  <br/> &#x2193; &#x2193; &#x2193;"


  //this.mainBody.style.width = window.innerWidth - 22;
  //this.mainBody.style.left = 14;

  this.x = 0;
  this.down;

  this.speed = 0;

  this.life = 0;
  this.alive = true;

  this.mainBody.onmouseover = function(){
   // console.log("Sss");
  }

  this.mainBody.onmouseout = function(){
   // console.log("ss");
  }

  document.body.onmousemove = function(e){

    if( this.down == true && this.alive == true ){
      this.y = e.clientY ;
      this.life = this.y / (window.innerHeight);
      this.setNewPos( this.life );

  
    }

  }.bind( this );

  this.buttonBody.onmousedown = function(){
    this.down = true;
  }.bind( this );

  document.body.onmouseup = function(){
    this.down = false;
  }.bind( this );



  //this.mainBody.appendChild( this.filledBody );
  this.mainBody.appendChild( this.buttonBody );

  document.addEventListener( 'mousewheel', this.onMouseWheel.bind( this ) , false );
  /*$(window).bind('mouseD2`own' , function(){
    console.log('aa');
  });*/

}


Slider.prototype.setNewPos = function(life){

  var pos = life * window.innerHeight;
  this.life = life;
  this.x = life * window.innerHeight;
  this.filledBody.style.height = this.x;
  this.buttonBody.style.top = this.x - 24;
}

Slider.prototype.addToDoc = function(){
  document.body.appendChild( this.mainBody );
  document.body.appendChild( this.infoBody );
}

Slider.prototype.removeFromDoc = function(){
  //document.body.removeChild( this.mainBody );
  this.mainBody.remove();
}
Slider.prototype.update = function(){

  if( this.active == true ){

    if( this.alive == true ){
      this.speed *= .95;

      this.life += .00001 * this.speed * ( 1.02 - this.life );

    }

  

    this.setNewPos( this.life );

    if( this.life > .98 ){ 

      this.alive = false;
      this.life = 1;

      end(); 

      this.infoBody.remove();
    }

    this.infoBody.style.top = - this.life * 200

  }

  if( this.life <= 0 ){  this.speed *= .8; this.speed += 5.1 * -this.life * 1000; }

}

Slider.prototype.onMouseWheel = function( e ){
  console.log( e.deltaY );

  this.speed += .1 * e.deltaY;

}

Slider.prototype.check = function(){
  console.log("EY");
}

