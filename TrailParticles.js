function TrailParticles(numTriangles){

  var geo = new THREE.BufferGeometry();  
  
  var positions = new Float32Array( numTriangles *  3 * 3 );
  var uvs       = new Float32Array( numTriangles *  3 * 2 );

  var pos  = new THREE.BufferAttribute( positions , 3 );
  var uv  = new THREE.BufferAttribute( uvs , 2 );


  geo.addAttribute( 'position' , pos );
  geo.addAttribute( 'uv' , uv );

  var vertCount = 0;

  var v1 = new THREE.Vector3();

  for( var i = 0; i < numTriangles; i++ ){


    var index = i * 3;

    v1.x = (i % 3 ) * -.2 - .1 ;//(Math.random() -.5 ) * 5;
    v1.y = (((Math.floor(i/3)*3) / numTriangles) -.5) * 2;//(Math.random() -.5 ) * 4;
    v1.z = -1 - Math.random() * .002;// - .01 *(Math.floor(i/3)*3) ;//-(Math.random() ) * 3 - 1;


    //v1.x = (Math.random() -.5 ) * 1 - .4;
    //v1.y = (Math.random() ) * 2- 1 ;
    //v1.z = -1 - Math.random() * .3;// - .01 *(Math.floor(i/3)*3) ;//-(Math.random() ) * 3 - 1;

    positions[ index * 3 + 0 ] = v1.x; 
    positions[ index * 3 + 1 ] = v1.y;
    positions[ index * 3 + 2 ] = v1.z;

    positions[ index * 3 + 3 ] = v1.x; 
    positions[ index * 3 + 4 ] = v1.y;  
    positions[ index * 3 + 5 ] = v1.z; 

    positions[ index * 3 + 6 ] = v1.x;
    positions[ index * 3 + 7 ] = v1.y; 
    positions[ index * 3 + 8 ] = v1.z;

    uvs[ index * 2 + 0 ] = 1; 
    uvs[ index * 2 + 1 ] = 0; 

    uvs[ index * 2 + 2 ] = 0; 
    uvs[ index * 2 + 3 ] = 0; 

    uvs[ index * 2 + 4 ] = 0.5; 
    uvs[ index * 2 + 5 ] = 1; 


  }

  var mat = new THREE.ShaderMaterial({
    uniforms: G.uniforms,
    vertexShader: G.shaders.vs.trailParticles,
    fragmentShader: G.shaders.fs.trailParticles,
    side:THREE.DoubleSide,
  });

  var mesh = new THREE.Mesh( geo , mat );
  
  return mesh;

}

