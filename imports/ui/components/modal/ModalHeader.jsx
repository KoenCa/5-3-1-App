import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ModalHeader extends Component {

  render() {
    return (
      <div className="modal-header">
        <h5 className="modal-title">{this.props.modalTitle}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

ModalHeader.propTypes = {
  modalTitle: PropTypes.string.isRequired
}
