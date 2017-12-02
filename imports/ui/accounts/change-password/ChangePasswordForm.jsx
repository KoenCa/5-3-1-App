import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/forms/Form';

export default class ChangePasswordForm extends Component {

  handleInputChange = (event) => {
    const target = event.target;
    this.props.onInputChange(target);
  }

  checkEqualPasswordsOnBlur = () => {
    this.passwordsAreEqual() ? this.showPassworValidity() : this.showPasswordError()
  }

  formIsValid = () => {
    this.passwordsAreEqual() ? this.props.changePassword() : this.showPasswordError();
  }

  passwordsAreEqual = () => {
    const {newPassword, verifyPassword} = this.props.userInfo;
    return newPassword === verifyPassword;
  }

  showPasswordError = () => {
    this.verifyPasswordInput.setCustomValidity('Passwords must match.');
  }

  showPassworValidity = () => {
    this.verifyPasswordInput.setCustomValidity('');
  }

  render() {
    const {formId} = this.props;
    const {oldPassword, newPassword, verifyPassword} = this.props.userInfo;

    return (
      <Form formId={formId} onFormValid={this.formIsValid}>
        <div className="form-group">
          <label htmlFor="oldPassword" className="form-control-label">Old password:</label>
          <input
            value={oldPassword} type="password" className="form-control" id="oldPassword"
            onChange={this.handleInputChange} required
          />
          <div className="invalid-feedback">Please provide your old password.</div>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword" className="form-control-label">New password:</label>
          <input
            value={newPassword} type="password" className="form-control" id="newPassword"
            onChange={this.handleInputChange} required
          />
          <div className="invalid-feedback">Please provide your new password.</div>
        </div>
        <div className="form-group">
          <label htmlFor="verifyPassword" className="form-control-label">
            Verify new password:
          </label>
          <input
            value={verifyPassword} type="password" className="form-control" id="verifyPassword"
            onChange={this.handleInputChange} ref={(input) => {this.verifyPasswordInput = input;}}
            onBlur={this.checkEqualPasswordsOnBlur} required
          />
          <div className="invalid-feedback">Passwords must match.</div>
        </div>
      </Form>
    )
  }
}

ChangePasswordForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    oldPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    verifyPassword: PropTypes.string.isRequired,
  }),
}
