import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    const modalId = `#${this.props.modalName}`
    $(modalId).on('hidden.bs.modal', this.props.onModalClose);
    $(modalId).modal();
  }

  render() {
    return (
      <div className="modal fade" id={this.props.modalName} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  modalName: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired
}
