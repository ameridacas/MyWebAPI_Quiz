// Get references to the relevant elements  
var submitButton = document.getElementById('submit');
var results = document.getElementById('results');
var questionContainers = document.querySelectorAll('question');
var options = document.querySelectorAll('input[type="radio"]');
var finishButton = document.getElementById('finish-button'); 

// Variable to keep track of the current question index
var currentQuestionIndex = 0;

// Array of questions and the correct option
var questions = [
    {
        question: "What's the basic structure of any webpage?",
        options: ["HTML", "CSS", "JavaScript", "JQuery"],
        correctAnswer: "HTML"
    },
    {
        question: "What method is used for selecting another element in JavaScript?",
        options: [".getElementByID", "const", ".EPSILON", "console.log"],
        correctAnswer: ".getElementByID"
    },
    {
        question: "What property generates space around an element?",
        options: ["position", "padding", "max-width", "float"],
        correctAnswer: "padding"
    },
    {
        question: "Which symbol is used for creating an array?",
        options: ["{}", "()", "/", "[]"],
        correctAnswer: "[]"
    },
    {
        question: "What application is on its way out?",
        options: ["JQuery", "JavaScript", "Bootstrap", "Python"],
        correctAnswer: "JQuery"
    },
    {
        question: "What removes all child nodes and content from selected elements?",
        options: ["detach()", "prepend()", "empty()", "remove()"],
        correctAnswer: "empty()"
    }
];

// Add event listener to the start button
startButton.addEventListener('click', function () {
    // Start the quiz and the timer
    startQuiz();
    startTimer();
});

// Function to generate the quiz
function generateQuiz(questions) {
    var quizContainer = document.getElementById('quiz-container');

    questions.forEach(function (question, index) {
        var questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';

        var questionText = document.createElement('p');
        questionText.textContent = question.question;
        questionContainer.appendChild(questionText);

        question.options.forEach(function (option) {
            var optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question' + (index + 1);
            optionInput.value = index;
            questionContainer.appendChild(optionInput);
            var optionLabel = document.createElement('label');
            optionLabel.textContent = option;
            questionContainer.appendChild(optionLabel);
        });

        quizContainer.appendChild(questionContainer);
    });
}

submitButton.addEventListener('click', function () {
    // Check if an option has been selected for each question
    for (var i = 0; i < questions.length; i++) {
        var selectedOption = document.querySelector('input[name="q' + (i + 1) + '"]:checked');
        if (!selectedOption) {
            alert('Please select an option for question ' + (i + 1));
            return;
        }
    }

    // Calculate results for the current question
    calculateResults();

    // Move to the next question 
    showNextQuestion();
});

// Function to show the next question 
function showNextQuestion() {
    // Hide the current question
    questionContainers[currentQuestionIndex].style.display = 'none';

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questionContainers.length) {
        // Show the next question
        questionContainers[currentQuestionIndex].style.display = 'block';
    } else {
        // Calculate and display the results if there are no more questions
        calculateAndDisplayResults();
    }
}
// Add event listener to the finish button
finishButton.addEventListener('click', function () {
    // Calculate and display the results
    calculateAndDisplayResults();

    // Hide the current question container
    questionContainers[currentQuestionIndex].style.display = 'none';
});

// Function to calculate and display results
// Function to calculate and display results
function calculateAndDisplayResults() {
    var score = 0;
    var correctAnswers = [];
    var incorrectAnswers = [];

    for (var i = 0; i < questions.length; i++) {
        var selectedOption = document.querySelector('input[name="question' + (i + 1) + '"]:checked');
        if (selectedOption) {
            if (selectedOption.value === questions[i].correctAnswer) {
                score++;
                correctAnswers.push({question: questions[i].question, answer: selectedOption.value});
            } else {
                incorrectAnswers.push({question: questions[i].question, answer: selectedOption.value});
            }
        }
    }

    var percentage = (score / questions.length) * 100;
    var resultMessage = 'You scored ' + score + ' out of ' + questions.length + '. (' + percentage + '%)';

    results.textContent = resultMessage;

    // Display correct and incorrect answers
    console.log('Correct Answers:', correctAnswers);
    console.log('Incorrect Answers:', incorrectAnswers);
}

// Add event listener for finishing the quiz
finishButton.addEventListener('click', function () {
    // Calculate results for the last question
    calculateResults();

    // Display the correct answers
    displayCorrectAnswers();

    alert('Congratulations! You have completed the quiz.');
    
});

// Function to display the correct answers
function displayCorrectAnswers() {
    questions.forEach(function (question, index) {
        var correctAnswerText = 'Correct answer for question ' + (index + 1) + ': ' + question.correctAnswer;
        var correctAnswerElement = document.createElement('p');
        correctAnswerElement.textContent = correctAnswerText;
        results.appendChild(correctAnswerElement);
    });
}
// Variable to keep track of the remaining time
var timeLeft = 60; 

// Get reference to the timer display element
var timerDisplay = document.getElementById('timer');

// Function to start the timer
function startTimer() {
    var timerInterval = setInterval(function () {
        // Decrease the time left by one
        timeLeft--;

        // Update the timer display
        timerDisplay.textContent = 'Time left: ' + timeLeft + ' seconds';

        // Check if the time has run out
        if (timeLeft <= 0) {
            // Stop the timer
            clearInterval(timerInterval);

            // End the quiz
            endQuiz();
        }
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    // Calculate results for the last question
    calculateResults();

    // Display the correct answers
    displayCorrectAnswers();

    alert('Time is up! You have completed the quiz.');
}



