import React from 'react';

import Display from './components/Display';
import Keyboard from './components/Keyboard';
import SpecialFunctions from './components/Special-Functions';
import Operations from './components/Operations';

import './App.css';

export const App = () => (
  <main className="react-calculator">
    <Display />
    <Keyboard />
    <SpecialFunctions />
    <Operations />
  </main>
);