/*
 * Wall prototype by Samuel Cole.
 */

//Position should be a Vector3.
function Wall (position) {
    //Position is used for the position of the cube.
    this.position = position;
    //Geometry is the cube vertice set.
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    //Material is the texture of the cube.
    this.material = new THREE.MeshBasicMaterial( { color: 0xd9d7d7, wireframe: true} );

    
    //The mesh- this links the material and the geometry used to create the cube.
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;
    
    this.mesh.matrixAutoUpdate = false;
    this.mesh.updateMatrix();
    
    scene.add(this.mesh);
}

