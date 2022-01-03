import React from 'react';
import { Button } from './Button/Button';
import {operators, range} from './../utils';
import { connect } from 'react-redux';

const Operations = ({value, onClickOperation, onClickEqual}) => {
  return (
    <div className="operations">
      {
        range(operators.length).map(
          (number, index) => 
          operators[index] !== '=' ? 
          <Button
            key={index} 
            text={`${operators[index]}`} 
            clickHandler={onClickOperation}
          /> :
          <Button 
            key={index}
            text={`${operators[index]}`}
            clickHandler={text => onClickEqual(value)}
          />
        )
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    value: state.display.value
  }
}

const mapDispatchToProps = dispatch => ({
  onClickOperation: value => {
    dispatch({
      type: 'DISPLAY',
      value
    })
  },
  onClickEqual: value => {
    dispatch({
      type: 'EQUAL',
      value
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Operations)