// Metoda care ne ajută să găsim un element html, asemănător cu funcția $('') din JQuery
function $(selector, container) {
    return (container || document).querySelector(selector);
}

// Clasa care controlează simularea - controller-ul
(function () {

    var _ = self.GameController = function () {
        // Se creează interfața grafică
        // Al doilea argument este mărimea matricei
        this.gameView = new GameView(document.getElementById('grid'), 18);
        this.started = false;
        this.autoplay = false;
        this.gameView.grid.addEventListener('change', function (event) {
            if (event.target.nodeName.toLowerCase() == 'input') {
                this.started = false;
            }
        });
    };

    _.prototype = {
        // Metoda care inițializează jocul
        play: function () {
            this.conwayGame = new ConwayGame(this.gameView.boardArray);
            this.started = true;
        },

        // Metoda care se execută atunci cînd apăsăm butonul „Next”
        next: function () {
            var me = this;
            if (!this.started || this.conwayGame) {
                this.play();
            }
            this.conwayGame.next();
            var board = this.conwayGame.board;
            for (var column = 0; column < this.gameView.size; column++) {
                for (var row = 0; row < this.gameView.size; row++) {
                    this.gameView.checkboxes[column][row].checked = !!board[column][row];
                }
            }

            // Dacă am activat modul „autoplay” atunci inițializăm un timer care 
            // este activat odată la 1700 de milisecunde
            if (this.autoplay) {
                this.timer = setTimeout(function () {
                    me.next();
                }, 1700);
            }
        }
    }
})();

var gameController = new GameController();

(function () {

    var buttons = {
        next: $('button.next')
    }

    // Aici atășăm evenimentul „click” butonului „next”
    buttons.next.addEventListener('click', function () {
        gameController.next();
    });

    // Atașăm evenimentul „change” butonului „autoplay”, care este de fapt un checkbox
    $('#autoplay').addEventListener('change', function () {
        buttons.next.disabled = this.checked;

        gameController.autoplay = this.checked;

        if (this.checked) {
            gameController.next();
        } else {
            // dezactivăm timer-ul dacă utilizatorul dezactivat modul „autoplay”
            clearTimeout(gameController.timer);
            gameController.timer = null;
        }
    });
})();