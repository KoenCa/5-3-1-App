import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ModalBody extends Component {
  render() {
    return (
      <div className="modal-footer">
        {this.props.children}
      </div>
    )
  }
}
