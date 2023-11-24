// Get references to the relevant elements  
var submitButton = document.getElementById('submit');
var results = document.getElementById('results');
var questions = document.querySelectorAll('#question > h1');
var options = document.querySelectorAll('input[type="radio"]');

// Define the correct answers
var correctAnswers = ['correct', 'correct', 'correct', 'correct', 'correct', 'correct'];

// Add event listener to the submit button
submitButton.addEventListener('click', calculateResults);

// Function to calculate and display results
function calculateResults() {
    var score = 0;

    for (var i = 0; i < questions.length; i++) {
        var selectedOption = document.querySelector('input[name="q' + (i + 1) + '"]:checked');
        if (selectedOption && selectedOption.value === correctAnswers[i]) {
            score++;
        }
    }

    var percentage = (score / questions.length) * 100;
    var resultMessage = 'You scored ' + score + ' out of ' + questions.length + '. (' + percentage + '%)';

    resultsDiv.textContent = resultMessage;
}
