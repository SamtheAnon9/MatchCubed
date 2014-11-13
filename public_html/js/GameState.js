/* 
 * Gamestate script by Samuel Cole.
 */

//Whether the gamestate has been initialised yet.
var gameInitialised = false;

//The cubes the player currently has selected.
var selectedCubes = [];

//The players score.
var score = 0;

//The time until the cubes move down.
var timeToMoveDown = 0.25;

//The time that timeToMoveDown should reset to.
var timeToResetTo = 0.25;

//An array containing all of the cubes within the game.
var cubes = [];

//An array containing all of the cubes used in the wall that marks the endgame height.
var gameEndWall = [];

//The time until the game can be paused.
var timeUntilCanPauseAgain = 5;

var gameInit = function() {
    var firstTriple1 = new PuzzleCube(new THREE.Vector3(0, 5, 0));

    cubes.push(firstTriple1);

    var firstTriple2 = new PuzzleCube(new THREE.Vector3(0, 4.5, 0));
    cubes.push(firstTriple2);

    var firstTriple3 = new PuzzleCube(new THREE.Vector3(0, 4, 0));
    cubes.push(firstTriple3);

    firstTriple1.triple = [firstTriple1, firstTriple2, firstTriple3];
    firstTriple2.triple = [firstTriple1, firstTriple2, firstTriple3];
    firstTriple3.triple = [firstTriple1, firstTriple2, firstTriple3];
    
    selectedCubes = [firstTriple1, firstTriple2, firstTriple3]

    //Making the wall to show maximum height.
    for (var i = 0; i < 21; ++i)
    {
        var wall = new Wall(new THREE.Vector3(-5 + 0.5 * i, 3, 0));
        gameEndWall.push(wall);
    }
    document.getElementById("scoreText").innerHTML = "Score: " + score;
    
    camera.position.z = 200;
}

//Updates all of the cubes.
var CubeUpdate = function() {
    for (var i = cubes.length - 1; i >= 0; --i)
    {
        var shouldBeStable = false;
        for (var j = 0; j < cubes.length; ++j)
        {
            if (cubes[j].stable && cubes[j].position.x === cubes[i].position.x && cubes[j].position.y === cubes[i].position.y - 0.5)
            {
                shouldBeStable = true;
                break;
            }
        }
        if (cubes[i].position.y === -3 || shouldBeStable)
        {
            cubes[i].stable = true;
            if (selectedCubes.indexOf(cubes[i]) !== -1)
            {
                SpawnTriple();
            }
        }
        
        if (!cubes[i].stable)
        {            
            //Move left/right/switch colours.
            if (selectedCubes.indexOf(cubes[i]) !== -1)
            {
                if (InputManager.WasJustPressed(InputManager.LEFT) ||
                    (!(InputManager.GetTouchPos().y > 2 * window.innerHeight / 3) && InputManager.GetTouchPos().x < window.innerWidth / 2))
                {
                    var shouldMove = true;
                    if (cubes[i].position.x === -5)
                        shouldMove = false;
                    for (var j = 0; j < cubes.length; ++j)
                    {
                        if (cubes[j].position.x === cubes[i].position.x - 0.5 && cubes[j].position.y === cubes[i].position.y)
                            shouldMove = false;                    
                    }
                    if (shouldMove)
                        cubes[i].position.x -= 0.5;
                }
                if (InputManager.WasJustPressed(InputManager.RIGHT) ||
                    (!(InputManager.GetTouchPos().y > 2 * window.innerHeight / 3) && InputManager.GetTouchPos().x > window.innerWidth / 2))
                {
                    var shouldMove = true;
                    if (cubes[i].position.x === 5)
                        shouldMove = false;
                    for (var j = 0; j < cubes.length; ++j)
                    {
                        if (cubes[j].position.x === cubes[i].position.x + 0.5 && cubes[j].position.y === cubes[i].position.y)
                            shouldMove = false;                    
                    }
                    if (shouldMove)
                        cubes[i].position.x += 0.5;
                }
                if (InputManager.WasJustPressed((InputManager.UP) || 
                    InputManager.GetTouchPos().y > 2 * window.innerHeight / 3) && i % 3 === 0)   //I use % 3 === 0 because in each group of three, there will only be one that this is true for.
                {
                    var colour0 = selectedCubes[0].material.color;
                    var colour1 = selectedCubes[1].material.color;
                    var colour2 = selectedCubes[2].material.color;
                    
                    selectedCubes[0].material.color = colour1;
                    selectedCubes[1].material.color = colour2;
                    selectedCubes[2].material.color = colour0;
                }
            }
        }
              
        cubes[i].Update();
    }
    
    //Move cubes down.
    if (timeToMoveDown <= 0)
    {
        for (var i = 0; i < cubes.length; ++i)
        {
            if (cubes[i].stable === false)
                cubes[i].position.y -= 0.5;
        }
        timeToMoveDown = timeToResetTo;
    }
    timeToMoveDown -= deltaTime;
    
    //Here I am checking to update stable for the second time- its good to recheck for stability before matches are done, and after all falling has been done.
    var alreadySpawned = false;
    for (var i = cubes.length - 1; i >= 0; --i)
    {
        var shouldBeStable = false;
        for (var j = 0; j < cubes.length; ++j)
        {
            if (cubes[j].stable && cubes[j].position.x === cubes[i].position.x && cubes[j].position.y === cubes[i].position.y - 0.5)
            {
                shouldBeStable = true;
                break;
            }
        }
        if (cubes[i].position.y === -3 || shouldBeStable)
        {
            cubes[i].stable = true;
            if (cubes[i].position.y >= 3)
            {
                ClearGame();
                state = "gameover";
                break;
            }
            if (selectedCubes.indexOf(cubes[i]) !== -1 && alreadySpawned === false)
            {
                SpawnTriple();
                alreadySpawned = true;
            }
        }
    }
};

