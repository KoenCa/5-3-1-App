import React, {Component} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

import SignInModal from '../accounts/sign-in/SignInModal.jsx'
import RegisterModal from '../accounts/register/RegisterModal.jsx'

export default class NoAccountDropdown extends Component {
  constructor(props) {
    super(props);

    this.renderSignInModal = this.renderSignInModal.bind(this);
    this.renderRegisterModal = this.renderRegisterModal.bind(this);
    this.unmountModal = this.unmountModal.bind(this);
  }

  renderSignInModal() {
    render(
      <SignInModal onModalClose={this.unmountModal}/>, document.getElementById('modal'));
  }

  renderRegisterModal() {
    render(
      <RegisterModal onModalClose={this.unmountModal}/>, document.getElementById('modal'));
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
          <button className="dropdown-item" type="button" onClick={this.renderSignInModal}>Sign in</button>
          <button className="dropdown-item" type="button" onClick={this.renderRegisterModal}>Register</button>
        </div>
      </div>
    )
  }
}
