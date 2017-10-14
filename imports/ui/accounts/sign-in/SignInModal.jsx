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
      password: '',
      emailError: '',
      passwordError: ''
    };
  }

  onSignInInputChange = (target) => {
    const {id, value} = target;
    this.setState({[id]: value});
  }

  signInBtnClicked = () => {
    this.resetValidations(this.runValidations)
  }

  resetValidations = (callback) => {
    this.setState({
      emailError: '',
      passwordError: ''
    }, callback);
  }

  runValidations = () => {
    const {emailEmpty, passwordEmpty} = this.emptyInputFields();
    if (emailEmpty || passwordEmpty) {
      return this.setState({
        emailError: emailEmpty
          ? 'Field is required.'
          : '',
        passwordError: passwordEmpty
          ? 'Field is required.'
          : ''
      });
    } else {
      this.signIn()
    }
  }

  emptyInputFields = () => {
    const {email, password} = this.state;
    let errorState = {};

    errorState.emailEmpty = email
      ? false
      : true;
    errorState.passwordEmpty = password
      ? false
      : true;

    return errorState;
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
      $('#signInModal').modal('hide')
      successNoty('You are logged in!');
    }
  }

  render() {
    const signInData = {
      email: this.state.email,
      password: this.state.password
    };

    const errors = {
      emailError: this.state.emailError,
      passwordError: this.state.passwordError
    };

    return (
      <Modal modalName="signInModal" onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Sign in"/>
        <ModalBody meteorError={this.state.meteorError}>
          <SignInForm onInputChange={this.onSignInInputChange} userInfo={signInData} errors={errors}/>
          <a href="javascript:void(0);">Forgot password?</a>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary" onClick={this.signInBtnClicked}>Sign in</button>
        </ModalFooter>
      </Modal>
    )
  }
}

SignInModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
