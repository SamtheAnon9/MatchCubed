/* 
 * GameOverState script by Samuel Cole. Used to show players that they have lost.
 */

//Time until the screen starts to zoom.
var gameOverZoomTimer = 2;

//Time until the game restarts.
var gameOverTimer = 5;

//Array that stores each cube that makes up the splash screen text.
var gameOverText = [];

//Time until the colours of the text cubes switch.
var textScrollTimer = 0.1;

var GameOverUpdate = function () {

    if(gameOverTimer === 5)
    {
       GameOverInit();
    }
    
    gameOverTimer -= deltaTime;
    gameOverZoomTimer -= deltaTime;
    
    if (gameOverZoomTimer <= 0)
    {
        camera.position.z -= deltaTime * (5/3);
    }
        
    if (gameOverTimer <= 0)
    {
        location.reload(true);
    }
}

var GameOverInit = function () {
    
    document.getElementById("scoreText").innerHTML = "Final Score:\n" + document.getElementById("scoreText").innerHTML;
    
    HighScoresUpdate();
    
    //'G'
    //Top of 'G'
    var g1 = new Wall(new THREE.Vector3(-2, 3, 0));
    gameOverText.push(g1);
    var g2 = new Wall(new THREE.Vector3(-2.5, 3, 0));
    gameOverText.push(g2);
    
    for (var i = 0; i < 5; ++i)         //Vertical line of 'G'
    {
            var g3 = new Wall(new THREE.Vector3(-3, 1 + i * 0.5, 0));
            gameOverText.push(g3);    
    }
        
    //Bottom of 'G'
    var g4 = new Wall(new THREE.Vector3(-2.5, 1, 0));
    gameOverText.push(g4);
    var g5 = new Wall(new THREE.Vector3(-2, 1, 0));
    gameOverText.push(g5);   
    var g6 = new Wall(new THREE.Vector3(-2, 1.5, 0));
    gameOverText.push(g6);
    
    //'A'
    for (var i = 0; i < 5; ++i)        //Left branch of 'A'
    {
        var a1 = new Wall(new THREE.Vector3(-1, 1 + i * 0.5, 0));
        gameOverText.push(a1);
    }
    
    //Middle top bit of 'A'
    var a2 = new Wall(new THREE.Vector3(-0.5, 3, 0));
    gameOverText.push(a2);
    
    for (var i = 4; i >= 0; --i)            //Right branch of 'A'
    {
        var a3 = new Wall(new THREE.Vector3(0, 1 + i * 0.5, 0));
        gameOverText.push(a3);
    }
    
    //Middle lower bit of 'A'
    var a4 = new Wall(new THREE.Vector3(-0.5, 2, 0));
    gameOverText.push(a4);
    
    
    //'M'
    for (var i = 0; i < 5; ++i)         //Left branch of 'M'
    {
            var m1 = new Wall(new THREE.Vector3(1, 1 + i * 0.5, 0));
            gameOverText.push(m1);    
    }
    
    //Middle of 'M'
    var m2 = new Wall(new THREE.Vector3(1.5, 2.5, 0));
    gameOverText.push(m2);
    
    for (var i = 4; i >= 0; --i)         //Right branch of 'M'
    {
        var m3 = new Wall(new THREE.Vector3(2, 1 + i * 0.5, 0));
        gameOverText.push(m3);
    }
    
    
    //'E'
    //Top arm of 'E'
    var e11 = new Wall(new THREE.Vector3(4, 3, 0));
    gameOverText.push(e11);
    var e12 = new Wall(new THREE.Vector3(3.5, 3, 0));
    gameOverText.push(e12);
    
    for (var i = 4; i >= 0; --i)        //Vertical line of 'E'
    {
        var e13 = new Wall(new THREE.Vector3(3, 1 + i * 0.5, 0));    
        gameOverText.push(e13);
    }

    //Bottom arm of 'E'
    var e14 = new Wall(new THREE.Vector3(3.5, 1, 0));
    gameOverText.push(e14);
    var e15 = new Wall(new THREE.Vector3(4, 1, 0));
    gameOverText.push(e15);
    
    //Middle bar of 'E'
    var e16 = new Wall(new THREE.Vector3(3.5, 2, 0));
    gameOverText.push(e16);
    var e17 = new Wall(new THREE.Vector3(4, 2, 0));
    gameOverText.push(e17);
    
    //'GAME' now complete, time for 'OVER'
    //'O'
    for (var i = 0; i < 5; ++i)        //Left branch of 'O'
    {
        var o1 = new Wall(new THREE.Vector3(-3, -3 + i * 0.5, 0));
        gameOverText.push(o1);
    }
    
    //Middle top bit of 'O'
    var o2 = new Wall(new THREE.Vector3(-2.5, -1, 0));
    gameOverText.push(o2);
    
    for (var i = 4; i >= 0; --i)            //Right branch of 'O'
    {
        var o3 = new Wall(new THREE.Vector3(-2, -3 + i * 0.5, 0));
        gameOverText.push(o3);
    }
    
    //Middle lower bit of 'O'
    var o4 = new Wall(new THREE.Vector3(-2.5, -3, 0));
    gameOverText.push(o4);
    
    
    //'V'
    for (var i = 1; i < 5; ++i)        //Left branch of 'V'
    {
        var v1 = new Wall(new THREE.Vector3(-1, -3 + i * 0.5, 0));
        gameOverText.push(v1);
    }
    
    //Middle top bit of 'V'
    var v2 = new Wall(new THREE.Vector3(-0.5, -3, 0));
    gameOverText.push(v2);
    
    for (var i = 4; i > 0; --i)            //Right branch of 'V'
    {
        var v3 = new Wall(new THREE.Vector3(0, -3 + i * 0.5, 0));
        gameOverText.push(v3);
    }
    
    //'E'
    //Top arm of 'E'
    var e21 = new Wall(new THREE.Vector3(2, -1, 0));
    gameOverText.push(e21);
    var e22 = new Wall(new THREE.Vector3(1.5, -1, 0));
    gameOverText.push(e22);
    
    for (var i = 4; i >= 0; --i)        //Vertical line of 'E'
    {
        var e23 = new Wall(new THREE.Vector3(1, -3 + i * 0.5, 0));    
        gameOverText.push(e23);
    }

    //Bottom arm of 'E'
    var e24 = new Wall(new THREE.Vector3(1.5, -3, 0));
    gameOverText.push(e24);
    var e25 = new Wall(new THREE.Vector3(2, -3, 0));
    gameOverText.push(e25);
    
    //Middle bar of 'E'
    var e26 = new Wall(new THREE.Vector3(1.5, -2, 0));
    gameOverText.push(e26);
    var e27 = new Wall(new THREE.Vector3(2, -2, 0));
    gameOverText.push(e27);
    
    //'R'
    for (var i = 0; i < 5; ++i)        //Vertical line of 'R'
    {
        var r1 = new Wall(new THREE.Vector3(3, -3 + i * 0.5, 0));
        gameOverText.push(r1);
    }
    
    //Top bit of 'R' loop
    var r2 = new Wall(new THREE.Vector3(3.5, -1, 0));
    gameOverText.push(r2);
    
    for (var i = 4; i >= 2; --i)            //Right part of 'R' loop
    {
        var r3 = new Wall(new THREE.Vector3(4, -3 + i * 0.5, 0));
        gameOverText.push(r3);
    }
    
    //Lower bit of 'R' loop
    var r4 = new Wall(new THREE.Vector3(3.5, -2, 0));
    gameOverText.push(r4);
    
    //Top of 'R' tail
    var r6 = new Wall(new THREE.Vector3(3.5, -2.5));
    gameOverText.push(r6);
    
    //Bottom of 'R' tail
    var r7 = new Wall(new THREE.Vector3(4, -3));
    gameOverText.push(r7);
}

