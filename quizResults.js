// Display recent score
const recentResult = localStorage.getItem("recentResult");
const result = document.getElementById("recentResult");
// Replace paragraph
var newResult = document.createElement("p");
//newResult.textContent = "Your score is: .....,,", score;
newResult.textContent = "Your score is: " + recentResult + "/10";
// Replace the existing paragraph with the new paragraph
result.parentNode.replaceChild(newResult, result);


// Display best score
const quizScore = localStorage.getItem("quizScore");
const score = document.getElementById("quizBestScore");
// Replace paragraph
var newScore = document.createElement("p");
newScore.textContent = "Your best score is: " + quizScore + "/10";
// Replace the existing paragraph with the new paragraph
score.parentNode.replaceChild(newScore, score);

// Generate a message
const message = document.getElementById("message");
// Replace paragraph, depending on the recent quiz score 
var newMessage = document.createElement("h2");
if (recentResult == 10) {
    newMessage.textContent = "Amazing! You are a true movie lover!";   
  } else if (recentResult>5 && recentResult<10) {
    newMessage.textContent = "Great score, almost there!";    
    } else if (recentResult>2 && recentResult<6) {
        newMessage.textContent = "Not bad, though it could be better.";    
    } else {
        newMessage.textContent = "It ain't much, but it's an honest work. Keep it up!";    
    }
// Replace the existing paragraph with the new paragraph
message.parentNode.replaceChild(newMessage, message);
