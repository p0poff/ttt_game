function Game(el_class) {

    init(this, el_class);

    function init(game, el_class) {
        let game_elements = document.getElementsByClassName(el_class);
        if (game_elements.length > 0) {
            game.element = game_elements[0];
        } else {
            console.log('There is no game element on the page');
        }
    }

    this.createField = function(field_size) {
        this.field = new Field(field_size);
        this.element.appendChild(this.field.element);
    }

    this.updateField = function() {
        let state = new GameState();
        switch(state.game[1]) {
            case 't':
                this.current_step = state.game[0];
                break;
            case 'w':
                this.winner = state.game[0];
                break;
        }
        this.field.update(state);
    }

    this.sendMove = function(cell_id) {
        console.log(cell_id, this.current_step);
    }

}