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