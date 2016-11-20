var counter;
var game = {
	correct: 0,
	incorrect: 0,
	currentQuestion: 0,
	timeRemaining: 0,
	optionsEliminated: [],

	questions: [
		one = {
			question: "A ring constructed from 50% gold and 50% other metals is rated at how many karats?",
			answerIndex: 0,
			options: [
				"12",
				"14",
				"18",
				"24"
			],
			src: "assets/images/GoldRing.gif"
		},
		two = {
			question: "The world's first flags appeared in China around 3000 B.C. made out of what material?",
			answerIndex: 2,
			options: [
				"Cotton",
				"Nylon",
				"Silk",
				"Wool"
			]
		},
		three = {
			question: "What planet in the solar system has the longest day, equivalent to about 244 Earth days?",
			answerIndex: 1,
			options: [
				"Mercury",
				"Venus",
				"Jupiter",
				"Neptune"
			]
		},
		four = {
			question: "Which of these is NOT the name of a bone located in the human inner ear?",
			answerIndex: 1,
			options: [
				"Anvil",
				"Cochlea",
				"Hammer",
				"Stirrup"
			]
		},
		five = {
			question: "Which state has the only U.S. state flag which features different pictures on each side?",
			answerIndex: 3,
			options: [
				"Alaska",
				"Hawaii",
				"New York",
				"Oregon",
			]
		},
		six = {
			question: "What is the only month used in the NATO Phonetic Alphabet?",
			answerIndex: 3,
			options: [
				"February",
				"July",
				"October",
				"November"
			]
		},
		seven = {
			question: "The term 'sesquicentennial' represents how many years?",
			answerIndex: 2,
			options: [
				"50",
				"75",
				"150",
				"500"
			]
		},
		eight = {
			question: "Which of these words is NOT part of the three-word motto of the Olympics Games?",
			answerIndex: 1,
			options: [
				"Faster",
				"Harder",
				"Higher",
				"Stronger"
			]
		},
		nine = {
			question: "The state of Michigan touches all of the Great Lakes except which one?",
			answerIndex: 2,
			options: [
				"Erie",
				"Huron",
				"Ontario",
				"Superior"
			]
		},
		ten = {
			question: "Which of these is NOT a Nobel Prize category?",
			answerIndex: 1,
			options: [
				"Chemistry",
				"Mathematics",
				"Literature",
				"Physiology",
			]
		}
	],

	addTime: function() {
		$("#addTimeButton").prop("disabled", true);
		game.timeRemaining = game.timeRemaining + 5;
	},

	askQuestions: function() {
		timer = setInterval(game.decrementTimer, 1000);
		game.timeRemaining = 10;
		$("#timeArea").html("Time Remaining: " + game.timeRemaining);
		$("#questionArea").html(game.questions[game.currentQuestion].question);
		$("#lifelineArea").show();

		for (var j = 0; j < game.questions[game.currentQuestion].options.length; j++) {
			var optionButton = $("<br><button class='optionButton'>" + game.questions[game.currentQuestion].options[j] + "</button>");
			optionButton.attr("data-index", j);
			$("#questionArea").append(optionButton);
		};

		$(".optionButton").on("click", function() {
			game.stopCounter();
			$("#lifelineArea").hide();
			if ($(this).data("index") == game.questions[game.currentQuestion].answerIndex) {
				game.correct++;
				$("#questionArea").html("<p class='result'>Correct!!!</p>");
			} else {
				game.incorrect++;
				$("#questionArea").html("<p class='result'>Wrong!!!</p>");
			}
			game.displayCorrect();
		});
	},

	checkStatus: function() {
		game.currentQuestion++;
		if (game.currentQuestion == game.questions.length) {
			$("#timeArea").html("");
			$("#questionArea").html("Number of Questions Answered Correctly: " + game.correct + "<br><br>Number of Questions Answered Incorrectly: " + game.incorrect + "<br><button id='restartButton'>Restart Game</button>");

			$("#restartButton").on("click", function() {
				game.newGame();
			});
		}	else {
			game.askQuestions();
		}
	},

	decrementTimer: function() {
		game.timeRemaining--;
		$("#timeArea").html("Time Remaining: " + game.timeRemaining);
		if (game.timeRemaining == 0) {
			game.stopCounter();
			game.timeExpired();
		}
	},

	displayCorrect: function() {
		setTimeout(game.checkStatus, 1000);
		$("#questionArea").append("<br>The correct answer is: <br>" + game.questions[game.currentQuestion].options[game.questions[game.currentQuestion].answerIndex]);
	},

	eliminateOptions: function() {
		$("#eliminateOptionsButton").prop("disabled", true);
		var eliminateOptionNumber = Math.floor(Math.random()*4);
		if (game.optionsEliminated.indexOf(eliminateOptionNumber) == -1 && eliminateOptionNumber != game.questions[game.currentQuestion].answerIndex) {
			$("*[data-index=\""+eliminateOptionNumber+"\"]").hide();
			game.optionsEliminated.push(eliminateOptionNumber);
		}
		if (game.optionsEliminated.length < 2) {
			game.eliminateOptions();
		}
	},

	newGame: function() {
		game.correct = 0;
		game.incorrect = 0;
		game.currentQuestion = 0;
		game.assistsLeft = 1;
		game.timeRemaining = 10;
		game.optionsEliminated = [],
		$("#lifelineArea").hide();
		$("#timeArea").html("<h1>Instructions:<br><br></h1><h2>You will have " + game.timeRemaining + " seconds to answer each of " + game.questions.length + " trivia questions.<br>There will be 2 Lifeline buttons to assists you.<br>The first will give you 5 extra seconds to answer a question.<br>The second will eliminate 2 incorrect options.<br>You may only use each lifeline once per game.</h2><br><h1>Good luck!</h1>");
		$("#questionArea").html("<button id='startButton'>Start</button>");
		$("#startButton").on("click", function() {
			game.askQuestions();
		});
		$("#lifelineArea").html("<h1>Lifelines</h1><br><button id='addTimeButton'>Add 5 More Seconds</button><button id='eliminateOptionsButton'>Eliminate 2 Options</button>");

		$("#addTimeButton").on("click", function() {
			game.addTime();
		});

		$("#eliminateOptionsButton").on("click", function() {
			game.eliminateOptions();
		});
	},

	stopCounter: function() {
		clearInterval(timer);
	},

	timeExpired: function() {
		game.incorrect++;
		$("#lifelineArea").hide();
		$("#questionArea").html("<p class='result'>Time is up!!!</p>");
		game.displayCorrect();
	}
}

$(document).ready(function(){
	game.newGame()
});