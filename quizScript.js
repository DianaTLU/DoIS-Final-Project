// Function to generate the quiz
function generateQuiz(quizData) {
  const quizContainer = document.getElementById("quizContainer");
  const submitButton = document.getElementById("submitButton");
  const questionsPropertyArr = [];
  let score = 0;
  
  // Display each question and options
  quizData.forEach((movie, index) => {
    const questionElement = document.createElement("h3");
    const questionProperty = getRandomProperty(movie);
    questionsPropertyArr.push(questionProperty);
    const correctAnswer = movie[questionProperty];

    questionElement.textContent = `Question ${index + 1}: What is the ${questionProperty} of the movie ${movie.title}?`;
    quizContainer.appendChild(questionElement);

   console.log(correctAnswer) 
    const optionsContainer = document.createElement("ul");
    const options = getRandomOptions(movie, questionProperty, quizData);

    options.forEach(option => {
      const optionElement = document.createElement("li");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question-${index}`;
      optionInput.value = option;
      optionInput.required = true;

      optionElement.appendChild(optionInput);
      optionElement.appendChild(document.createTextNode(option));
      optionsContainer.appendChild(optionElement);
    });

    quizContainer.appendChild(optionsContainer);
    quizContainer.appendChild(document.createElement("hr"));
  });

  // Add event listener to submit button
  submitButton.addEventListener("click", () => {
    // Calculate score
    const answerInputs = document.querySelectorAll("input[type=radio]:checked");
    answerInputs.forEach(answerInput => {
      const questionIndex = parseInt(answerInput.name.split("-")[1]);
      const selectedAnswer = answerInput.value;
      const movie = quizData[questionIndex];
      const movieKey = questionsPropertyArr[questionIndex];
      const correctAnswer = movie[movieKey];

      if (selectedAnswer === correctAnswer) {
        score++;
      }
    });
 
    // Save score to local storage
    localStorage.setItem("recentResult", score);

    // Check if quizScore exists in localStorage
    if (localStorage.getItem("quizScore")) {
      // Retrieve quizScore from localStorage
      var storedQuizScore = parseFloat(localStorage.getItem("quizScore"));
      
      // Compare the variables
      if (score > storedQuizScore) {
        // Update quizScore with score value in localStorage
        localStorage.setItem("quizScore", score.toString());
        console.log("quizScore updated with the value of Score:", score);
      } else {
        console.log("score is not greater than quizScore. No update needed.");
      }
    } else {
      localStorage.setItem("quizScore", score.toString());
      console.log("quizScore has been created, value set to:", score);
    }

    // Redirect to another page
    window.location.href = "quizResults.html";

  });
}

// Function to get a random property from an object, excluding "Title"
function getRandomProperty(obj) {
  const properties = Object.keys(obj).filter(property => property !== "title");
  const randomIndex = Math.floor(Math.random() * properties.length);
  return properties[randomIndex];
}

// Function to get random options for the quiz question
function getRandomOptions(movie, correctProperty, quizData) {
  const options = [movie[correctProperty]];

  // Filter out the correct option from the quizData
  const filteredQuizData = quizData.filter(item => item !== movie);

  while (options.length < 4) {
    const randomMovie = getRandomMovie(filteredQuizData);
    const randomValue = randomMovie[correctProperty];

    if (!options.includes(randomValue)) {
      options.push(randomValue);
    }
  }

  // Shuffle the options array
  shuffleArray(options);

  return options;
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to get a random movie from the quiz data
function getRandomMovie(quizData) {
  const randomIndex = Math.floor(Math.random() * quizData.length);
  return quizData[randomIndex];
}

// Fetch movie data from the API
const moviesIdArr = ["tt0120616", "tt0068646", "tt1375666", "tt0468569", "tt0111161", "tt0050083", "tt0167260", "tt0110912", "tt0109830", "tt0137523"];
const apiKey = "51885a54&";
const fetchMoviesData = async () => {
  const quizData = [];

  for (const movieId of moviesIdArr) {
    const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
    const movieData = await response.json();

    if (movieData.Response === "True") {
      quizData.push({
        title: movieData.Title,
        genre: movieData.Genre,
        director: movieData.Director,
        "release year": movieData.Year,
      });
    }
  }

  return quizData;
};

fetchMoviesData()
  .then(quizData => {
    // Store quiz data in local storage for future use
    localStorage.setItem("quizData", JSON.stringify(quizData));

    // Generate quiz
    generateQuiz(quizData);
  })
  .catch(error => {
    console.log("Error fetching quiz data:", error);
  });
