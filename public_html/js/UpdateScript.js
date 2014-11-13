/*
 * UpdateScript script by Samuel Cole. Essentially used for changing states.
 */

var render = function () {
    
    requestAnimationFrame( render );
    
    var time = Date.now();
    deltaTime = time - lastTime;
    lastTime = time;
    deltaTime *= 0.001;
    
    switch (state)
    {
        case "splash":
            SplashUpdate();
            break;
        case "game":
            GameUpdate();
            break;
        case "gameover":
            GameOverUpdate();
            break;
        case "pause":
            PauseUpdate();
            break;
    }
    
    InputManager.Update();
    
    renderer.render(scene, camera);
};
render();

window.onresize = function () {
    renderer.setSize( window.innerWidth * 0.8, window.innerHeight);
};

window.onblur = function () {
    if (state === "game")
        state = "pause";
};

window.onfocus = function () {
    if (state === "pause")
        Unpause();
}