$(document).ready(function() {
    game = new Game('ttt_game'); console.log(game);
    game.createField(231);
    game.updateField();
    $('.ttt_cell_e').on('click', function() {
        let cell_id = $(this).data('id');
        game.sendMove(cell_id);
    });
});