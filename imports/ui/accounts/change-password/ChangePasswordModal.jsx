import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';

import {successNoty} from '../../../util/noty/noty-defaults';
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../components/modal/Modal';
import ChangePasswordForm from './ChangePasswordForm';

export default class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      verifyPassword: '',
      oldPasswordError: '',
      newPasswordError: '',
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
      oldPasswordError: '',
      newPasswordError: '',
      verifyPasswordError: ''
    }, callback);
  }

  runValidations = () => {
    const {oldPasswordEmpty, newPasswordEmpty, verifyPasswordEmpty} = this.emptyInputFields();

    if (oldPasswordEmpty, newPasswordEmpty || verifyPasswordEmpty) {
      return this.setErrorsForEmptyInputFields()
    } else if (!this.passwordsAreEqual()) {
      return this.setErrorsForNonIdenticalPasswords()
    } else {
      this.changePassword()
    }
  }

  emptyInputFields = () => {
    const {oldPassword, newPassword, verifyPassword} = this.state;
    let errorState = {};

    errorState.oldPasswordEmpty = oldPassword
      ? false
      : true;
    errorState.newPasswordEmpty = newPassword
      ? false
      : true;
    errorState.verifyPasswordEmpty = verifyPassword
      ? false
      : true;

    return errorState;
  }

  setErrorsForEmptyInputFields = () => {
    const { oldPasswordEmpty, newPasswordEmpty, verifyPasswordEmpty} = this.emptyInputFields();

    this.setState({
      oldPasswordError: oldPasswordEmpty
        ? 'Field is required.'
        : '',
      newPasswordError: newPasswordEmpty
        ? 'Field is required.'
        : '',
      verifyPasswordError: verifyPasswordEmpty
        ? 'Field is required.'
        : ''
    });
  }

  passwordsAreEqual = () => this.state.newPassword === this.state.verifyPassword

  setErrorsForNonIdenticalPasswords = () => {
    this.setState({newPasswordError: 'Passwords are not identical.', verifyPasswordError: 'Passwords are not identical.'});
  }

  changePassword = () => {
    const {oldPassword, newPassword} = this.state;
    Accounts.changePassword(oldPassword, newPassword, this.changePasswordCallback);
  }

  changePasswordCallback = (error) => {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $('#changePasswordModal').modal('hide')
      successNoty('Your password has been changed successfully!');
    }
  }

  render() {
    const changePasswordData = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      verifyPassword: this.state.verifyPassword
    };

    const errors = {
      oldPasswordError: this.state.oldPasswordError,
      newPasswordError: this.state.newPasswordError,
      verifyPasswordError: this.state.verifyPasswordError
    };

    return (
      <Modal modalName="changePasswordModal" onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Change password"/>
        <ModalBody meteorError={this.state.meteorError}>
          <ChangePasswordForm onInputChange={this.onChangePasswordInputChange} userInfo={changePasswordData} errors={errors}/>
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
