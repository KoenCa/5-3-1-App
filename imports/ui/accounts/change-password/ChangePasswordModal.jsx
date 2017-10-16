import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

import {successNoty} from '../../../util/noty/noty-defaults';
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../components/modal/Modal';
import ChangePasswordForm from './ChangePasswordForm';

export default class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      verifyPassword: '',
      passwordError: '',
      verifyPasswordError: ''
    };
  }

  onChangePasswordInputChange = (target) => {
    const {id, value} = target;
    this.setState({[id]: value});
  }

  confirmBtnClicked = () => {
    this.resetValidations(this.runValidations)
  }

  resetValidations = (callback) => {
    this.setState({
      passwordError: '',
      verifyPasswordError: ''
    }, callback);
  }

  runValidations = () => {
    const {passwordEmpty, verifyPasswordEmpty} = this.emptyInputFields();

    if (passwordEmpty || verifyPasswordEmpty) {
      return this.setErrorsForEmptyInputFields()
    } else if (!this.passwordsAreEqual()) {
      return this.setErrorsForNonIdenticalPasswords()
    } else {
      this.changePassword()
    }
  }

  emptyInputFields = () => {
    const {password, verifyPassword} = this.state;
    let errorState = {};

    errorState.passwordEmpty = password
      ? false
      : true;
    errorState.verifyPasswordEmpty = verifyPassword
      ? false
      : true;

    return errorState;
  }

  setErrorsForEmptyInputFields = () => {
    const {passwordEmpty, verifyPasswordEmpty} = this.emptyInputFields();

    this.setState({
      passwordError: passwordEmpty
        ? 'Field is required.'
        : '',
      verifyPasswordError: verifyPasswordEmpty
        ? 'Field is required.'
        : ''
    });
  }

  passwordsAreEqual = () => this.state.password === this.state.verifyPassword

  setErrorsForNonIdenticalPasswords = () => {
    this.setState({
      passwordError: 'Passwords are not identical.',
      verifyPasswordError: 'Passwords are not identical.'
    });
  }

  changePassword = () => {
    const {password} = this.state;

    console.log('changePassword');
    // Meteor.call('accounts.changePassword', password, this.changePasswordCallback);
  }

  changePasswordCallback = (error, result) => {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $('#changePasswordModal').modal('hide')
      successNoty('Your password has been changed successfully!');
    }
  }

  render() {
    const changePasswordData = {
      password: this.state.password,
      verifyPassword: this.state.verifyPassword
    };

    const errors = {
      passwordError: this.state.passwordError,
      verifyPasswordError: this.state.verifyPasswordError
    };

    return (
      <Modal modalName="changePasswordModal" onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Change password"/>
        <ModalBody meteorError={this.state.meteorError}>
          <ChangePasswordForm
            onInputChange={this.onChangePasswordInputChange}
            userInfo={changePasswordData}
            errors={errors}
          />
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={this.confirmBtnClicked}>
            Confirm
          </button>
        </ModalFooter>
      </Modal>
    )
  }
}

ChangePasswordModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
