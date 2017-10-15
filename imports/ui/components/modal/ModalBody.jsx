import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AlertDanger from '../alerts/AlertDanger';

export default class ModalBody extends Component {

  render() {
    return (
      <div className="modal-body">
        {this.props.children}

        {this.props.meteorError &&
          <AlertDanger message={this.props.meteorError} />
        }
      </div>
    )
  }
}

ModalBody.propTypes = {
  meteorError: PropTypes.string
}
