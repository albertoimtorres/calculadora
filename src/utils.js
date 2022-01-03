import _, { subtract } from 'lodash';

export const range = number => 
    _.chain().range(number).sortBy(n => n || Infinity).value();

export const operators = ['+', '-', '*', '/', '='];

export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export const operation = fn => `${new Function(`return ${fn}`)()}`