import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

import {successNoty} from '../../../util/noty/noty-defaults';
import Modal from '../../components/modal/Modal';
import ModalHeader from '../../components/modal/ModalHeader';
import ModalBody from '../../components/modal/ModalBody';
import ModalFooter from '../../components/modal/ModalFooter';
import ChangeEmailForm from './ChangeEmailForm';

export default class ChangeEmailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      verifyEmail: '',
      emailError: '',
      verifyEmailError: ''
    };
  }

  onChangeEmailInputChange = (target) => {
    const {id, value} = target;
    this.setState({[id]: value});
  }

  confirmBtnClicked = () => {
    this.resetValidations(this.runValidations)
  }

  resetValidations = (callback) => {
    this.setState({
      emailError: '',
      verifyEmailError: ''
    }, callback);
  }

  runValidations = () => {
    const {emailEmpty, verifyEmailEmpty} = this.emptyInputFields();

    if (emailEmpty || verifyEmailEmpty) {
      return this.setErrorsForEmptyInputFields()
    } else if (!this.emailsAreEqual()) {
      return this.setErrorsForNonIdenticalEmails()
    } else {
      this.changeEmail()
    }
  }

  emptyInputFields = () => {
    const {email, verifyEmail} = this.state;
    let errorState = {};

    errorState.emailEmpty = email
      ? false
      : true;
    errorState.verifyEmailEmpty = verifyEmail
      ? false
      : true;

    return errorState;
  }

  setErrorsForEmptyInputFields = () => {
    const {emailEmpty, verifyEmailEmpty} = this.emptyInputFields();

    this.setState({
      emailError: emailEmpty
        ? 'Field is required.'
        : '',
      verifyEmailError: verifyEmailEmpty
        ? 'Field is required.'
        : ''
    });
  }

  emailsAreEqual = () => {
    const {email, verifyEmail} = this.state;
    return email === verifyEmail
  }

  setErrorsForNonIdenticalEmails = () => {
    this.setState({emailError: 'Emails are not identical.', verifyEmailError: 'Emails are not identical.'});
  }

  changeEmail = () => {
    const {email} = this.state;

    Meteor.call('accounts.changeEmail', email, this.changeEmailCallback);
  }

  changeEmailCallback = (error, result) => {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $('#changeEmailModal').modal('hide')
      successNoty('Your email has been changed successfully!');
    }
  }

  render() {
    const changeEmailData = {
      email: this.state.email,
      verifyEmail: this.state.verifyEmail
    };

    const errors = {
      emailError: this.state.emailError,
      verifyEmailError: this.state.verifyEmailError
    };

    return (
      <Modal modalName="changeEmailModal" onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Change email"/>
        <ModalBody meteorError={this.state.meteorError}>
          <ChangeEmailForm onInputChange={this.onChangeEmailInputChange} userInfo={changeEmailData} errors={errors}/>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary" onClick={this.confirmBtnClicked}>Confirm</button>
        </ModalFooter>
      </Modal>
    )
  }
}

ChangeEmailModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
