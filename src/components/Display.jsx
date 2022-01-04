import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { words } from '../utils';

const Display = ({value}) => (
  <div className="display">
    {value}
  </div>
);

Display.propTypes = {
  value: PropTypes.string.isRequired
}

Display.defaultProps = {
  value: "0"
}

const mapStateToProps = state => ({
  value: words(state.display.value)
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);