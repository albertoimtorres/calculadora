import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export const Button = ({type, text, clickHandler}) => (
    <button className={type} onClick={() => clickHandler(text)}>
        <span>{text}</span>
    </button>
);

Button.protoTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
}