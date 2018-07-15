//Create questions in array
var triviaQuestions = [
    {
        question: "Americas Strategic Defense System during the Cold War was nicknamed after this famous movie.",
        answers: ["Space Balls", "Alien", "Star Wars", "Hal"], 
        answer: 2
    },
    {
        question: "A flock of crows is also known as a what?",
        answers: ["Murder", "Crew", "Slaughter", "Bunch"],
        answer: 1
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

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7'];
//create messages for when user inputs an answer/time is up and when they answer all of the questions
var messages = {
	correct: "Yes!",
	incorrect: "Not even close! Cue the snarky Alex Trebek quip.",
	endTime: "You're outta time!",
	finished: "Alright! Let's add them up and see how you did."
}