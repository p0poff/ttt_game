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