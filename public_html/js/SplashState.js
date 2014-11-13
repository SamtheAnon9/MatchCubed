/* 
 * SplashState script by Samuel Cole.
 */

//Time until the splash screen ends.
var splashTimer = 5;

//Time until the splash screen starts to zoom.
var splashZoomTimer = 2;

//Array that stores each cube that makes up the splash screen text.
var splashText = [];

//Time until the colours of the text cubes switch.
var textScrollTimer = 0.1;

var SplashUpdate = function () {

    if(splashTimer === 5)
    {
       SplashInit();
    }

    if (textScrollTimer < 0)
    {
        for (var i = splashText.length - 1; i > 0; --i)
        {
            splashText[i].material.color = splashText[i - 1].material.color;
        }
        splashText[0].material.color = splashText[splashText.length - 1].material.color;
        textScrollTimer = 0.1;
    }
    
    splashTimer -= deltaTime;
    textScrollTimer -= deltaTime;
    splashZoomTimer -= deltaTime;
    
    if (splashZoomTimer <= 0)
        camera.position.z -= deltaTime * (5/3);
    
    if (document.getElementById("scoreText") !== null)
        document.getElementById("scoreText").innerHTML = "Loading...";
    
    if (splashTimer <= 0)
    {
        for (var i = 0; i < splashText.length; ++i)
        {
            scene.remove(splashText[i].mesh)
        }
        splashText = [];
        state = "game";
    }
}

var SplashInit = function () {
    
    camera.position.z = 5;
    
    //'M'
    for (var i = 0; i < 5; ++i)         //Left branch of 'M'
    {
            var m1 = new Wall(new THREE.Vector3(-5, -1 + i * 0.5, 0));
            splashText.push(m1);    
    }
    
    //Middle of 'M'
    var m2 = new Wall(new THREE.Vector3(-4.5, 0.5, 0));
    splashText.push(m2);
    
    for (var i = 4; i >= 0; --i)         //Right branch of 'M'
    {
        var m3 = new Wall(new THREE.Vector3(-4, -1 + i * 0.5, 0));
        splashText.push(m3);
    }
    
    
    //'A'
    for (var i = 0; i < 5; ++i)        //Left branch of 'A'
    {
            var a1 = new Wall(new THREE.Vector3(-3, -1 + i * 0.5, 0));
            splashText.push(a1);
    }
    
    //Middle top bit of 'A'
    var a2 = new Wall(new THREE.Vector3(-2.5, 1, 0));
    splashText.push(a2);
    
    for (var i = 4; i >= 0; --i)            //Right branch of 'A'
    {
        var a3 = new Wall(new THREE.Vector3(-2, -1 + i * 0.5, 0));
        splashText.push(a3);
    }
    
    //Middle lower bit of 'A'
    var a4 = new Wall(new THREE.Vector3(-2.5, 0, 0));
    splashText.push(a4);
    
    
    //'T'
    for (var i = 0; i < 5; ++i)         //Vertical line of 'T'
    {
        var t1 = new Wall(new THREE.Vector3(-0.5, -1 + i * 0.5, 0));
        splashText.push(t1);
    }
    //Side bits of T.
    var t2 = new Wall(new THREE.Vector3(-1, 1, 0));
    splashText.push(t2);
    var t3 = new Wall(new THREE.Vector3(0, 1, 0));
    splashText.push(t3);
    
    
    //'C'
    
    //Top curve of 'C'
    var c1 = new Wall(new THREE.Vector3(2, 1, 0));
    splashText.push(c1);
    var c2 = new Wall(new THREE.Vector3(1.5, 1, 0));
    splashText.push(c2);
    
    for (var i = 4; i >= 0; --i)        //Vertical line of 'C'
    {
        var c3 = new Wall(new THREE.Vector3(1, -1 + i * 0.5, 0));    
        splashText.push(c3);
    }

    //Bottom curve of 'C'
    var c4 = new Wall(new THREE.Vector3(1.5, -1, 0));
    splashText.push(c4);
    var c5 = new Wall(new THREE.Vector3(2, -1, 0));
    splashText.push(c5);
    
    //'H'
    for (var i = 0; i < 5; ++i)        //Left branch of 'H'
    {
        var h1 = new Wall(new THREE.Vector3(3, -1 + i * 0.5, 0));
        splashText.push(h1);
    }
    
    for (var i = 4; i >= 0; --i)        //Right branch of 'H'
    {
        var h2 = new Wall(new THREE.Vector3(4, -1 + i * 0.5, 0));
        splashText.push(h2);
    }
    //Middle bit of 'H'
    var h3 = new Wall(new THREE.Vector3(3.5, 0, 0));
    splashText.push(h3);
    
    for (var i = 0; i < 5; ++i)
    {
        //Verticle line of '3'
        var three1 = new Wall(new THREE.Vector3(8.5, 1 + i * 0.5, -3));  
        splashText.push(three1);
    }
    //Arms of the three.
    for (var i = 0; i < 3; ++i)
    {
        var three2 = new Wall(new THREE.Vector3(8, 1 + i, -3))
        splashText.push(three2);
    }
    
    //Setting the colours of the text
    for (var i = 0; i < splashText.length; ++i)
    {
        switch (i % 5)
        {
            case 0:   
                splashText[i].material.color = new THREE.Color(1, 0, 0);
                break;
            case 1:
                splashText[i].material.color = new THREE.Color(0, 1, 0);
                break;
            case 2:
                splashText[i].material.color = new THREE.Color(0, 0, 1);
                break;
            case 3:
                splashText[i].material.color = new THREE.Color(1, 1, 0);
                break;
            case 4:
                splashText[i].material.color = new THREE.Color(0, 1, 1);
                break;
        }
    }
}

