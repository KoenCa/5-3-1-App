import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/forms/Form';

export default class ChangeEmailForm extends Component {

  handleInputChange = (event) => {
    const target = event.target;
    this.props.onInputChange(target);
  }

  checkEqualEmailsOnBlur = () => {
    this.emailsAreEqual() ? this.showEmailValidity() : this.showEmailError()
  }

  formIsValid = () => {
    this.emailsAreEqual() ? this.props.changeEmail() : this.showEmailError();
  }

  emailsAreEqual = () => {
    const {email, verifyEmail} = this.props.userInfo;
    return email === verifyEmail
  }

  showEmailError = () => {
    this.verifyEmailInput.setCustomValidity('Emails must match.');
  }

  showEmailValidity = () => {
    this.verifyEmailInput.setCustomValidity('');
  }

  render() {
    const {formId} = this.props;
    const {email, verifyEmail} = this.props.userInfo;

    return (
      <Form formId={formId} onFormValid={this.formIsValid}>
        <div className="form-group">
          <label htmlFor="email" className="form-control-label">Email:</label>
          <input
            value={email} type="email" className="form-control" id="email"
            onChange={this.handleInputChange} required
          />
          <div className="invalid-feedback">Please provide a valid email.</div>
        </div>
        <div className="form-group">
          <label htmlFor="verifyEmail" className="form-control-label">Verify email:</label>
          <input
            value={verifyEmail} type="email" className="form-control" id="verifyEmail"
            onChange={this.handleInputChange} ref={(input) => {this.verifyEmailInput = input;}}
            onBlur={this.checkEqualEmailsOnBlur} required
          />
          <div className="invalid-feedback">Emails must match.</div>
        </div>
      </Form>
    )
  }
}

ChangeEmailForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
    verifyEmail: PropTypes.string.isRequired,
  }),
}
