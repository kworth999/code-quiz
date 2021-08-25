//Global variables

   //Questions
   var questions = [
    {
       question: "Which of the following is NOT a data type?",
       options: ["Boolean", "Number", "String", "Alert"],
       correctAnswer: "Alert"
    },
    {
       question: "Which of the following is used to designate the condition of an if/else statement?",
       options: ["Curly brackets", "Quotes", "Parentheses", "Square brackets"],
       correctAnswer: "Parentheses"
    },
    {
       question: "Which of the following can be stored in an array in Javascript?",
       options: ["Numbers and strings", "Other arrays", "Boolean statements", "All of the above"],
       correctAnswer: "All of the above"
    },
    {
       question: "When assigning variables, what is used to designate a string value?",
       options: ["Curly brackets", "Quotes", "Angle brackets", "Parentheses"],
       correctAnswer: "Quotes"
    },
    {
       question: "What is a tool used during development and debugginging to print content to the debugger?",
       options: ["JavaScript", "Terminal", "Console.log", "Arrays"],
       correctAnswer: "Console.log"
    },
    {
       question: "What designates an object in JavaScript?",
       options: ["Parentheses", "Angle brackets", "Curly brackets", "Double square brackets"],
       correctAnswer: "Curly brackets"
    }
 ]

 //Other necessary global vars
 var questionIndex = 0;
 var count = questions.length * 15; //Allow 15 seconds per question
 var score = 0;
 var mainEl = $("#main");
 var quizComplete = false;


//Function for timer
function timeScore() {
 let remainingTime = setInterval(function() {
    count--;
    $("#timer").text("Score: " + count);

    if (count === 0) {
       clearInterval(remainingTime);

       //Restart quiz if time runs out (block ability to store 0 as a score)
       let timeout = confirm("Oh no! You've run out of time. Please try again.");
       if (timeout === true ){
          window.location.href = "index.html";
       }
    }
 }, 1000);
}

//Event listener for start button and first initialization of generateQuestion
$("#startQuiz").click(function(){
 mainEl.empty();
 $("#timer").text("Score: " + count);
 timeScore();
 generateQuestion();
})


//Function to fetch and display question text and answer options for the current questionIndex
function generateQuestion () {
 mainEl.empty();
 console.log("Qindex is: " + questionIndex); //Remove before submitting

 //Create h2 element and populate with question text from current questionIndex
 let question = $("<h2>")
 question.empty();
 question.text(questions[questionIndex].question);
 mainEl.append(question);

 //Create parent div within main container, define as a column, and add an ID
 let answerOptions = $("<div>");
 answerOptions.empty();
 answerOptions.addClass("col w-50 p-3");
 answerOptions.attr("id", "answers");
 mainEl.append(answerOptions);

 //Create sub-div within answerOptions parent, set as list group, and add ID
 let choices = $("<div>");
 choices.empty();
 choices.addClass("list-group");
 choices.attr("id", "optionsList")
 $("#answers").append(choices);

 //Loop to fetch answer options array from the current questionIndex and create a button for each option

 //Fetch answer options array from within the current questionIndex object and store as a new variable
 let optionsArr = questions[questionIndex].options;

 for (let index = 0; index < optionsArr.length; index++) {
    let label = optionsArr[index];
    let choice = $("<button>");
    choice.addClass("list-group-item list-group-item-action");
    choice.attr("type", "button").attr("id", "answerOption");
    choice.text(label);
    $("#optionsList").append(choice);
 }

 //Define correct answer from corresponding current question
 let correctAns = questions[questionIndex].correctAnswer;

 //Event listener & function to check selected answer against the correct answer and move to the next question
 $(".list-group-item").click(function(){
 let selected = $(this).text();

 //Show next question if selection is correct
 if (selected === correctAns && quizComplete === false) {
    generateQuestion();
 }

 //Apply penalty and show next question if selection is incorrect
 else if (selected != correctAns && quizComplete === false) {
    count -= 10;
    generateQuestion();
 }

 //Show 'quiz complete' view and store score if final question is correct
 else if (selected === correctAns && quizComplete === true) {
    //Store current count as score
    score = count;
    
    //Run function to show completed page and prompt to save score to scoreboard
    endQuiz();
 }

 //Apply penalty, show 'quiz complete' view, and store score if final question is incorrect
 else if (selected != correctAns && quizComplete === true) {
    //Penalize score for wrong answer
    count -= 10;

    //Store current count as score after penalty is applied
    score = count;
    
    //Run function to show completed page and prompt to save score to scoreboard
    endQuiz();
 }
 
 })

 //Increment questionIndex after each iteration of the questions array to iterate through all questions until the final question has been presented
 questionIndex++;

 //Update quizComplete to true once questionIndex matches the number of items in the questions array
 if (questionIndex === questions.length) {
    quizComplete = true;
 }

 //Function for displaying 'quiz complete' and prompt to save score to scoreboard
 function endQuiz() {

    //Hide timer once score is determined and stored
    $("#timer").remove();
    
    //Empty main container
    mainEl.empty();

    //Show 'Quiz complete' message
    let finalViewMain = $("<div>");
    finalViewMain.addClass("card")
    mainEl.append(finalViewMain);

    let finalViewBody = $("<div>")      ;
    finalViewBody.addClass("card-body");
    $(".card").append(finalViewBody);

    let finalViewTitle = $("<h4>");
    finalViewTitle.addClass("card-title").attr("id", "finishMessage")
    finalViewTitle.text("Congratulations! You've finished!");
    $(".card-body").append(finalViewTitle);

    //Show score
    let yourScore = $("<h3>");
    yourScore.addClass("card-title text-success my-3").attr("id", "showScore");
    yourScore.text("Your score: " + score);
    $("#finishMessage").append(yourScore);

    //Prompt to submit score
    let finalViewText = $("<p>");
    finalViewText.addClass("card-text");
    finalViewText.text("Add your initials to submit your score to the scoreboard!");
    $("#finishMessage").append(finalViewText);

    //Form field to input name
    let inputForm = $("<form>");
    inputForm.attr("id", "inputForm");
    $(".card-text").append(inputForm);

    let formField = $("<div>");
    formField.addClass("mb-3").attr("id", "formField");
    $("#inputForm").append(formField);

    let formLabel = $("<label>");
    formLabel.attr("for", "inputName").addClass("form-label");
    $("#formField").append(formLabel);

    let formInput = $("<input>");
    formInput.addClass("form-control mt-3").attr("type", "text").attr("placeholder", "Enter your initials").attr("id", "enteredName");
    $(".form-label").append(formInput);


    //Button to submit score
    let submitButton = $("<a>");
    submitButton.attr("type", "button").addClass("btn btn-success").attr("id", "submitScore").attr("href", "highscores.html").attr("role", "button");
    submitButton.text("Submit score!");
    $(".card-text").append(submitButton);

    //Event listener and submit function for submit button
    $("#submitScore").click(function () {
       let currentName = formInput.val().trim();
       let currentScore = JSON.stringify(score);
       if (currentName === "") {
          alert("Please input your name or initials")
          return false;
       }
       else {
          var scoreBoard = JSON.parse(localStorage.getItem("scoreBoard")) || [];
          var currentUserScore = {
             Name: currentName,
             Score: currentScore
          };

          scoreBoard.push(currentUserScore);
          localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
       }
    })
    
    //Button to start over
    let tryAgain = $("<a>");
    tryAgain.addClass("btn btn-secondary mx-3").attr("id", "tryAgain").attr("href", "index.html").attr("role", "button");
    tryAgain.text("Start Over");
    $(".card-text").append(tryAgain);
 }
}