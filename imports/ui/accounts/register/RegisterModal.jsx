import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

import {successNoty} from '../../../util/noty/noty-defaults.js';
import Modal from '../../components/modal/Modal';
import ModalHeader from '../../components/modal/ModalHeader';
import ModalBody from '../../components/modal/ModalBody';
import ModalFooter from '../../components/modal/ModalFooter';
import RegisterForm from './RegisterForm.jsx';

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      verifyPassword: '',
      emailError: '',
      passwordError: '',
      verifyPasswordError: ''
    };
  }

  onRegisterInputChange = (target) => {
    const {id, value} = target;
    this.setState({[id]: value});
  }

  registerBtnClicked = () => {
    this.resetValidations(this.runValidations)
  }

  resetValidations = (callback) => {
    this.setState({
      emailError: '',
      passwordError: '',
      verifyPasswordError: ''
    }, callback);
  }

  runValidations = () => {
    const {emailEmpty, passwordEmpty, verifyPasswordEmpty} = this.emptyInputFields();
    if (emailEmpty || passwordEmpty || verifyPasswordEmpty) {
      return this.setState({
        emailError: emailEmpty
          ? 'Field is required.'
          : '',
        passwordError: passwordEmpty
          ? 'Field is required.'
          : '',
        verifyPasswordError: verifyPasswordEmpty
          ? 'Field is required.'
          : ''
      });
    } else if (!this.passwordsAreEqual()) {
      return this.setState({
        passwordError: 'Passwords are not identical.',
        verifyPasswordError: 'Passwords are not identical.'
      });
    } else {
      this.register()
    }
  }

  emptyInputFields = () => {
    const {email, password, verifyPassword} = this.state;
    let errorState = {};

    errorState.emailEmpty = email
      ? false
      : true;
    errorState.passwordEmpty = password
      ? false
      : true;
    errorState.verifyPasswordEmpty = verifyPassword
      ? false
      : true;

    return errorState;
  }

  passwordsAreEqual = () => {
    const {password, verifyPassword} = this.state;
    return password === verifyPassword
  }

  register = () => {
    const {email, password} = this.state;

    Accounts.createUser({
      email: email,
      password: password
    }, this.registerCallback);
  }

  registerCallback = (error) => {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $('#registerModal').modal('hide')
      successNoty('Successfuly registered and logged in!');
    }
  }

  render() {
    const registerData = {
      email: this.state.email,
      password: this.state.password,
      verifyPassword: this.state.verifyPassword
    };

    const errors = {
      emailError: this.state.emailError,
      passwordError: this.state.passwordError,
      verifyPasswordError: this.state.verifyPasswordError
    }

    return (
      <Modal modalName="registerModal" onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Register"/>
        <ModalBody meteorError={this.state.meteorError}>
          <RegisterForm onInputChange={this.onRegisterInputChange} userInfo={registerData} errors={errors}/>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary" onClick={this.registerBtnClicked}>Register</button>
        </ModalFooter>
      </Modal>
    )
  }
}

RegisterModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
