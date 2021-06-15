 var buttonColours=["red","blue","green","yellow"];
 var gamePatterns=[];
 var userClickedPattern=[];
 var started=false;
 var level=0;

 $(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        level++;
        started=true;
    }
});

$(".btn").click(function (){
        var userChoosenColour=$(this).attr("id");
        userClickedPattern.push(userChoosenColour);
        playSound(userChoosenColour);
        animatePress(userChoosenColour);

        checkAnswer(userClickedPattern.length-1);
    
    });

    function checkAnswer(currentlevel){
        if (gamePatterns[currentlevel] === userClickedPattern[currentlevel]){
            console.log("success");
        
        if (gamePatterns.length===userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
                
            },1000);
        }
    }else{
            console.log("wrong");
            playSound("wrong");

      
             $("body").addClass("game-over");
             setTimeout(function () {
             $("body").removeClass("game-over");
             }, 200);
             $("#level-title").text("Game Over, Press Any Key to Restart");

            startOver();
        }

    }    

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level"+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColours =buttonColours[randomNumber];
    gamePatterns.push(randomChoosenColours);
    $("#"+randomChoosenColours).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColours);

    
    }
    
    function playSound(name){
        var audio=new Audio("sounds/"+name+".mp3");
        audio.play();
    }
    function animatePress(currentColour){
        $("#" +currentColour).addClass("pressed");

        setTimeout(() => {
            $("#"+currentColour).removeClass("pressed");
            
        }, 100 );

    }
   
    
   
     function startOver(){
         level=0;
         gamePatterns=[];
         started=false;
     }
