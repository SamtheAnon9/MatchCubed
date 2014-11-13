//ConstructScript by Samuel Cole. Used to set up some initial global things to get things rendering.

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, (window.innerWidth*0.8)/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("gameCanvas")});
renderer.setSize( window.innerWidth * 0.8, window.innerHeight);

window.addEventListener('keyup', function(event) { InputManager.OnKeyup(event); }, false);
window.addEventListener('keydown', function(event) { InputManager.OnKeydown(event); }, false);
window.addEventListener('touchstart', function(event) { InputManager.TouchPosition(event); }, false);

//State is used to determine which state the game should be in.
var state = "splash";

//The time as of last frame.
var lastTime = Date.now();

