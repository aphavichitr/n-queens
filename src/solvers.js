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



window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});
  var rooks = 0;

  //try all next position, if rook can be placed with hasRowConflicts and hasColConflicts
  for (var col = 0; col < n; col++) {
    for (var row = 0; row < n; row++) {
      board.togglePiece(row, col);
      rooks++;
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() ) {
        board.togglePiece(row, col);
        rooks--;
      }
    }
  }
  //if number of rooks equals n, first solution found
  if (rooks === n) {
    solution = board.rows();
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  // if(n === 1) {
  //   return 1;
  // }
  // return n * countNRooksSolutions(n - 1);

  var findRooks = function(row) {
    //base case
    if (row === n) {
      return solutionCount++;
    }
    //recursive case
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        findRooks(row + 1);
      }
      board.togglePiece(row, col);
    }
  };

  findRooks(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = 0;
  var solution = undefined;
  var board = new Board({n: n});
  
  if (n === 0) {
    solution = [];
  }
  if (n === 1) {
    solution = [[1]];
  }
  if (n === 2 || n === 3) {
    solution = board.rows();
  }

  var searchQueens = function(row) {
    //base case
    if (row === n) {
      solutionCount++;
      if (solutionCount === 1) {
        solution = board.rows();
      }
      return solution;
    }
    //recursive case
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        searchQueens(row + 1);
      }
      if (solutionCount === 1) {
        return solution;
      }
      board.togglePiece(row, i);
    }
  };
  searchQueens(0);
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var solutions = [];

  var searchQueens = function(row) {
    //base case
    if (row === n) {
      return solutionCount++;
    }
    //recursive case
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        searchQueens(row + 1);
      }
      board.togglePiece(row, col);
    }
  };
  searchQueens(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