//This function checks to see if matches should be made, and clears those cubes. Also updates the player's score.
var MakeMatches = function () {
    
    //This stores all cubes to delete.
    var cubesToDelete = [];
        
    for (var i = 0; i < cubes.length; ++i)
    {
        if (cubes[i].stable === true)
        {
            var adjacentCubes = cubes[i].CheckAdjacency();
            for (var j = 0; j < adjacentCubes.length; ++j)
            {
                //This is used for storing all of the cubes so far.
                var cubesList = [cubes[i], adjacentCubes[j]];
            
                //Used to tell the direction the matches are occuring in.
                //var positionDifference = adjacentCubes[j].position.sub(cubes[i].position);  //Sub seems to be -=, not -.
                var positionDifference = new THREE.Vector3(adjacentCubes[j].position.x - cubes[i].position.x,
                                                           adjacentCubes[j].position.y - cubes[i].position.y,
                                                           adjacentCubes[j].position.z - cubes[i].position.z);
            
                while (cubesList[cubesList.length - 1] !== false)
                {
                    if (positionDifference.x > 0)
                    {
                        if (positionDifference.y > 0)
                            cubesList.push(cubesList[cubesList.length - 1].CheckDirection("TR"));
                        else if (positionDifference.y === 0)
                            cubesList.push(cubesList[cubesList.length - 1].CheckDirection("MR"));
                        else if (positionDifference.y < 0)
                            cubesList.push(cubesList[cubesList.length - 1].CheckDirection("BR"));
                    }
                    else if (positionDifference.x === 0)
                    {
                        if (positionDifference.y > 0)
                            cubesList.push(cubesList[cubesList.length - 1].CheckDirection("TM"));
                        else if (positionDifference.y < 0)
                            cubesList.push(cubesList[cubesList.length - 1].CheckDirection("BM"));               
                    }
                    else if (positionDifference.x < 0)
                    {
                        if (positionDifference.y > 0)
                            cubesList.push(cubesList[cubesList.length - 1].CheckDirection("TL"));
                        else if (positionDifference.y === 0)
                            cubesList.push(cubesList[cubesList.length - 1].CheckDirection("ML"));
                        else if (positionDifference.y < 0)
                            cubesList.push(cubesList[cubesList.length - 1].CheckDirection("BL"));                
                    }
                }
                
                if (cubesList.length > 3)
                {
                    //Remove the false from the end of cubesList.
                    cubesList.pop();
                    //Then append cubesList to cubesToDelete.
                    cubesToDelete.push.apply(cubesToDelete, cubesList);
                }
            }
        }
    }
    
    //Removing duplicate entries from cubesToDelete and seeing how many cascade cubes there are.
    var uniqueCubesToDelete = [];
    var cascadeCubeCount = 0;
    for (var i = 0; i < cubesToDelete.length; ++i)
    {
        if (uniqueCubesToDelete.indexOf(cubesToDelete[i]) === -1)
        {
            uniqueCubesToDelete.push(cubesToDelete[i]);
            if (cubesToDelete[i].cascade === true)
                ++cascadeCubeCount;
        }
    }
    cubesToDelete = uniqueCubesToDelete;
    
    //Scoring the cubes.
    if (cubesToDelete.length > 0)
    {
        var scoreSave = score;
        score += Math.pow(5, cubesToDelete.length) * (cascadeCubeCount + 1);
        var scoreThreshold = 5000;
        while (scoreThreshold <= scoreSave)
        {
            scoreThreshold += 5000;
        }
        if (score > scoreThreshold && timeToResetTo !== 0.01)
        {
            timeToResetTo -= 0.01;
        }
        
        document.getElementById("scoreText").innerHTML = "Score: " + score;

        document.getElementById("scoreText").style.color =  "#" + cubesToDelete[0].material.color.getHexString();
        
    }
    
    for (var i = 0; i < cubesToDelete.length; ++i)
    {
        cubesToDelete[i].matchedTimer -= 0.01;
    }
};

