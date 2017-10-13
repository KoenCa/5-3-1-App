import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ModalBody extends Component {

  render() {
    return (
      <div className="modal-body">
        {this.props.children}

        {this.props.meteorError &&
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            {this.props.meteorError}
          </div>
        }
      </div>
    )
  }
}

ModalBody.propTypes = {
  meteorError: PropTypes.string
}
