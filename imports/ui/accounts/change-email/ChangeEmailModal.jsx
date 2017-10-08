import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

import {successNoty} from '../../../util/noty/noty-defaults';
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

    this.onChangeEmailInputChange = this.onChangeEmailInputChange.bind(this);
    this.confirmBtnClicked = this.confirmBtnClicked.bind(this);
    this.resetValidations = this.resetValidations.bind(this);
    this.runValidations = this.runValidations.bind(this);
    this.emptyInputFields = this.emptyInputFields.bind(this);
    this.setErrorsForEmptyInputFields = this.setErrorsForEmptyInputFields.bind(this);
    this.emailsAreEqual = this.emailsAreEqual.bind(this);
    this.setErrorsForNonIdenticalEmails = this.setErrorsForNonIdenticalEmails.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeEmailCallback = this.changeEmailCallback.bind(this);
  }

  componentDidMount() {
    $('#changeEmailModal').on('hidden.bs.modal', this.props.onModalClose);
    $('#changeEmailModal').modal()
  }

  onChangeEmailInputChange(target) {
    const {id, value} = target;

    this.setState({[id]: value});
  }

  confirmBtnClicked() {
    this.resetValidations(this.runValidations)
  }

  resetValidations(callback) {
    this.setState({
      emailError: '',
      verifyEmailError: ''
    }, callback);
  }

  runValidations() {
    const {emailEmpty, verifyEmailEmpty} = this.emptyInputFields();

    if (emailEmpty || verifyEmailEmpty) {
      return this.setErrorsForEmptyInputFields()
    } else if (!this.emailsAreEqual()) {
      return this.setErrorsForNonIdenticalEmails()
    } else {
      this.changeEmail()
    }
  }

  emptyInputFields() {
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

  setErrorsForEmptyInputFields() {
    const { emailEmpty, verifyEmailEmpty } = this.emptyInputFields();

    this.setState({
      emailError: emailEmpty
        ? 'Field is required.'
        : '',
      verifyEmailError: verifyEmailEmpty
        ? 'Field is required.'
        : ''
    });
  }

  emailsAreEqual() {
    const { email, verifyEmail } = this.state;

    return email === verifyEmail
      ? true
      : false
  }

  setErrorsForNonIdenticalEmails() {
    this.setState({
      emailError: 'Emails are not identical.',
      verifyEmailError: 'Emails are not identical.',
    });
  }

  changeEmail() {
    const {email} = this.state;

    Meteor.call('accounts.changeEmail', email, this.changeEmailCallback);
  }

  changeEmailCallback(error, result) {
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
      <div className="modal fade" id="changeEmailModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change email</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ChangeEmailForm onInputChange={this.onChangeEmailInputChange} userInfo={changeEmailData} errors={errors}/>

              {this.state.meteorError &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  {this.state.meteorError}
                </div>
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.confirmBtnClicked}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ChangeEmailModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
