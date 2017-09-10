function GameState() {

    init(this);

    function init(state) {
        state.cells = [];
        let state_data = '383EE';
        let state_data_bin = parseInt(state_data, 16).toString(2);
        if (state_data_bin.length < 24) {
            do { state_data_bin = '0' + state_data_bin; }
            while (state_data_bin.length < 24);
        }
        let data_length = state_data_bin.length;
        for (let i = 0; i < 9; i++) {
            let cell_state_data = state_data_bin.slice(data_length - (i * 2 + 2), data_length - i * 2);
            let cell_state = cell_state_data[0] == '0' ? 'e' : cell_state_data[1] == '0' ? 'o' : 'x';
            state.cells.push(cell_state);
        }
        let game_status_data = state_data_bin.slice(data_length - 20, data_length - 18);
        state.game = game_status_data[0] == '0' ? game_status_data[1] == '0' ? 'ot' : 'xt' : game_status_data[1] == '0' ? 'ow' : 'xw';
    }

}

function FieldSizes(field_size, margin_percent=10) {

    init(this, field_size, margin_percent);

    function init(size, field_size, margin_percent) {
        let margin_size = field_size * margin_percent / 400;
        let cell_size = (field_size - margin_size * 4) / 3;
        let o_size = cell_size / 2;
        let o_width = cell_size * 0.1;
        let x_width = cell_size * 0.1;
        let x_height = cell_size * 0.7;
        size.field = field_size + 'px';
        size.margin = margin_size + 'px';
        size.cell = cell_size + 'px';
        size.o_size = o_size + 'px';
        size.o_width = o_width + 'px';
        size.x_width = x_width + 'px';
        size.x_height = x_height + 'px';
    }

    this.setStyles = function() {
        let styles_element = document.createElement('style');
        let styles = '';
        let field_styles = '.ttt_field{';
        field_styles += 'width:' + this.field + ';';
        field_styles += 'height:' + this.field + ';';
        field_styles += '}';
        styles += field_styles;
        let cells_styles = '.ttt_field_cell{';
        cells_styles += 'width:' + this.cell + ';';
        cells_styles += 'height:' + this.cell + ';';
        cells_styles += 'margin-top:' + this.margin + ';';
        cells_styles += 'margin-left:' + this.margin + ';';
        cells_styles += '}';
        cells_styles += '.ttt_field_cell:nth-child(3n){';
        cells_styles += 'margin-right:' + this.margin + ';';
        cells_styles += '}';
        cells_styles += '.ttt_field_cell:nth-child(1n+7){';
        cells_styles += 'margin-bottom:' + this.margin + ';';
        cells_styles += '}';
        styles += cells_styles;
        let o_styles = '.ttt_cell_o::before{'
        o_styles += 'width:' + this.o_size + ';';
        o_styles += 'height:' + this.o_size + ';';
        o_styles += 'border-width:' + this.o_width + ';';
        o_styles += 'border-radius:' + this.o_size + ';';
        o_styles += '}';
        styles += o_styles;
        let x_styles = '.ttt_cell_x::before, .ttt_cell_x::after{'
        x_styles += 'width:' + this.x_width + ';';
        x_styles += 'height:' + this.x_height + ';';
        x_styles += '}';
        styles += x_styles;
        styles_element.appendChild(document.createTextNode(styles));
        document.head.appendChild(styles_element);
    }

}

function Cell(index, size) {

    init(this, index, size);

    function init(cell, index, size) {
        let cell_element = document.createElement('div');
        cell_element.className = 'ttt_field_cell';
        cell_element.dataset.id = index;
        cell.element = cell_element;
        cell.id = index;
    }

    this.update = function(state) {
        switch(state) {
            case 'o':
                this.element.classList.remove('ttt_cell_e');
                this.element.classList.remove('ttt_cell_x');
                this.element.classList.add('ttt_cell_o');
                break;
            case 'x':
                this.element.classList.remove('ttt_cell_e');
                this.element.classList.remove('ttt_cell_o');
                this.element.classList.add('ttt_cell_x');
                break;
            case 'e':
            default:
                this.element.classList.remove('ttt_cell_o');
                this.element.classList.remove('ttt_cell_x');
                this.element.classList.add('ttt_cell_e');
                break;
        }
    }

}

function Field(field_size) {

    init(this, field_size);

    function init(field, field_size) {
        let size = new FieldSizes(field_size);
        size.setStyles();
        let field_element = document.createElement('div');
        field_element.className = 'ttt_field';
        field.element = field_element;
        field.cells = [];
        for (let i = 0; i < 9; i++) {
            let cell = new Cell(i, size);
            field.cells.push(cell);
            field.element.appendChild(cell.element);
        }
    }

    this.update = function(state) {
        for (let i = 0; i < 9; i++) {
            this.cells[i].update(state.cells[i]);
        }
    }

}

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

$(document).ready(function() {
    game = new Game('ttt_game'); console.log(game);
    game.createField(231);
    game.updateField();
    $('.ttt_cell_e').on('click', function() {
        let cell_id = $(this).data('id');
        game.sendMove(cell_id);
    });
});