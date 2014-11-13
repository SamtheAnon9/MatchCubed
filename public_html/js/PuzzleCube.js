/*
 * Puzzle cube prototype by Samuel Cole.
 */

//Position should be a Vector3.
function PuzzleCube (position) {
    //Position is used for the position of the cube.
    this.position = position;
    //Geometry is the cube vertice set.
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    
    //Random number used for determining the colour of the cubes.
    var randNum = Math.random();  
    //This is where we create the mesh of the cube- the colour used is determined based on randNum. After getting 100000 points, purple is added.
    if (score < 100000)
    {
        if (randNum < 0.2)
            this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
        else if (randNum < 0.4)
            this.material = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } );
        else if (randNum < 0.6)
            this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        else if (randNum < 0.8)
            this.material = new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true } );
        else
            this.material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    }
    else
    {
        if (randNum < 0.17)
            this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
        else if (randNum < 0.33)
            this.material = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } );
        else if (randNum < 0.5)
            this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        else if (randNum < 0.66)
            this.material = new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true } );
        else if (randNum < 0.83)
            this.material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
        else
            this.material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
    }
    
    //The mesh- this links the material and the geometry used to create the cube.
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;
    
    //Triple is used for the cubes that are falling with this one- should be set where this cube is being created.
    this.triple = null;
    
    //Used to store whether the cube has stopped moving.
    this.stable = false;
    
    //Used to store whether this cube is part of a cascade (below cubes removed, now falling).
    this.cascading = false;
    
    //Used to store time until the cube should be deleted. 
    //If it is 1, doesn't get deleted- all other values will get deleted after the specified time.
    this.matchedTimer = 1;
    
    this.mesh.updateMatrix();
    
    scene.add(this.mesh);
    

}

//The update function for the cube.
PuzzleCube.prototype.Update = function() {
    //Update position.
    this.mesh.position.copy(this.position);
    
    //Spin cube.
    this.mesh.rotation.x += 0.1;
    this.mesh.rotation.y += 0.1;
    
    //If cube is about to be deleted, flash it repeatedly and remove time from its 'matchedTimer' variable.
    if (this.matchedTimer !== 1)
    {
        this.matchedTimer -= deltaTime;
        for (var i = 0; i < 10; ++i)
        {
            if (this.matchedTimer < (i * 0.1) && (this.matchedTimer + deltaTime) >= (i * 0.1))
                this.material.wireframe = !this.material.wireframe;
        }
    }
};

//Used to check if this cube is adjacent to any others of the same colour. Returns an array of cubes that are adjacent.
PuzzleCube.prototype.CheckAdjacency = function() {
    var output = [];
    
    for (var cubeIter = 0; cubeIter < cubes.length; ++cubeIter)
    {
        if (cubes[cubeIter].matchedTimer === 1 && 
            cubes[cubeIter].material.color.r === this.material.color.r && cubes[cubeIter].material.color.g === this.material.color.g && cubes[cubeIter].material.color.b === this.material.color.b
            && cubes[cubeIter].stable === true)
        {
            for (var i = -1; i <= 1; ++i)
            {
                for (var j = -1; j <= 1; ++j)
                {
                    if (!(i === 0 && j === 0))
                    {
                        //Hmmm, it seems the 'equals' function for Vector3 isn't working. I'll just compare specific variables.
                        if (cubes[cubeIter].position.x === this.position.x + i * 0.5 && cubes[cubeIter].position.y === this.position.y + j * 0.5)
                        {
                            output.push(cubes[cubeIter]);
                        }
                    }
                }
            }
        }
    }
    
    return output;
};

//Used to check if this cube is adjacent to one of the same colour in the given direction.
//Use TL for top-left, MM for middle-middle, BR for bottom-right or any other combination of two of those letters.
//Returns the cube in that direction if one is found, or false if no cube is found.
PuzzleCube.prototype.CheckDirection = function(direction) {
    for (var i = 0; i < cubes.length; ++i)
    {
        if (cubes[i].matchedTimer === 1 &&
            cubes[i].material.color.r === this.material.color.r && cubes[i].material.color.g === this.material.color.g && cubes[i].material.color.b === this.material.color.b
            && cubes[i].stable === true)
        {
            switch (direction) {
                case "TL":
                    if (cubes[i].position.x === this.position.x - 0.5 && cubes[i].position.y === this.position.y + 0.5)
                    {
                        return cubes[i];
                    }
                    break;
                case "TM":
                    if (cubes[i].position.x === this.position.x && cubes[i].position.y === this.position.y + 0.5)
                    {
                        return cubes[i];
                    }
                    break;
                case "TR":
                    if (cubes[i].position.x === this.position.x + 0.5 && cubes[i].position.y === this.position.y + 0.5)
                    {
                        return cubes[i];
                    }
                    break;
                case "ML":
                    if (cubes[i].position.x === this.position.x - 0.5 && cubes[i].position.y === this.position.y)
                    {
                        return cubes[i];
                    }
                    break;
                case "MR":
                    if (cubes[i].position.x === this.position.x + 0.5 && cubes[i].position.y === this.position.y)
                    {
                        return cubes[i];
                    }
                    break;
                case "BL":
                    if (cubes[i].position.x === this.position.x - 0.5 && cubes[i].position.y === this.position.y - 0.5)
                    {
                        return cubes[i];
                    }
                    break;
                case "BM":
                    if (cubes[i].position.x === this.position.x && cubes[i].position.y === this.position.y - 0.5)
                    {
                        return cubes[i];
                    }
                    break;
                case "BR":
                    if (cubes[i].position.x === this.position.x + 0.5 && cubes[i].position.y === this.position.y - 0.5)
                    {
                        return cubes[i];
                    }
                    break;
            }
        }
    }
    return false;
};