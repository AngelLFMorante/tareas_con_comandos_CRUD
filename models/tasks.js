const Task = require('./task');

/* 
 * _list:
 * { 'uuid-d07a507d-37a7-4cb3-bb5b-3dbe6523448a: { id:12, desc:asd, date: 20082021} }
 */

class Tasks {

    _list = {}; //es un objeto

    get listArray() { //transformamos el list a un array para que sea mas visible hacia el usuario.
        const list = [];
        //convertimos el objeto la key y con el foreach sacamos el valor de la clave(key)
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        })

        return list;
    }

    constructor() {
        this._list = {}; //objeto vacio
    }

    loadTasksFromArray(tasks = []) {
        //buscamos dentro las Tasks y sacamos la Task es un poco lio de trabalenguas al tener estos nombres tan genéricos
        tasks.forEach(task => {
            this._list[task.id] = task;
        });

    }

    createTask(desc = '') {

        const task = new Task(desc); //ahora almacenamos esta Task en list.

        this._list[task.id] = task; //apuntamos la id a la Task. es mejor con objeto que con array

    }

    listComplete() {

        console.log();
        this.listArray.forEach((task, index) => {

            const initiation = `${index + 1}`.green;
            const { desc, date } = task;
            const state = (date) ? 'Completada'.green : 'Pendiente'.red;

            console.log(` ${initiation} ${desc} :: ${state}`);

        })

    }

    listPendingCompleted(completed = true) {

        console.log();
        let counter = 0;
        this.listArray.forEach(task => {

            const { desc, date } = task;
            const state = (date) ? 'Completada'.green : 'Pendiente'.red;

            if (completed) {
                if (date) {
                    counter += 1;
                    console.log(` ${counter.toString().green}. ${desc} :: ${date.green}`);
                }
            } else {
                if (!date) {
                    counter += 1;
                    console.log(` ${counter.toString().green}. ${desc} :: ${state}`);
                }
            }

        })
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    toggleCompleted(ids = []) {

        ids.forEach(id => {

            const task = this._list[id];
            if (!task.date) {
                task.date = new Date().toISOString();
            }

        });

        this.listArray.forEach(task => {

            //si no viene en el array se limpia
            if (!ids.includes(task.id)) {
                this._list[task.id].date = null;
            }

        });


    }



}

module.exports = Tasks;