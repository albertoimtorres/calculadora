import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Display = ({value}) => (
  <div className="display">
    {value}
  </div>
);

Display.propTypes = {
  value: PropTypes.string.isRequired
}

Display.defaultProps = {
  value: 0
}

const mapStateToProps = state => ({
  value: state.display.value
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);