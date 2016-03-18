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

  this.element = document.getElementById("fake");

  this.totalHeight = 15000;
  this.holder = document.createElement("div");
  this.holder.style.position = "absolute"; 
  this.holder.style.left = "0px";
  this.holder.style.top = this.totalHeight + "px";
  this.holder.innerHTML = "."

  document.body.appendChild( this.holder );  //document.body.


  //this.mainBody.style.width = window.innerWidth - 22;
  //this.mainBody.style.left = 14;

  this.x = 0;
  this.down;

  this.speed = 0;

  this.life = 0;
  this.alive = true;
  this.actualPos = 0;

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
  //document.body.appendChild( this.mainBody );
  document.body.appendChild( this.infoBody );
}

Slider.prototype.removeFromDoc = function(){
  //document.body.removeChild( this.mainBody );
  this.mainBody.remove();
}
/*Slider.prototype.update = function(){

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

} */

Slider.prototype.update = function(){


  if( this.active == true ){

  var doc = document.body;

 // var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  //console.log( top );

  var dif = top - this.actualPos;

  console.log( dif );

  this.oAcutalPos = this.actualPos;

  this.actualPos = this.actualPos + dif * .1;

  this.oSpeed = this.speed;
  this.speed = this.actualPos - this.oAcutalPos;

  this.speed = ( this.speed - this.oSpeed ) * .1 + this.oSpeed;

  this.life = this.actualPos / this.totalHeight;


  this.oTotalHeight = this.totalHeight;
  this.totalHeight = this.life  * 80000 + ( this.life + this.life  *  120000 )+ 15000;

  this.totalHeight = (this.totalHeight - this.oTotalHeight) * .1 + this.oTotalHeight;
    if( doc.scrollTop < 0 || window.pageYOffset < 0){
      doc.scrollTop = 0;
      window.pageYOffset = 0;
    }

    if( doc.scrollTop >= this.totalHeight ||window.pageYOffset >= this.totalHeight){
      doc.scrollTop = this.totalHeight;
      window.pageYOffset = this.totalHeight;
    }
  
  this.holder.style.top = this.totalHeight + "px";


  console.log( this.life );

  this.setNewPos( this.life );

    if( this.life > .98  && !this.enderAdded ){ 

      this.addEnder();
      this.enderAdded = true;
      
    }

  }else{
     var doc = document.body;

    doc.scrollTop = 0;
    window.pageYOffset = 0;
  }


    //if( this.life <= 0 ){  this.speed *= .8; this.speed += 5.1 * -this.life * 1000; }


}

Slider.prototype.endItAll = function(){

  this.alive = false;

  end(); 

  this.infoBody.remove();
  this.ender.remove();
  this.active = false;

}

Slider.prototype.addEnder = function(){

  var ender = document.createElement("a");
  ender.innerHTML = "\u2022 close"
  ender.id ="ender";
  ender.onclick = function(){ this.endItAll() }.bind( this );
  this.ender = ender;
  document.body.appendChild( ender );
}


Slider.prototype.onMouseWheel = function( e ){
  //console.log( e.deltaY );

  //this.speed += .1 * e.deltaY;

}

Slider.prototype.check = function(){
  console.log("EY");
}

