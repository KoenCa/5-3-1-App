import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

import {successNoty} from '../../../util/noty/noty-defaults.js';
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../components/modal/Modal';
import RegisterForm from './RegisterForm.jsx';

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      verifyPassword: '',
    };

    this.formId = 'registerForm';
  }

  onRegisterInputChange = (target) => {
    const {id, value} = target;
    this.setState({[id]: value});
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

    return (
      <Modal modalName="registerModal" onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Register"/>
        <ModalBody meteorError={this.state.meteorError}>
          <RegisterForm onInputChange={this.onRegisterInputChange} register={this.register} formId={this.formId} userInfo={registerData} />
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="submit" form={this.formId} className="btn btn-primary">Register</button>
        </ModalFooter>
      </Modal>
    )
  }
}

RegisterModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
