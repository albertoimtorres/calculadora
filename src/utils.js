import _, { find, findLast } from 'lodash';
import { evaluate } from 'mathjs';

const regexMathFunc = /(√|x²)/gi; // /(√|x²)(?![0-9.]).*$/gi; // /(√|x²).*$/g;
const regex = /[^-^+^*^/^√^x²]+/g;
const regexReverse = /^[0-9.]*(x²|√)$/gi;
const regexFunc =  /(√|x².*?)[0-9.]*|[0-9.]*(√|x².*?)/gi; // /(√.*?)[0-9.]*|[0-9.]*(√.*?)|(x².*?)[0-9.]*|[0-9.]*(x².*?)/gm;

const dict = {
    '√': 'sqrt',
    'x²': 'square'
};

export const operators = ['+', '-', '*', '/', '±', '.', '√', 'x²', '='];

/**
 * @description
 * Genera un arreglo de n posiciones y mueve el valor 0
 * a la última posición del arreglo.
 * 
 * Ejemplo:
 * 
 * range(5)
 * 
 * Esto genera un arreglo de cinco posiciones.
 * 
 * [1,2,3,4,0]
 * 
 * Y mueve el valor cero a la última posición.
 * 
 * @param {Number} number rango del arreglo
 * 
 * @returns {Array<Number>} un nuevo arreglo.
*/
export const range = number => 
    _.chain().range(number).sortBy(n => n || Infinity).value();

/**
 * @description
 * Programación funcional
 * 
 * Función Pipe toma una secuencia de n operaciones; en el que cada operación
 * tiene un argumento; y proporciona la salida procesada como entrada para la
 * siguiente operación de la secuencia.
 * 
 * Ejemplo:
 * 
 * const getName = ({name}) => name;
 * 
 * const upperCase = str => str.toUpperCase();
 * 
 * const getNCharacteres = str => str.slice(0, 6);
 * 
 * Para evitar realiza la siguiente acción:
 * 
 * getNCharacteres(upperCase(getName({name: 'Buckethead'})));
 * 
 * Este código se ve engorroso y casi ininteligible, se realiza la utilización
 * de pipe.
 * 
 * Ejemplo:
 * 
 * const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
 * 
 * pipe(getName, upperCase, getNCharacteres)({name: 'Buckethead'});
 * 
 * Esto se adapta a la descripción de lo que es una función pipe y se vuelve
 * mas comprensible y mejor estructurado para ejecutar multiples funciones en
 * una sola linea.
*/
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

/**
 * @description
 * Valida se muestre el valor 0 por default en el compoente Display.
 * Si se realiza una operación matemática solo mostrara el valor sin
 * concatenar el 0 (Sin esta validación se concatena el cero).
 * 
 * @param {String} state valor inicial.
 * @param {String} value valor seleccionado en el teclado.
 * 
 * @returns {String} valores tecleados.
*/
export const format = (state, value) => `${state?.value === '0' ? value :
    state?.value + value}`

const formatFunction = (fn) => `${dict[fn.match(regexMathFunc)[0]]}(${_.replace(fn, fn.match(regexMathFunc)[0], '')})`;

/**
 * @description
 * Realiza el cálculo de la raiz cuadrada. Busca dentro de la cadena
 * la subcadena √ con los valores asigandos a esta y reemplaza los
 * valores con la función sqrt en cadena con sus correspondientes
 * valores.
 *
 * Ejemplo:
 *
 * var str = '12 + √5 - 20 + 8';
 *
 * Busca la subcadena √5 y reemplza esta por sqrt(5)
 *
 * Entonces la cadena queda de la siguiente manera:
 *
 * '12 + sqrt(5) - 20 + 8';
 *
 * No importa que lleguen valores decimales o enteros muy grandes
 * estos seran reemplazados.
 *
 * Esto se realiza para que cuando pase por la función evaluate de mathjs
 * se pueda realizar el cálculo.
 *
 * @param {String} str operaciones matemáticas.
 *
 * @returns {String} el cambio de caracter √.
*/
export const funcSpecials = operation => {

    const fns = _.words(operation, regexFunc);

    fns.map(fn =>
        regexReverse.exec(fn) !== null ?
        operation = _.replace(operation, fn, formatFunction(fn)) :
        operation = _.replace(operation, fn, formatFunction(fn))
    );

    return operation;
}

/**
 * @description
 * Recibe una operación matemática en cadena y la evalua.
 * 
 * Ejemplo:
 * 
 * var fn = '12 + 5 / 2';
 * 
 * evaluate(fn)
 * 
 * El resultado es: 8.5
 * 
 * Y se retorna el resultado en String dentro de la variable template.
 * 
 * @param {String} fn cadena de operaciones matemàticas.
 * 
 * @return {String} el resultado de la operación.
*/
export const operation = fn => `${pipe(funcSpecials, evaluate)(fn)}`;

/**
 * @description
 * Recibe una cadena la cual convierte en arreglo con la regex
 * y obtiene la ultima posición de este.
 * 
 * Ejemplo:
 * 
 * var str = '12+5';
 * 
 * lo convierte a:
 * 
 * ['12', '5']
 * 
 * y obtiene la última posición
 * 
 * '5'
 * 
 * Si fuera de un solo elemento, regresa la posicion.
 * 
 * @param {String} str cadena que convertira en arreglo.
 * 
 * @returns {String} la última posición.
*/
export const words = str => _.chain(str).words(regex).last().value();