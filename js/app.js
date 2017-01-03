var triviaApp = angular.module('triviaApp', []);

triviaApp.controller("QuestionsController", function QuestionsController($scope) {
  var welcomeQuestion = {
    id: 0,
    answer: "YES",
    answerUsedLetters: [],
    answerUnusedLetters: shuffleAnswerLetters("YES"),
    question: "Are you ready to have some fun?",
    category: "Fun"
  };

  $scope.answersTotal = 0;
  $scope.answersCorrect = 0;
  $scope.question = welcomeQuestion

  $scope.useLetter = function(letterIndex) {
    var letter = $scope.question.answerUnusedLetters.splice(letterIndex, 1)[0];
    $scope.question.answerUsedLetters.push(letter);

    if ($scope.question.answerUnusedLetters.length == 0){
      if (isUserAnswerCorrect()) {
        $scope.answersTotal += 1;
        $scope.answersCorrect += 1;
        diplayAnswerCorrectness();
        displayNewQuestion();
      } else {
        diplayAnswerIncorrectness();
      }
    }
  }

  $scope.unuseLetter = function(letterIndex) {
    var letter = $scope.question.answerUsedLetters.splice(letterIndex, 1)[0];
    $scope.question.answerUnusedLetters.push(letter);
  }

  $scope.skipQuestion = function() {
    $scope.answersTotal += 1;
    displayNewQuestion();
  }

  function isUserAnswerCorrect() {
    return $scope.question.answer === $scope.question.answerUsedLetters.join("");
  }

  function diplayAnswerCorrectness() {
    alert("Congratulations! You are correct!");
  }

  function diplayAnswerIncorrectness() {
    alert("Oh... You are wrong...");
  }

  function displayNewQuestion(){
    $scope.question = getNewQuestion();
  }

  function getNewQuestion() {
    var jserviceQuestion = getJserviceQuestion();
    var transformedQuestion = {
      id: jserviceQuestion.id,
      answer: jserviceQuestion.answer.toUpperCase(),
      answerUsedLetters: [],
      answerUnusedLetters: shuffleAnswerLetters(jserviceQuestion.answer.toUpperCase()),
      question: jserviceQuestion.question,
      category: jserviceQuestion.category.title
    };
    return transformedQuestion;
  }

  function getJserviceQuestion() {
    var questions;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        questions = this.responseText;
      }
    };
    xhttp.open("GET", "http://jservice.io/api/random", false);
    xhttp.send();
    return JSON.parse(questions)[0];
  }

  function shuffleAnswerLetters(answer) {
    return answer.split("")
                 .sort(() => 0.5 - Math.random());
  }
});
