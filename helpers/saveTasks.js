//vamos a exportar a un fichero. aunque lo llamemos data o base de datos, es solo un ejemplo de como persistir datos.
const fs = require('fs')
const route = './db/data.json'; //tenemos que crear la ruta, y creamos el fichero.

const saveDB = (data) => {
    //The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView.
    fs.writeFileSync(route, JSON.stringify(data)); //asi que nosotros lo transformamos por que recibimos un array.

}

const readDB = () => {

    //verificamos si ese route existe
    if (!fs.existsSync(route)) {
        return null;
    }

    //tenemos que pasar el path y el encoding sino nos lo da en byte
    const info = fs.readFileSync(route, { encoding: 'utf-8' });
    //console.log(info); //esto nos imprime de forma string

    //Para que nos devuelva nuestro array, lo que tenemos que hacer es serializarlo, parsearlo, porque si no nos devuelve un string
    const data = JSON.parse(info);
    // console.log(data); //aqui ya nos imprime el arreglo.

    return data;
}

module.exports = {
    saveDB,
    readDB
}