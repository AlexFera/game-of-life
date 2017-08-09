// O clasă care primește ca parametru o matrice bi-dimensională - seed-ul
// Clasa are o metodă next() care calculează următoare stare folosind starea precedentă
// Aici avem logica jocului

(function () {

    var _ = self.ConwayGame = function (seed) {
        this.seed = seed;
        this.height = seed.length;
        this.width = seed[0].length;
        this.previousBoard = [];
        this.board = cloneArray(seed);
    }

    _.prototype = {
        // metoda calculează următoare stare a jocului foloind starea anterioară
        next: function () {
            // salvăm starea anterioare a simulării
            this.previousBoard = cloneArray(this.board);

            for (var column = 0; column < this.height; column++) {
                for (var row = 0; row < this.width; row++) {
                    var nummberOfAliveNeighbors = this.getNumberOfAliveNeighbors(this.previousBoard, row, column);

                    // Logica care decide dacă celula moare sau trăiește
                    var isAlive = !!this.board[column][row];
                    if (isAlive) {
                        if (nummberOfAliveNeighbors < 2 || nummberOfAliveNeighbors > 3) {
                            // Celula moare
                            this.board[column][row] = 0;
                        }
                    } else {
                        if (nummberOfAliveNeighbors == 3) {
                            // Celula revine la viață
                            this.board[column][row] = 1;
                        }
                    }
                }
            }
        },

        // funcția care calculează numărul de celule vecine „vii”
        // folosim programare funcținoală pentru a procesa matricea
        getNumberOfAliveNeighbors: function (array, row, column) {
            var previousRow = array[column - 1] || [];
            var nextRow = array[column + 1] || [];
            return [
                previousRow[row - 1], previousRow[row], previousRow[row + 1],
                array[column][row - 1], array[column][row + 1],
                nextRow[row - 1], nextRow[row], nextRow[row + 1]
            ].reduce(function (previousValue, currentValue) {
                return previousValue + +!!currentValue;
            }, 0);
        },

        // metodă care ne ajută la depanare
        toString: function () {
            return this.board.map(function (row) {
                return row.join(' ');
            }).join('\n');
        }
    };

    // funcția clonează doar matrici bi-dimensionale
    function cloneArray(array) {
        return array.slice().map(function (row) {
            return row.slice();
        });
    }

})();