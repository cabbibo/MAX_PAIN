  function init(){

    G.slider = new Slider();

      G.uniforms = {

        t_audio:  { type:"t"  , value : null },
        dT:       { type:"f"  , value : 0             },
        time:     { type:"f"  , value : 0             },
        lightPos: { type:"v3" , value : null          },
        iModelMat:{ type:"m4" , value: new THREE.Matrix4() },
        t_matcap: { type:"t", value: G.textures.matcap},
        t_normal: { type:"t", value: G.textures.normal},
        t_color:  { type:"t", value: G.textures.family},

        pain:{type:"f", value:0},
        love:{type:"f", value:0},
        norm:{type:"f", value:0},
        speed:{type:"f", value:0},

        lightPos:{type:"v3",value:new THREE.Vector3( 1 , 1 , -1 )},
        started:{type:"f", value:0},
        bgCol:{type:"v3", value:new THREE.Vector3(1,1,1)},

        life :{type:"f", value:0}


      }

      G.uniforms.t_audio.value = G.audio.texture;

      

      G.volumes = {};

      G.volumes.click = G.audio.ctx.createGain();
      G.volumes.click.connect( G.audio.gain );
      G.clickNote = new BufferedAudio(  G.clickNoteBuffer.buffer , 
                                        G.audio.ctx ,
                                        G.volumes.click , 
                                        false );

      G.volumes.start = G.audio.ctx.createGain();
      G.volumes.start.connect( G.audio.gain );
      G.startNote = new BufferedAudio(  G.startNoteBuffer.buffer , 
                                        G.audio.ctx ,
                                        G.volumes.start , 
                                        false );



      G.volumes.jest = G.audio.ctx.createGain();
      G.volumes.jest.connect( G.audio.gain );
      G.jestNote = new BufferedAudio(  G.jestNoteBuffer.buffer , 
                                        G.audio.ctx ,
                                        G.volumes.jest , 
                                        false );


      G.volumes.pain = G.audio.ctx.createGain();
      G.volumes.pain.connect( G.audio.gain );
      G.painLoop = new BufferedAudio( G.painLoopBuffer.buffer , 
                                      G.audio.ctx ,
                                      G.volumes.pain, 
                                      true );

      G.volumes.love = G.audio.ctx.createGain();
      G.volumes.love.connect( G.audio.gain );
      G.loveLoop = new BufferedAudio( G.loveLoopBuffer.buffer , 
                                      G.audio.ctx ,
                                      G.volumes.love , 
                                      true );

      G.volumes.norm = G.audio.ctx.createGain();
      G.volumes.norm.connect( G.audio.gain );
      G.normLoop = new BufferedAudio( G.normLoopBuffer.buffer , 
                                      G.audio.ctx ,
                                      G.volumes.norm , 
                                      true );


      /*

         Default threejs stuff!

      */
      G.three.scene = new THREE.Scene();

      var ar = window.innerWidth / window.innerHeight;

      G.three.camera = new THREE.PerspectiveCamera( 40, ar , .01, 1000 );
      G.three.camera.position.z = .5;

      G.three.renderer = new THREE.WebGLRenderer({antialias:true});
      G.three.renderer.setSize( window.innerWidth, window.innerHeight );
      //renderer.setPixelRatio( 4.5 )

      G.three.renderer.setClearColor( 0x1a1aff , 1 )

      G.three.renderer.domElement.id = "renderer"
      document.body.appendChild( G.three.renderer.domElement );
      G.three.renderer.domElement.style.pointerEvents = "none";

      //G.three.objectControls = new ObjectControls( G.three.camera );


      //G.three.controls = new THREE.TrackballControls( G.three.camera );

     // G.three.controls = new THREE.MouseMoveControls( G.three.camera );



      G.three.stats = new Stats();
      G.three.stats.domElement.style.position = "absolute";
      G.three.stats.domElement.style.left = "0px";
      G.three.stats.domElement.style.bottom = "-30px";
      G.three.stats.domElement.style.zIndex = "999";
      //document.body.appendChild( G.three.stats.domElement );


      window.addEventListener( 'resize', onWindowResize, false );

      G.three.clock = new THREE.Clock();


      var fs = G.shaders.setValue( G.shaders.fs.trace , 'links' , G.TOTAL_LINKS );
      var vs = G.shaders.setValue( G.shaders.vs.trace    , 'links' , G.TOTAL_LINKS );


      var mat = new THREE.ShaderMaterial({
        uniforms: G.uniforms,
        vertexShader: vs,
        fragmentShader: fs,
      })


      G.rotator = new THREE.Object3D();
      G.rotator.position.x = .13;
      G.three.scene.add( G.rotator );

      G.highBody = new THREE.Mesh( G.highGeo , mat );

      G.rotator.add( G.highBody );
      G.highBody.rotation.z = Math.PI;
      G.highBody.rotation.y = Math.PI;
      
      G.highBody.position.y = 0;

      var geo = new THREE.PlaneGeometry( .5 , 4 );
      var mat = new THREE.ShaderMaterial({
        uniforms: G.uniforms,
        vertexShader: G.shaders.vs.bgBox,
        fragmentShader: G.shaders.fs.bgBox,
      });

      var mesh = new THREE.Mesh( geo , mat );
      G.three.scene.add( mesh );
      mesh.position.z = -1;
      mesh.position.x = -.3;



      var geo = new THREE.IcosahedronGeometry( .03 , 4 );
      var mat = new THREE.ShaderMaterial({
        uniforms: G.uniforms,
        vertexShader: G.shaders.vs.halo,
        fragmentShader: G.shaders.fs.halo,

      });

      G.mandala = [];

      for( var j = 0; j < 5; j++){
        var obj = new THREE.Object3D();

        for( var i = 0; i < 10; i++ ){

          var mesh = new THREE.Mesh( geo , mat );

          mesh.rotation.z = (i / 10 ) * 2 * Math.PI;
          obj.add( mesh );
          G.mandala.push( mesh );
          mesh.visible = false;
          mesh.frustumCulled = false;
        }

        obj.position.z = -.2 + .2 * (-j / 5);
        obj.scale.multiplyScalar( ((j+1) / 5) * 4. );

        obj.rotation.x = Math.random();
        obj.rotation.y = Math.random();
        obj.rotation.z = Math.random();
        obj.lookAt( new THREE.Vector3());
        
        G.rotator.add( obj );


      }

      G.trailParticles = TrailParticles(7 * 3);
      //.three.scene.add( G.trailParticles );




  }
