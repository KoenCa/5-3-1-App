import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ModalFooter extends Component {
  render() {
    return (
      <div className="modal-footer">
        {this.props.children}
      </div>
    )
  }
}
