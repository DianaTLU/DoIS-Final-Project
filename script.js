// Array of objects to hold the quiz questions and their options and correct answer
var questions = [
  {
    question: "I have a/an ____ piano at home: it was made in 1899.",
    options: ["Modern", "Old", "Juicy", "Modest"],
    answer: "Old"
  },
  {
    question: "My _____ machine at the gym is the vending machine.",
    options: ["Favourite", "Nasty", "Big", "Round"],
    answer: "Favourite"
  },
  {
    question: "We all live in a _____ Submarine!",
    options: ["Yellow", "Lovely", "Stupid", "Wooden"],
    answer: "Yellow"
  }
];

// Variable to keep track of the user's score
var score = 0;

// Function to display the quiz questions and their options
function displayQuiz() {
  var quizContainer = document.getElementById("quiz");
  var quizHTML = "";
  for (var i = 0; i < questions.length; i++) {
    quizHTML += "<p>" + questions[i].question + "</p>";
    for (var j = 0; j < questions[i].options.length; j++) {
      quizHTML += '<label><input type="radio" name="question' + i +
                  '" value="' + questions[i].options[j] + '">' +
                  questions[i].options[j] + '</label><br>';
    }
  }
  quizContainer.innerHTML = quizHTML;
}

// Function to check the user's answers and update their score
function checkAnswers() {
  var answerContainers = document.getElementsByTagName("input");
  var currentQuestion = 0; // Keep track of the current question being displayed
  score = 0; // Reset the score to zero
  for (var i = 0; i < answerContainers.length; i++) {
    if (answerContainers[i].checked) {
      var selectedAnswer = answerContainers[i].value;
      var correctAnswer = questions[currentQuestion].answer; // Access the correct answer for the current question
      if (selectedAnswer == correctAnswer) {
        score++;
      }
      currentQuestion++; // Increment the current question counter for the next iteration
    }
  }
  var resultContainer = document.getElementById("result");
  resultContainer.innerHTML = "Your score is: " + score;
  
  if (score < questions.length) {
    document.getElementById("btnTrue").disabled = true;
    document.getElementById("btnTrue").style.opacity = "0.5";
  } else {
    document.getElementById("btnTrue").disabled = false;
    document.getElementById("btnTrue").style.opacity = "1.0";
  }
 // document.getElementById("btnTrue").disabled = score < questions.length;
  // document.getElementById("btnTrue").style.opacity = "0.5";

}

// Call the display quiz function and check answers function in sequence
displayQuiz();



/* I want to add:
if score is 3, then button.enable
else button.disabled */
