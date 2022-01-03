import React from 'react';
import { Button } from './Button/Button';
import {range} from './../utils';
import { connect } from 'react-redux';

const Keyboard = ({onClickNumber}) => {
  return (
    <div className="keyboard">
      {
        range(10).map((number, index) => 
        <Button key={number} text={number} clickHandler={onClickNumber} />)
      }
    </div>
  );
}

const mapStateToProps = state => ({
  value: state.value
})

const mapDispatchToProps = dispatch => ({
  onClickNumber: value => {
    dispatch({
      type: 'DISPLAY',
      value
    });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);