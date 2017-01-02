var triviaApp = angular.module('triviaApp', []);

triviaApp.controller("QuestionsController", function QuestionsController($scope) {
  var welcome_question = {
    id: 0,
    answer: "Yes",
    answerShuffledLetters: ["Y", "E", "S"],
    question: "Are you ready to have some fun?",
    category: "Fun"
  };

  $scope.questions_total = 0;
  $scope.questions_correct = 0;
  $scope.question = welcome_question
});
