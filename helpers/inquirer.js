const inquirer = require('inquirer');
require('colors');

//creamos un objeto json, para utilizarlo en nuestro paquete de inquirer
const questions = [{
    type: 'list',
    name: 'option',
    message: '¿Que desea hacer?',
    choices: [{
            value: '1',
            name: `${'1.'.green} Crear task`
        },
        {
            value: '2',
            name: `${'2.'.green} Listar tasks`
        },
        {
            value: '3',
            name: `${'3.'.green} Listar tasks completadas`
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tasks pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green} Completar task(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar task`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`
        },
    ]
}]

//menú, lo que hace el inquirer es tener una interfaz con comprobaciones y mas funcional que escribir por console.log
const inquirerMenu = async() => {
    console.clear();
    console.log('=========================='.green);
    console.log('= Selecccione una opción ='.white);
    console.log('==========================\n'.green);

    //inquire trabaja en promesa, podemos hacer un await.
    const { option } = await inquirer.prompt(questions)

    return option;
}

const pause = async() => {
    const questionPause = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${ 'ENTER'.green } para continuar`
    }];
    console.log('\n');
    await inquirer.prompt(questionPause);
}

const readInput = async(message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) { //siempre hay que poner un return de valor
            if (value.length === 0) {
                return 'Por favor ingrese un valor'; //error
            }
            return true; //la validación pasó
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listOfTasksToBeDeleted = async(tasks = []) => {

    const choices = tasks.map((task, index) => {
        //aqui sacamos la forma nueva que queremos que salga los items
        const initialize = `${index + 1}`.green;
        return {
            value: task.id, //todos sus hijos 
            name: `${initialize} ${task.desc}`
        }
    });

    //para añadir una nueva, en este caso es para añadir cancelacion de borrado.
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]

    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {

    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const showCheckList = async(tasks = []) => {

    const choices = tasks.map((task, index) => {
        //aqui sacamos la forma nueva que queremos que salga los items
        const initialize = `${index + 1}`.green;

        return {
            value: task.id, //todos sus hijos 
            name: `${initialize} ${task.desc}`,
            checked: (task.date) ? true : false
        }
    });

    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]

    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listOfTasksToBeDeleted,
    confirm,
    showCheckList
}