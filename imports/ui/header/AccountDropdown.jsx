import React, {Component} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

import ChangeEmailModal from '../accounts/change-email/ChangeEmailModal.jsx'
import ChangePasswordModal from '../accounts/change-password/ChangePasswordModal.jsx'

export default class NoAccountDropdown extends Component {
  constructor(props) {
    super(props);

    this.renderChangeEmailModal = this.renderChangeEmailModal.bind(this);
    this.renderChangePasswordModal = this.renderChangePasswordModal.bind(this);
    this.unmountModal = this.unmountModal.bind(this);
  }

  renderChangeEmailModal() {
    render(
      <ChangeEmailModal onModalClose={this.unmountModal}/>, document.getElementById('modal'));
  }

  renderChangePasswordModal() {
    render(
      <ChangePasswordModal onModalClose={this.unmountModal}/>, document.getElementById('modal'));
  }

  unmountModal() {
    unmountComponentAtNode(document.getElementById('modal'));
  }

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-light dropdown-toggle" type="button" id="accountMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Account
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="accountMenu">
          <button className="dropdown-item" type="button" onClick={this.renderChangeEmailModal}>Change email</button>
          <button className="dropdown-item" type="button" onClick={this.renderChangePasswordModal}>Change password</button>
        </div>
      </div>
    )
  }
}
