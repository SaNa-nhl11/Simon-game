var gamepattern = [];

var userClickedPattern = [];

var buttonColours = [ "red", "blue", "green", "yellow" ];

var started = false;

var level = 0;

//function that generate a new random number between 0 and 3//
function nextSequence(){

    //reseting the player chosen colors every turn//
    userClickedPattern = [];

    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber = Math.floor(randomNumber);

    //selecting a random color from buttonColours using the random number and pushing it to the empty array//
     var randomChosenColor = buttonColours[randomNumber];
     gamepattern.push(randomChosenColor);
 
   //animation + sound//
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio0 = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio0.play();

    level++;
    $("#level-title").text("Level " + level);
    
    //cheating//
    console.log("gamepattern is"+ " " + gamepattern);
   
}

//what happens when click detected, eventlistener use a type of event and a function as parameter//
 for(i=0;i<document.querySelectorAll(".btn").length;i++){ 
    document.querySelectorAll(".btn")[i].addEventListener("click",MouseClick);  
}

function MouseClick() {
    var ButtonClicked = $(this).attr("id");  //to get the correspond id of the button clicked//
    MakeSound(ButtonClicked);
    animatepress(ButtonClicked);
}

//click sound//
function MakeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");  
    audio.play();
}

//click animation//
function animatepress(currentcolor){
    var click = $("." + currentcolor);
    click.addClass("pressed");

    setTimeout(function(){
        click.removeClass("pressed");} , 50)
}

//saving all that was clicked in a new array//
$(".btn").click(clicking);  

function clicking() {
    var userChosenColour= $(this).attr("id");  
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
}


//Game Start with a key press//
document.addEventListener("keypress",pressing)  
       

function pressing(){ 
   if(started==false) {
    //The h1 title starts out saying "Press Any Key to Start", when the game has started, change this to say "Level 0".//
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
   } 

}


//chechikng answers: whenever a player click a button it will be compared with that of the same index as it in the gamepattern till we reavh the last index//
function checkAnswer(currentLevel) {
    

 if(gamepattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");

    //reaching the last index//
 if(userClickedPattern.length === gamepattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
     }
 } // a wrong answer//
 else {
    console.log("wrong");
    var audioW = new Audio("sounds/wrong.mp3");  
    audioW.play();

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over"); } , 100
   )
   $("#level-title").text("Game Over");

   setTimeout(function(){
    gamepattern = [];
    level = 0;
    started = false;
    $("#level-title").text("Press Any Key to Start");} , 1200
   )

 
}

}

