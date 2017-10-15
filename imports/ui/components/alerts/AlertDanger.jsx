import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AlertDanger extends Component {

  shouldComponentUpdate = () => true

  render() {
    return (
      <div className="alert alert-danger" role="alert">
        {this.props.message}
      </div>
    )
  }
}

AlertDanger.propTypes = {
  message: PropTypes.string.isRequired
}
