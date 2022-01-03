import React from 'react';
import { connect } from 'react-redux';
import { Button } from './Button/Button';

const SpecialFunctions = ({value, onClickClear, onClickClearError}) => {
  return (
    <div className="special-functions">
      <Button type="button-long-text" text={"C"} clickHandler={text => onClickClear(value)} />
      <Button text={"CE"} clickHandler={onClickClearError} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    value: state.display.value
  }
}

const mapDispatchToProps = dispatch => ({
  onClickClear: text => {
    dispatch({
      type: 'C',
      value: text.slice(0, -1)
    })
  },
  onClickClearError: text => {
    dispatch({
      type: text,
      value: ''
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SpecialFunctions);