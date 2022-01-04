import _ from 'lodash';
import { evaluate } from 'mathjs';

const regex = /[^-^+^*^/]+/g;

export const range = number => 
    _.chain().range(number).sortBy(n => n || Infinity).value();

export const operators = ['+', '-', '*', '/', '='];

export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export const format = (state, value) => `${state?.value === '0' ? value :
    state?.value + value}`

export const operation = fn => `${evaluate(fn)}`;

export const words = str => _.chain(str).words(regex).last().value();