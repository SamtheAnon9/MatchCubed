/* 
 * HighScores script by Samuel Cole. Used for getting/setting highscores from/to local storage.
 */

var highScores = [];

//Should be called when the game starts. Used to set up some high scores stuff.
window.onload = function() {
        
        highScoresInitCalled = true;

        if (typeof(Storage !== "undefined"))
        {
            //Load in high scores.
            if (window.localStorage.highScore1 !== undefined)    
            {
                highScores.push(window.localStorage.highScore1);
                if (window.localStorage.highScore2 !== undefined)
                {
                    highScores.push(window.localStorage.highScore2);
                    if (window.localStorage.highScore3 !== undefined)
                    {
                        highScores.push(window.localStorage.highScore3);
                        if (window.localStorage.highScore4 !== undefined)
                        {
                            highScores.push(window.localStorage.highScore4);
                            if (window.localStorage.highScore5 !== undefined)
                            {
                                highScores.push(window.localStorage.highScore5);
                            }
                        }
                    }
                }
            }
        }
        else
            highScores.push("Your browser does not support local storage.");
        
        if (highScores.length === 0)
        {
            document.getElementById("highScore1").innerHTML = "No Local High Scores Found!";
        }
        else
        {
            while (highScores.length < 5)
            {
                highScores.push(0);
            }
            for (var i = 0; i < 5; ++i)
            {
                document.getElementById("highScore" + (i + 1)).innerHTML = String(highScores[i]);
            }
        }
};

//Should be called when the game is finished to update the high score table.
var HighScoresUpdate = function() {
    //Determining where to add the current score.
    
    if (highScores.length === 0)
    {
        highScores.push(0, 0, 0, 0, 0);
    }
 
    var scoreIndex = 4;
    for (;score > highScores[scoreIndex]; --scoreIndex)
    {
        if (scoreIndex < 0)
            break;
    }
    //Adding the score to the highscores.
    highScores.splice(scoreIndex + 1, 0, score);
    
    while (highScores.length > 5)
    {
        highScores.pop();
    }
    
    window.localStorage.highScore1 = highScores[0];
    window.localStorage.highScore2 = highScores[1];
    window.localStorage.highScore3 = highScores[2];
    window.localStorage.highScore4 = highScores[3];
    window.localStorage.highScore5 = highScores[4];
    
    for (var i = 0; i < 5; ++i)
    {
        document.getElementById("highScore" + (i + 1)).innerHTML = String(highScores[i]);
    }
    if (scoreIndex < 3)
        document.getElementById("highScore" + (scoreIndex + 2)).style.color = document.getElementById("scoreText").style.color;
};
