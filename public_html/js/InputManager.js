/* 
 * Input manager script by Samuel Cole, uses some code I found at http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/
 * More key information at http://www.javascripter.net/faq/keycodes.htm
 */

var InputManager = {
  pressed: [],
  justPressed: [],
  touchPos: {},

  ESCAPE: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  A: 65,
  S: 83,
  D: 68,
    
  GetTouchPos: function () {
      return this.touchPos;
  },  
    
  IsDown: function(keyCode) {
    return this.pressed[keyCode];
  },
  
  WasJustPressed: function (keyCode) {
      return this.justPressed[keyCode];
  },
  
  OnKeydown: function(event) {
    this.pressed[event.keyCode] = (new Date()).getTime();
    this.justPressed[event.keyCode] = (new Date()).getTime();
  },
  
  OnKeyup: function(event) {
    delete this.pressed[event.keyCode];
  },
  
  TouchPosition: function(event) {
    event.preventDefault();
    this.touchPos.x = event.changedTouches[0].clientX;
    this.touchPos.y = event.changedTouches[0].clientY;
  },
    
  //Update should be called at the end of every update loop.
  Update: function() {
      this.justPressed = [];
      this.touchPos = {};
    }
};
