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