var triviaApp = angular.module('triviaApp', []);

triviaApp.controller("QuestionsController", function QuestionsController($scope) {
  var welcome_question = {
    id: 0,
    answer: "YES",
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

    if ($scope.question.answerUnusedLetters.length == 0){
      if (isUserAnswerCorrect()) {
        $scope.answers_total += 1;
        $scope.answers_correct += 1;
        diplayAnswerCorrectness();
        displayNewQuestion();
      } else {
        diplayAnswerIncorrectness();
      }
    }
  }

  $scope.unuseLetter = function(letter_index) {
    var letter = $scope.question.answerUsedLetters.splice(letter_index, 1)[0];
    $scope.question.answerUnusedLetters.push(letter);
  }

  $scope.skipQuestion = function() {
    $scope.answers_total += 1;
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
    var jservice_question = {"id":132294,"answer":"Achilles","question":"In \"Troilus \u0026 Cressida\", this Greek refuses to fight after his pride is injured","value":200,"airdate":"2012-07-16T12:00:00.000Z","created_at":"2015-01-22T02:19:02.331Z","updated_at":"2015-01-22T02:19:02.331Z","category_id":14728,"game_id":3948,"invalid_count":null,"category":{"id":14728,"title":"\"a\"-list literary characters","created_at":"2014-02-14T02:39:09.674Z","updated_at":"2014-02-14T02:39:09.674Z","clues_count":10}};
    var transformed_question = {
      id: jservice_question.id,
      answer: jservice_question.answer.toUpperCase(),
      answerUsedLetters: [],
      answerUnusedLetters: shuffleAnswerLetters(jservice_question.answer.toUpperCase()),
      question: jservice_question.question,
      category: jservice_question.category.title
    };
    return transformed_question;
  }

  function shuffleAnswerLetters(answer) {
    return answer.split("");
  }
});
