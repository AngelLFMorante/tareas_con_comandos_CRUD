const { resolve } = require('path');

require('colors');


/* ESTO ES UNA DEMO DE COMO SERÍA SACAR POR CONSOLA HARDCODEADO, PERO NO SE LLAMA, HEMOS UTILIZADO INQUIRER */

const mostrarMenu = () => {

    //mejor hacerlo con una promesa que con un async, ya que necesitamos el return en la funcion del stdin/stdout
    return new Promise(resolve => {

        console.clear();
        console.log('========================'.green);
        console.log('Selecccione una opción ='.green);
        console.log('========================\n'.green);

        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir\n`);

        //el readline ya viene integrado
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion: ', (option) => {
            //console.log({ option }); //para mirar lo que tiene option
            readline.close();
            resolve(option);
        });
    });

}

//pausar el programa
//lo exportamos para utilizarlo.
const pausa = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresiona ${ 'ENTER'.green } para continuar\n`, (option) => {
            readline.close();
            resolve(); //no hace falta retornar nada por que no hay nada con lo que el usuario responda 
        });
    });

}

//Exportamos para poder llamarlo desde app.js
module.exports = {
    mostrarMenu,
    pausa
}