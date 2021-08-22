require('colors');

const { saveDB, readDB } = require('./helpers/saveTasks');
//const { mostrarMenu, pausa } = require('./helpers/mensajesSalida'); esto ya no nos hace falta ya que lo utilizabamos para imprimir hardcodeado
const {
    inquirerMenu,
    pause,
    readInput,
    listOfTasksToBeDeleted,
    confirm,
    showCheckList
} = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tasks = require('./models/tasks');
console.clear();

const main = async() => {
    console.log('Hola Mundo');

    let option = '';
    const tasks = new Tasks();

    const readTasksDB = readDB();

    if (readTasksDB) {
        //si existe , establecemos Tasks y las cargamos
        tasks.loadTasksFromArray(readTasksDB);
    }

    do {

        //option = await mostrarMenu(); //podemos poner el await, porque le decimos que se espere que tenemos una promesa y retornamos un parametro.
        option = await inquirerMenu();

        switch (option) {
            case '1': // Crear tarea
                const desc = await readInput('Descripcion:');
                tasks.createTask(desc);
                break;
            case '2': // Listar Tasks
                // console.log(tasks._listado);
                tasks.listComplete();
                //tasks.listArray(); //sacamos el listado como un arreglo. (Array)
                break;
            case '3': // Listar Tasks completadas
                tasks.listPendingCompleted(true);
                break;
            case '4': // Listar Tasks pendientes
                tasks.listPendingCompleted(false);
                break;
            case '5': // Completar tarea(s)
                const ids = await showCheckList(tasks.listArray);
                tasks.toggleCompleted(ids);
                break;
            case '6': // Borrar tarea
                const id = await listOfTasksToBeDeleted(tasks.listArray);
                if (id !== '0') {
                    const confirmation = await confirm('¿Estás seguro?');
                    if (confirmation) {
                        tasks.deleteTask(id);
                        console.log('Tarea borrada con éxito.');
                    }
                }
                break;
            case '0': //Salir
                break;
        }

        //persistimos datos !! ( guardamos )
        saveDB(tasks.listArray);

        // console.log({ option }) //para ver lo que estamos haciendo    
        //if (option !== '0') await pausa();
        if (option !== '0') await pause();

    } while (option != '0');

}

main();