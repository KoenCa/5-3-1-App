import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.props.onInputChange(target);
  }

  render() {
    const correctClasses = 'form-control'
    const incorrectClasses = 'form-control is-invalid'

    const { email, password, verifyPassword } = this.props.userInfo;
    const { emailError, passwordError, verifyPasswordError } = this.props.errors;

    const emailClasses = emailError
      ? incorrectClasses
      : correctClasses;
    const passwordClasses = passwordError
      ? incorrectClasses
      : correctClasses;
    const verifyPasswordClasses = verifyPasswordError
      ? incorrectClasses
      : correctClasses;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="email" className="form-control-label">Email:</label>
          <input value={email} type="email" className={emailClasses} id="email" onChange={this.handleInputChange}/>
          <div className="invalid-feedback">
            {emailError}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-control-label">Password:</label>
          <input value={password} type="password" className={passwordClasses} id="password" onChange={this.handleInputChange}/>
          <div className="invalid-feedback">
            {passwordError}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="verifyPassword" className="form-control-label">Verify password:</label>
          <input value={verifyPassword} type="password" className={verifyPasswordClasses} id="verifyPassword" onChange={this.handleInputChange}/>
          <div className="invalid-feedback">
            {verifyPasswordError}
          </div>
        </div>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    verifyPassword: PropTypes.string.isRequired,
  }),
  errors: PropTypes.shape({
    emailError: PropTypes.string.isRequired,
    passwordError: PropTypes.string.isRequired,
    verifyPasswordError: PropTypes.string.isRequired,
  }),
}