var GameUpdate = function () {
    if (!gameInitialised)
    {
        gameInit();
        gameInitialised = true;
    }
    else
    {                                      
        CubeUpdate();
    
        //Would be more efficient to only call this when everything has just moved,
        //but this seems to cause the occasional issue where cubes get stuck inside each other.
        MakeMatches();
        
        
        MatchedCubesUpdate();
            
        if (camera.position.z > 5 && !(camera.position.z < 5.1))
            camera.position.z -= deltaTime * 50;
        if (camera.position.z < 5)
            camera.position.z += deltaTime;
        
        timeUntilCanPauseAgain -= deltaTime;
        
        if (InputManager.WasJustPressed(InputManager.ESCAPE) && state === "game" && timeUntilCanPauseAgain <= 0)
        {
            timeUntilCanPauseAgain = 1;
            state = "pause";
        }
    }
}

var SpawnTriple = function () {
    
  var cube1 = new PuzzleCube(new THREE.Vector3(0, 5, 0));
  cubes.push(cube1);
  var cube2 = new PuzzleCube(new THREE.Vector3(0, 4.5, 0));
  cubes.push(cube2);
  var cube3 = new PuzzleCube(new THREE.Vector3(0, 4, 0));
  cubes.push(cube3);
  
  cube1.triple = [cube1, cube2, cube3];
  cube2.triple = [cube1, cube2, cube3];
  cube3.triple = [cube1, cube2, cube3];
  
  selectedCubes = [cube1, cube2, cube3];
};

var ClearGame = function() {
    for (var i = 0; i < cubes.length; ++i)
    {
        //Removing it from triples.
        var tripleIndex = cubes[i].triple.indexOf(cubes[i]);
        for (var j = 0; j < cubes[i].triple.length; ++j)
        {
            if (j !== tripleIndex)
            {
                //triple[k] doesn't exist at some points.
                cubes[i].triple[j].triple.splice(tripleIndex, 1);
            }
        }
        cubes[i].triple.splice(tripleIndex, 1);
                
        scene.remove(cubes[i].mesh);
    }
    cubes = [];
    for (var i = 0; i < gameEndWall.length; ++i)
    {
        scene.remove(gameEndWall[i].mesh);        
    }
    gameEndWall = [];
    
};

var MatchedCubesUpdate = function() {
    
    //This is used to store the x-positions of each cube that is removed.
    //Any cubes with the same x-positions after matched cubes are deleted will be made unstable.
    var xPosArray = [];
    
    //Deleting the cubes.
    for (var i = 0; i < cubes.length; ++i)
    {
        if (cubes[i].matchedTimer <= 0)
        {
            if (xPosArray.indexOf(cubes[i].position.x) === -1)
                xPosArray.push(cubes[i].position.x);
            
            //Removing it from triples.
            var tripleIndex = cubes[i].triple.indexOf(cubes[i]);
            for (var j = 0; j < cubes[i].triple.length; ++j)
            {
                if (j !== tripleIndex)
                {
                    cubes[i].triple[j].triple.splice(tripleIndex, 1);
                }
            }
            cubes[i].triple.splice(tripleIndex, 1);

            scene.remove(cubes[i].mesh);

            //Removing it from cubes
            var cubesIndex = cubes.indexOf(cubes[i]);
            if (cubesIndex !== -1)
                cubes.splice(cubesIndex, 1);
        }
    }
            
    //De-stabilising cubes above the removed ones.
    for (var j = 0; j < cubes.length; ++j)
    {
        for (var k = 0; k < xPosArray.length; ++k)
        {
            if (cubes[j].position.x === xPosArray[k])
            {
                cubes[j].stable = false;
                cubes[j].cascade = true;
                break;
            }
        }
    }
    
    //Returning settled cubes 'cascade' variable to false.
    for (var i = 0; i < cubes.length; ++i)
    {
        if (cubes[i].stable === true && cubes[i].cascade === true)
            cubes[i].cascade = false;
    }
};
    
