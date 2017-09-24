import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import SignInModal from './SignInModal.jsx'
import RegisterModal from './RegisterModal.jsx'

export default class AccountDropdown extends Component {
    renderSignInModal() {
        render(<SignInModal onModalClose={this.closeModal} />, document.getElementById('modal'));   
    }

    renderRegisterModal() {
        render(<RegisterModal onModalClose={this.closeModal} />, document.getElementById('modal'));   
    }

    closeModal() {
        unmountComponentAtNode(document.getElementById('modal'));
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button" id="accountMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="accountMenu">
                    <button className="dropdown-item" type="button" onClick={this.renderSignInModal.bind(this)}>Sign in</button>
                    <button className="dropdown-item" type="button" onClick={this.renderRegisterModal.bind(this)}>Register</button>
                </div>
            </div>
        )
    }
}