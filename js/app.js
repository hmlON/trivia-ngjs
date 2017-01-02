var triviaApp = angular.module('triviaApp', []);

triviaApp.controller("QuestionsController", function QuestionsController($scope) {
  var welcome_question = {
    id: 0,
    answer: "Yes",
    answerUsedLetters: [],
    answerUnusedLetters: ["Y", "E", "S"],
    question: "Are you ready to have some fun?",
    category: "Fun"
  };

  $scope.answers_total = 0;
  $scope.answers_correct = 0;
  $scope.question = welcome_question

  $scope.useLetter = function(letter_index) {
    var letter = $scope.question.answerUnusedLetters.splice(letter_index, 1)[0];
    $scope.question.answerUsedLetters.push(letter);
  }

  $scope.unuseLetter = function(letter_index) {
    var letter = $scope.question.answerUsedLetters.splice(letter_index, 1)[0];
    $scope.question.answerUnusedLetters.push(letter);
  }
});
