import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/forms/Form';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }

  handleInputChange = (event) => {
    const target = event.target;
    this.props.onInputChange(target);
  }

  checkEqualPasswordsOnBlur = () => {
    this.passwordsAreEqual()
      ? this.showPassworValidity()
      : this.showPasswordError()
  }

  formIsValid = () => {
    this.passwordsAreEqual()
      ? this.props.register()
      : this.showPasswordError();
  }

  passwordsAreEqual = () => {
    const {password, verifyPassword} = this.props.userInfo;
    return password === verifyPassword;
  }

  showPasswordError = () => {
    this.verifyPasswordInput.setCustomValidity('Passwords must match.')
  }

  showPassworValidity = () => {
    this.verifyPasswordInput.setCustomValidity('')
  }

  render() {
    const {formId} = this.props;
    const {email, password, verifyPassword} = this.props.userInfo;

    return (
      <Form formId={formId} onFormValid={this.formIsValid}>
        <div className="form-group">
          <label htmlFor="email" className="form-control-label">Email:</label>
          <input
            value={email} type="email" className="form-control" id="email"
            onChange={this.handleInputChange} required
          />
          <div className="invalid-feedback">
            Please provide a valid email.
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-control-label">Password:</label>
          <input
            value={password} type="password" className="form-control" id="password"
            onChange={this.handleInputChange} ref={(input) => {this.passwordInput = input;}}
            required
          />
          <div className="invalid-feedback">
            Please provide a valid password.
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="verifyPassword" className="form-control-label">Verify password:</label>
          <input
            value={verifyPassword} type="password" className="form-control" id="verifyPassword"
            onChange={this.handleInputChange} ref={(input) => {this.verifyPasswordInput = input;}}
            onBlur={this.checkEqualPasswordsOnBlur} required
          />
          <div className="invalid-feedback">
            Passwords must match.
          </div>
        </div>
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    verifyPassword: PropTypes.string.isRequired,
  })
}
