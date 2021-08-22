//npm uuid es un paquete para dar un identificador unico, viene muy bien para id's

const { v4: uuidV4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    date = null; //'fecha, si no tiene = null'

    constructor(desc) {

        this.id = uuidV4();
        this.desc = desc;
        this.date = null;

    }
}

module.exports = Task;