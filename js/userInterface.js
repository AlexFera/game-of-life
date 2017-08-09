// Clasa care reprezintă interfața grafică
(function () {

    var _ = self.GameView = function (table, size) {
        this.grid = table;
        this.size = size;

        // aici creăm matricea
        this.createGrid();
    };

    _.prototype = {
        // fără JQuery, doar metode native de manipulare a DOM-ului
        createGrid: function () {
            var documentFragment = document.createDocumentFragment();
            this.grid.innerHTML = '';
            this.checkboxes = [];
            for (var y = 0; y < this.size; y++) {
                // adăugăm rîndurile
                var row = document.createElement('tr');
                this.checkboxes[y] = [];
                for (var x = 0; x < this.size; x++) {
                    // adăugăm celulele
                    var cell = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    this.checkboxes[y][x] = checkbox;

                    cell.appendChild(checkbox);
                    row.appendChild(cell);
                }
                documentFragment.appendChild(row);
            }
            // Construim tabelul cu rînduri și coloane
            this.grid.appendChild(documentFragment);
        },

        // metoda returnează matricea
        get boardArray() {
            return this.checkboxes.map(function (row) {
                return row.map(function (checkbox) {
                    return +checkbox.checked;
                })
            });
        }
    };
})();