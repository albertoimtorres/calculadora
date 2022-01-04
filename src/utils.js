import _ from 'lodash';
import { evaluate } from 'mathjs';

const regex = /[^-^+^*^/]+/g;

export const operators = ['+', '-', '*', '/', '='];

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
export const operation = fn => `${evaluate(fn)}`;

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