import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

import {successNoty} from '../../../util/noty/noty-defaults';
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../components/modal/Modal';
import SignInForm from './SignInForm.jsx';

export default class SignInModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.formId = 'signInForm';
    this.modalName = 'signInModal';
  }

  onSignInInputChange = (target) => {
    const {id, value} = target;
    this.setState({[id]: value});
  }

  signIn = () => {
    const {email, password} = this.state;

    Meteor.loginWithPassword({
      email: email
    }, password, this.signInCallback);
  }

  signInCallback = (error) => {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $(`#${this.modalName}`).modal('hide')
      successNoty('You are logged in!');
    }
  }

  render() {
    const signInData = {
      email: this.state.email,
      password: this.state.password
    };

    return (
      <Modal modalName={this.modalName} onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Sign in"/>
        <ModalBody meteorError={this.state.meteorError}>
          <SignInForm onInputChange={this.onSignInInputChange} signIn={this.signIn} formId={this.formId} userInfo={signInData} />
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="submit" form={this.formId} className="btn btn-primary">Sign in</button>
        </ModalFooter>
      </Modal>
    )
  }
}

SignInModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
