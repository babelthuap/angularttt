!function() {
  'use strict';

  let app = angular.module('TicTacToe', []);

  app.controller('gameCtrl', function($scope, gameSvc) {
    $scope.newGame = () => {
      $scope.whoseTurn = 'X';
      $scope.board = [['', '', ''], ['', '', ''], ['', '', '']];
      $scope.gameRunning = true;
    }

    // immediately start a game
    $scope.newGame();

    $scope.handleClick = (row, col) => {
      if ($scope.board[row][col] || !$scope.gameRunning) {
        return;
      }

      $scope.board[row][col] = $scope.whoseTurn;    

      let winner = gameSvc.checkForGameEnd($scope.whoseTurn, $scope.board);
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
}();
