//Create variable for the questions in an array
var triviaQuestions = [
    {
        question: "Americas Strategic Defense System during the Cold War was nicknamed after this famous movie / movie character.",
        answers: ["Skynet", "Alien", "Star Wars", "Hal"], 
        answer: 2
    },
    {
        question: "A flock of crows is also known as a what?",
        answers: ["Murder", "Crew", "Slaughter", "Bunch"],
        answer: 0
    },
    {
        question: "Which Apollo mission was the last one in NASA's Apollo program?",
        answers: ["14", "15", "16", "17"],
        answer: 3
    },
    {
        question: "In what year was the United States National Security Agency established?",
        answers: [1952, 1955, 1949, 1960], 
        answer: 0
    },
    {
        question: "True or false - more people were killed by taking selfies than by shark attacks in 2015.",
        answers: ["True", "False"],
        answer: 0
    },
    {
        question: "What is Bob Dylans real last name?",
        answers: ["Abrahamson", "Freyman", "Zimmerman", "Gaer"],
        answer: 2
    },
    {
        question: "In a standard set of playing cards, which is the only king without a moustache?",
        answers: ["Spades", "Diamonds", "Hearts", "Clubs"],
        answer: 2
    }
];

//var to hold the gif's after the question has been answered/time ran out
var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7'];
var gifEnd = ['answerEnd1', 'answerEnd2', 'answerEnd3', 'answerEnd4'];
var gifWrong = gifEnd[0];
var gifNoanswer = gifEnd[1];
var gifOver = gifEnd[2];
var gifUnder = gifEnd[3];

//global variables
var currentQuestion; var correctAnswer; var wrongAnswer; var noAnswer; var seconds; var time; var answered; var userSelect;

//create messages for when user inputs an answer/time is up and when they answer all of the questions
var messages = {
	correct: "Yes!",
	incorrect: "Not even close! Cue the snarky Alex Trebek quip.",
	endTime: "You're outta time!",
	finished: "Alright! Let's add them up and see how you did."
}

//onclick for the startbutton to begin game
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

//onclick for when game is over for the user to start the gm again
$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

//empty and reset the game variables and DOM
function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#wrongAnswers').empty();
	$('#noAnswer').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	wrongAnswer = 0;
	noAnswer = 0;
	newQuestion();
}

//for use after the user has answered a question...DOM removal
function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question ' + (currentQuestion+1) + ' of '+ triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answers[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answers').append(choices);
	}
	countdown();
    
    //clicking an answer will pause the time and will run answerPage function
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
        answerPage();
        $("#timeLeft").empty();
	});
}

//clock for countdown - 15 seconds
function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down by a second at a time
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

//Emptys the question and choices so display can show gif and messages
function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();
    
    var rightAnswerText = triviaQuestions[currentQuestion].answers[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
    
    
    //Checks to see if user choice is correct, incorrect, or not answered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
        $('#message').html(messages.correct);
        $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		wrongAnswer++;
		$('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        $('#gif').html('<img src = "assets/images/'+ gifWrong +'.gif" width = "400px">');
	} else{
		noAnswer++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
        $('#gif').html('<img src = "assets/images/'+ gifNoanswer +'.gif" width = "400px">');
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 7000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 7000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#wrongAnswers').html("Incorrect Answers: " + wrongAnswer);
    $('#noAnswer').html("Did not answer: " + noAnswer);
        if(correctAnswer > 4){
            $('#gif').html('<img src = "assets/images/'+ gifOver +'.gif" width = "400px">')
        }
        else{
            $('#gif').html('<img src = "assets/images/'+ gifUnder +'.gif" width = "400px">')
        };
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}