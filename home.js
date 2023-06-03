function scoreNull(key) {
  var variable = localStorage.getItem(key);
  if (variable === null) {
    variable = 0;
  }
  localStorage.setItem(key, variable);
}

scoreNull("quizScore");
scoreNull("recentResult");

// 1. Progress bar display

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myProgressBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}


// Display recent score
const recentResult = localStorage.getItem("recentResult");
const result = document.getElementById("recentResult");
// Replace paragraph
var newResult = document.createElement("p");
newResult.textContent = "Your recent score is: " + recentResult + "/10";
// Replace the existing paragraph with the new paragraph
result.parentNode.replaceChild(newResult, result);

// Display best score
const quizScore = localStorage.getItem("quizScore");
const score = document.getElementById("myProgressScore");
// Replace paragraph
var newScore = document.createElement("p");
newScore.textContent = "Your best score is: " + quizScore + "/10";
// Replace the existing paragraph with the new paragraph
score.parentNode.replaceChild(newScore, score);


// Reset best score. Sets best score to zero

// Add event listener to submit button
const resetScore = document.getElementById("resetScore");
// Action
resetScore.addEventListener("click", () => {

    // Sets score to zero
    localStorage.setItem("quizScore", "0");

    // Display score to the user
    console.log("Reset score");
    alert("Your score is reset. Enjoy the game!");

    // Reload the current page
    window.location.reload();P
});



// Progress bar dynamic change

// Check if a value exists in local storage
if (quizScore) {
    // Set the width of the progress bar based on the stored value
    var progressBar = document.getElementById('myProgressBar');
    progressBar.style.width = quizScore * 10 + '%';
  }
  

// Randomise picture
  // Select a random picture number from 1 to 9
  var randomPictureNumber = Math.floor(Math.random() * 9) + 1;

  // Create the image file name using the random picture number
  var imageFileName = "profilePicture-0" + randomPictureNumber + ".png";

  // Get the <img> element by its id
  var imgElement = document.getElementById("homePicture");

  // Set the src attribute of the <img> element to the randomly selected picture
  imgElement.src = "images/" + imageFileName;


  // Reload page to randomize dog picture
const reloadPage = document.getElementById("randomDog");
// Action
reloadPage.addEventListener("click", () => {
    // Reload the current page
    window.location.reload();P
});


// Create message when best score is 10
  // Get the container element where you want to add the message
  const container = document.getElementById("absoluteScore");

  // Create a new message element
  var newMessage = document.createElement("p");

  // Check if quizScore equals 10

  if (quizScore == 10) {
    newMessage.textContent = "Congratulations! Your gained the highest score. You might know everything about movies. Wanna give it another try? Then:";
    // Append the message element to the container
    container.appendChild(newMessage);
  }

  