'use strict';

var app = angular.module('ticTacToe', []);

app.controller('gameCtrl', function($scope) {
  var whoseTurn = 'X';

  $scope.newGame = function() {
    whoseTurn = 'X';
    $scope.turnIndicator = whoseTurn + "'s turn";
    $scope.board = [['', '', ''], ['', '', ''], ['', '', '']];
    $scope.gameRunning = true;
  }

  // immediately start a game
  $scope.newGame();

  $scope.handleClick = function(row, col) {
    if ($scope.board[row][col] || !$scope.gameRunning) {
      return;
    }

    $scope.board[row][col] = whoseTurn;    

    if (checkForWin()) {
      $scope.gameRunning = false;
    } else {
      whoseTurn = (whoseTurn === 'X') ? 'O' : 'X';
    }
  }

  function checkForWin() {
  }

});
