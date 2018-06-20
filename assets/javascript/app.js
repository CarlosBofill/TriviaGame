$(document).ready(function () {
    var options = [
        {
            question: "Who gave Ash his Pikachu", 
            choice: ["Brock", "Professor Oak", "Gary", "Bill the Pokemon Researcher"],
            answer: 1,
            photo: "assets/images/professoroak.jpg"
         },
         {
             question: "What are the names of the two villains who try to steal Pokemon?", 
            choice: ["Jesse and James", "Jenny and Joy", "Jerry and James", "james and Cassidy"],
            answer: 0,
            photo: "assets/images/jesseandjames.jpg"
         }, 
         {
             question: "What is the name of all the nurses on Pokemon?", 
            choice: ["Nurse Jenny", "Nurse Jane", "Nurse Joy", "Nurse June" ],
            answer: 2,
            photo: "assets/images/nursejoy.jpg"
        }, 
        {
            question: "Which Pokemon's ability is singing? What does it do when people fall asleep?", 
            choice: ["Psyduck, it uses psychic abilities to make them wakeup", "Wabbuffet, it salutes them and then flys away in Team Rocket's balloon.", "Jigglypuff, it scribbles on their faces", "Pikachu, it shocks people with electricity" ],
            answer: 2,
            photo: "assets/images/jigglypuff.jpg"
        }, 
        {
            question: "What does Ash want to become?", 
            choice: ["Pikachu's master", "The Mayor of Veridian City", "Master of the Universe", "A Pokemon Master" ],
            answer: 3,
            photo: "assets/images/pokemonmaster.jpg"
        }, 
        {
            question: "What character always looks like their eyes are shut?", 
            choice: ["Brak", "Brock", "James", "Xellos" ],
            answer: 1,
            photo: "assets/images/brock.jpg"
        }, 
        {
            question: "What is the Pokemon James owns that has smoke attacks?", 
            choice: ["Ol' Smoky", "Koffing", "Sputtering", "Hacking" ],
            answer: 1,
            photo: "assets/images/koffing.jpg"
        }, 
        {
            question: "What is the first legendary bird Pokemon Ash sees?", 
            choice: ["Ho-Oh", "Zapdos", "Articuno", "Lugia" ],
            answer: 0,
            photo: "assets/images/ho-oh.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
  
    function displayQuestion() {
        
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    
    }
    
    
    
    $(".answerchoice").on("click", function () {
        
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })