/* 
 * PauseState script by Samuel Cole.
 */

//Array that stores each cube that makes up the splash screen text.
var pauseText = [];

//Time until the colours of the text cubes switch.
var textScrollTimer = 0.1;

var pauseInitialised = false;

var PauseUpdate = function () {

    if(!pauseInitialised)
    {
       pauseInitialised = true;
       PauseInit();
    }

    if (textScrollTimer < 0)
    {
        for (var i = pauseText.length - 1; i > 0; --i)
        {
            pauseText[i].material.color = pauseText[i - 1].material.color;
        }
        pauseText[0].material.color = pauseText[pauseText.length - 1].material.color;
        textScrollTimer = 0.1;
    }
    
    textScrollTimer -= deltaTime;
 
    
    if (InputManager.WasJustPressed(InputManager.ESCAPE))
    {
        Unpause();
    }
}

//Make unpause functionality into a function so that I can call it on window select.
var Unpause = function () {
    for (var i = 0; i < pauseText.length; ++i)
    {
        scene.remove(pauseText[i].mesh)
    }
    pauseText = [];
    pauseInitialised = false;
    camera.position.z = 5;
    state = "game";    
};

var PauseInit = function () {
    
    camera.position.z = -5;
    
    //'P'
    for (var i = 0; i < 5; ++i)         //Left side of 'P'
    {
            var p1 = new Wall(new THREE.Vector3(-5, -1 + i * 0.5, -10));
            pauseText.push(p1);    
    }
    
    //Middle top of 'P'
    var p2 = new Wall(new THREE.Vector3(-4.5, 1, -10));
    pauseText.push(p2);
    
    for (var i = 4; i > 1; --i)         //Right side of 'P'
    {
        var p3 = new Wall(new THREE.Vector3(-4, -1 + i * 0.5, -10));
        pauseText.push(p3);
    }
    
    var p4 = new Wall(new THREE.Vector3(-4.5, 0, -10));
    pauseText.push(p4);
    
    
    //'A'
    for (var i = 0; i < 5; ++i)        //Left branch of 'A'
    {
            var a1 = new Wall(new THREE.Vector3(-3, -1 + i * 0.5, -10));
            pauseText.push(a1);
    }
    
    //Middle top bit of 'A'
    var a2 = new Wall(new THREE.Vector3(-2.5, 1, -10));
    pauseText.push(a2);
    
    for (var i = 4; i >= 0; --i)            //Right branch of 'A'
    {
        var a3 = new Wall(new THREE.Vector3(-2, -1 + i * 0.5, -10));
        pauseText.push(a3);
    }
    
    //Middle lower bit of 'A'
    var a4 = new Wall(new THREE.Vector3(-2.5, 0, -10));
    pauseText.push(a4);
    
    
    //'U'
    for (var i = 4; i >= 0; --i)         //Left vertical line of 'U'
    {
        var u1 = new Wall(new THREE.Vector3(-1, -1 + i * 0.5, -10));
        pauseText.push(u1);
    }
    
    //Middle bit of 'U'
    var u2 = new Wall(new THREE.Vector3(-0.5, -1, -10));
    pauseText.push(u2);

    for (var i = 0; i < 5; ++i)         //Right vertical line of 'U'
    {
        var u3 = new Wall(new THREE.Vector3(0, -1 + i * 0.5, -10));
        pauseText.push(u3);
    }
    
    
    //'S'
    
    //Top line of 'S'
    var s1 = new Wall(new THREE.Vector3(2, 1, -10));
    pauseText.push(s1);
    var s2 = new Wall(new THREE.Vector3(1.5, 1, -10));
    pauseText.push(s2);
    
    for (var i = 4; i >= 2; --i)        //Left vertical line of 'S'
    {
        var s3 = new Wall(new THREE.Vector3(1, -1 + i * 0.5, -10));    
        pauseText.push(s3);
    }
    
    //Middle bit of 'S'
    var s4 = new Wall(new THREE.Vector3(1.5, 0, -10));
    pauseText.push(s4);
    
    for (var i = 2; i >= 0; --i)        //Right vertical line of 'S'
    {
        var s5 = new Wall(new THREE.Vector3(2, -1 + i * 0.5, -10));
        pauseText.push(s5);
    }

    //Bottom line of 'S'
    var s6 = new Wall(new THREE.Vector3(1.5, -1, -10));
    pauseText.push(s6);
    var s7 = new Wall(new THREE.Vector3(1, -1, -10));
    pauseText.push(s7);
    
    //'E'
    //Top of 'E'
    var e1 = new Wall(new THREE.Vector3(4, 1, -10));
    pauseText.push(e1);
    var e2 = new Wall(new THREE.Vector3(3.5, 1, -10));
    pauseText.push(e2);
    
    for (var i = 4; i >= 0; --i)        //Vertical line of 'E'
    {
        var e3 = new Wall(new THREE.Vector3(3, -1 + i * 0.5, -10));
        pauseText.push(e3);
    }
    
    //Bottom of 'E'
    var e4 = new Wall(new THREE.Vector3(3.5, -1, -10));
    pauseText.push(e4);
    var e5 = new Wall(new THREE.Vector3(4, -1, -10));
    pauseText.push(e5);
    
    //Middle of 'E'
    var e6 = new Wall(new THREE.Vector3(3.5, 0, -10));
    pauseText.push(e6);
    
    //Setting the colours of the text
    for (var i = 0; i < pauseText.length; ++i)
    {
        switch (i % 5)
        {
            case 0:   
                pauseText[i].material.color = new THREE.Color(1, 0, 0);
                break;
            case 1:
                pauseText[i].material.color = new THREE.Color(0, 1, 0);
                break;
            case 2:
                pauseText[i].material.color = new THREE.Color(0, 0, 1);
                break;
            case 3:
                pauseText[i].material.color = new THREE.Color(1, 1, 0);
                break;
            case 4:
                pauseText[i].material.color = new THREE.Color(0, 1, 1);
                break;
        }
    }
}

