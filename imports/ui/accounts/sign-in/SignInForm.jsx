import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

import Form from '../../components/forms/Form';

export default class SignInForm extends Component {

  handleInputChange = (event) => {
    const target = event.target;
    this.props.onInputChange(target);
  }

  formIsValid = () => {
    this.props.signIn()
  }

  forgotPassword = () => {
    const email = this.props.userInfo.email;
    Accounts.forgotPassword({email: email});
  }

  render() {
    const {formId} = this.props;
    const {email, password} = this.props.userInfo;

    return (
      <Form formId={formId} onFormValid={this.formIsValid}>
        <div className="form-group">
          <label htmlFor="email" className="form-control-label">Email:</label>
          <input
            value={email} type="email" className="form-control" id="email"
            onChange={this.handleInputChange} required
          />
          <div className="invalid-feedback"> Please provide a valid email.</div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-control-label">Password:</label>
          <input
            value={password} type="password" className="form-control" id="password"
            onChange={this.handleInputChange} required
          />
          <div className="invalid-feedback">Please provide a valid password.</div>
        </div>
        <a onClick={this.forgotPassword} href="javascript:void(0);">Forgot password?</a>
      </Form>
    )
  }
}

SignInForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
}
