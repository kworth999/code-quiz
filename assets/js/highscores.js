//Function for generating content on highscores page
function showScores() {

    //Fetch highscores from local storage
    var scores = JSON.parse(localStorage.getItem("scoreBoard"));
 
    //Break function early if scoreboard is empty
    if (scores === null) {
       //Show button to return to quiz
       let returnToQuiz = $("<a>");
       returnToQuiz.addClass("btn btn-primary mt-3").attr("id", "returnToQuiz").attr("href", "index.html").attr("role", "button");
       returnToQuiz.text("Return to quiz");
       $(".card-body").append(returnToQuiz);
       
       //Break function
       return;
 
    } else {
       //Clear default/placeholder text
       $(".card-text").empty();
 
       //Sort scores by highest
       scores.sort(function (a, b) {
          return parseInt(b.Score) - parseInt(a.Score);
       });
 
       //Generate table for scores
       let scoresTable = $("<table>");
       scoresTable.addClass("table");
       $(".card-text").append(scoresTable);
 
       let tableHeader = $("<thead>");
       tableHeader.attr("id", "header");
       $(".table").append(tableHeader);
 
       let headerRow = $("<tr>");
       headerRow.attr("id", "headerRow");
       $("#header").append(headerRow);
 
       let headerContentName = $("<th>");
       headerContentName.attr("scope", "col");
       headerContentName.text("Name");
       $("#headerRow").append(headerContentName);
 
       let headerContentScore = $("<th>");
       headerContentScore.attr("scope", "col");
       headerContentScore.text("Score");
       $("#headerRow").append(headerContentScore);
 
       let tableBody = $("<tbody>");
       tableBody.attr("id", "tableBody");
       $(".table").append(tableBody);
 
       //Loop through 'scores' array and feed into table
       for (let i = 0; i < scores.length; i++) {
          let scoreRow = $("<tr>");
          scoreRow.attr("id", "scoreRow" + i);
          $("#tableBody").append(scoreRow);
 
          let scoreRowName = $("<td>");
          scoreRowName.text(scores[i].Name);
          $("#scoreRow" + i).append(scoreRowName);
 
          let scoreRowScore = $("<td>");
          scoreRowScore.text(scores[i].Score);
          $("#scoreRow" + i).append(scoreRowScore);
       }
 
       //Show button to return to quiz
       let returnToQuiz = $("<a>");
       returnToQuiz.addClass("btn btn-primary mr-3").attr("id", "returnToQuiz").attr("href", "index.html").attr("role", "button");
       returnToQuiz.text("Return to quiz");
       $(".card-text").append(returnToQuiz);
 
       //Show button to clear scores
       let clearScores = $("<a>");
       clearScores.attr("type", "button").addClass("btn btn-secondary").attr("id", "clearScores").attr("href", "highscores.html");
       clearScores.text("Clear Scores");
       $(".card-text").append(clearScores);
 
       //Event listener to execute clearScores function
       $("#clearScores").click(function(){
          localStorage.clear();
          localStorage.reload();
       })
    }
 }
 
 //Initiate function
 showScores();