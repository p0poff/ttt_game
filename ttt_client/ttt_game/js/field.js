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