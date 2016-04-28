/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

  */

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n, startCol) {
  var solution = undefined;
  var board = new Board({n: n});
  var startRow = startRow || 0;
  var startCol = startCol || 0;
  var rooks = rooks || 0;

  //try all next position, if rook can be placed with hasRowConflicts and hasColConflicts
  for(var col = startCol; col < board.rows().length; col++) {
    for (var row = startRow; row < board.rows().length; row++) {
      board.rows()[row][col] = 1;
      //debugger;
      rooks++;
      if(board.hasAnyRowConflicts() || board.hasAnyColConflicts() ) {
        board.rows()[row][col] = 0;
        rooks--;
      }
    }
  }
  console.log('solution', board.rows());
  //if number of rooks equals n, first solution found
  if (rooks === n) {
    solution = board.rows();
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  var solutionsArray = [];
  var removeForNextSolution = 2;
  var nextStartRow = 0;
  var nextStartColumn = 0;

  //call findNrooksSolution to find first solution
  //add first solution to solutionsArray
  solutionsArray.push(findNRooksSolution(n));
  nextStartColumn++;
  if (solutionsArray[solutionsArray.length-1].length > 1) {
    var nextSolution = findNRooksSolution(n, nextStartColumn);
    console.log('nextSolution', nextSolution);
    solutionsArray.push(nextSolution);
  }

  // var findNextSolution = function(solutionsArray, numberToRemove) {
  //   //select the last found solution and make it the current board
  //   var currentBoard = new Board(solutionsArray[solutionsArray.length-1]);
  //   console.log(currentBoard.rows());
  //   //remove last two rooks from last solution
  //   var removedRooks = 0;
  //   for (var col = currentBoard.rows().length-1; col >= 0; col--) {
  //     for (var row = currentBoard.rows().length-1; row >= 0; row--) {
  //       if(currentBoard.rows()[row][col] === 1) {
  //         currentBoard.rows()[row][col] = 0;
  //         removedRooks++;
  //       } //remove only 1 rook
  //       if (removedRooks === numberToRemove) { // break after removing 1 rook
  //         break;
  //       }
  //     }
  //   }
  //   return findNRooksSolution(n, currentBoard, row, col, n - removedRooks);
  // };

  // var retry = function() {
  //   var nextSolution = findNextSolution(solutionsArray, removeForNextSolution);
  //   debugger;
  //   // if nextSolution returns last solution
  //     // call findNextSolution and remove 1 more rook
  //   if (solutionsArray.indexOf(nextSolution) === -1) {
  //     return solutionsArray.push(nextSolution);
  //   } else {
  //     removeForNextSolution++;
  //   }
  //   retry();
  // };

  // if (solutionsArray[solutionsArray.length-1].length > 1) {
  //   retry();
  // }

  solutionCount = solutionsArray.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
