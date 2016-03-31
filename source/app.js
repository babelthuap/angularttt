!function() {
  'use strict';

  var app = angular.module('TicTacToe', []);

  app.controller('gameCtrl', function($scope) {
    $scope.newGame = function() {
      $scope.whoseTurn = 'X';
      $scope.board = [['', '', ''], ['', '', ''], ['', '', '']];
      $scope.gameRunning = true;
    }

    // immediately start a game
    $scope.newGame();

    $scope.handleClick = function(row, col) {
      if ($scope.board[row][col] || !$scope.gameRunning) {
        return;
      }

      $scope.board[row][col] = $scope.whoseTurn;    

      var winner = checkForGameEnd($scope.whoseTurn, $scope.board);
      if (winner) {
        $scope.gameRunning = false;
        if (winner === 'tie') {
          $scope.endGameMessage = 'Tie Game!';
        } else {
          $scope.endGameMessage = winner + ' Wins!';
        }
      } else {
        $scope.whoseTurn = ($scope.whoseTurn === 'X') ? 'O' : 'X';
      }
    }
  });

  var winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                       [0, 3, 6], [1, 4, 7], [2, 5, 8],
                       [0, 4, 8], [2, 4, 6]];

  function checkForGameEnd(whoseTurn, board) {
    var owned = [];
    board.forEach(function(row, y) {
      row.forEach(function(square, x) {
        if (square === whoseTurn) {
          owned.push(3 * y + x);
        }
      });
    });

    var isWinner = winningCombos.some(function(combo) {
      return isSubset(combo, owned);
    });

    if (isWinner) {
      return whoseTurn;
    } else if (owned.length === 5) {
      return 'tie';
    } else {
      return '';
    }
  }

  function isSubset(sub, sup) {
    return sub.every(function(element) {
      return sup.indexOf(element) !== -1;
    });
  }
}();
