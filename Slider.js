function Slider(){
  
  this.mainBody = document.createElement("div");
  this.filledBody = document.createElement("div");
  this.buttonBody = document.createElement("div");
  this.mainBody.id = "mainBody";
  this.filledBody.id = "filledBody";
  this.buttonBody.id = "buttonBody";

  this.mainBody.style.width = window.innerWidth - 22;
  this.mainBody.style.left = 14;

  this.x = 0;
  this.down;

  this.life = 0;

  this.mainBody.onmouseover = function(){
   // console.log("Sss");
  }

  this.mainBody.onmouseout = function(){
   // console.log("ss");
  }

  document.body.onmousemove = function(e){

    if( this.down == true ){
      this.x = e.clientX - 9;
      this.life = this.x / window.innerWidth;
      this.setNewPos( this.life );

  
    }

  }.bind( this );

  this.buttonBody.onmousedown = function(){
    this.down = true;
  }.bind( this );

  document.body.onmouseup = function(){
    this.down = false;
  }.bind( this );



  this.mainBody.appendChild( this.filledBody );
  this.mainBody.appendChild( this.buttonBody );
}


Slider.prototype.setNewPos = function(life){

  var pos = life * window.innerWidth;
  this.life = life;
  this.x = life * window.innerWidth;
  this.filledBody.style.width = this.x;
  this.buttonBody.style.left = this.x - 24;
}

Slider.prototype.addToDoc = function(){
  document.body.appendChild( this.mainBody );
}

Slider.prototype.update = function(){



}

Slider.prototype.check = function(){
  console.log("EY");
}

