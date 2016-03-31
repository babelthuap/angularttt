!function() {
  'use strict';

  let app = angular.module('TicTacToe');

  app.service('gameSvc', function() {
    let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                         [0, 3, 6], [1, 4, 7], [2, 5, 8],
                         [0, 4, 8], [2, 4, 6]];

    this.checkForGameEnd = (whoseTurn, board) => {
      let owned = [];
      board.forEach((row, y) => {
        row.forEach((square, x) => {
          if (square === whoseTurn) {
            owned.push(3 * y + x);
          }
        });
      });

      let isWinner = winningCombos.some(function(combo) {
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
      return sub.every(element => sup.includes(element));
    }
  });
}();
