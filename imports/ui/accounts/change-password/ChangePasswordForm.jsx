import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ChangePasswordForm extends Component {
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

    const { password, verifyPassword } = this.props.userInfo;
    const { passwordError, verifyPasswordError } = this.props.errors;

    const passwordClasses = passwordError
      ? incorrectClasses
      : correctClasses;
    const verifyPasswordClasses = verifyPasswordError
      ? incorrectClasses
      : correctClasses;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="password" className="form-control-label">Password:</label>
          <input value={password} type="password" className={passwordClasses} id="password" onChange={this.handleInputChange} />
          <div className="invalid-feedback">
            {passwordError}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="verifyPassword" className="form-control-label">Verify password:</label>
          <input value={verifyPassword} type="password" className={verifyPasswordClasses} id="verifyPassword" onChange={this.handleInputChange} />
          <div className="invalid-feedback">
            {verifyPasswordError}
          </div>
        </div>
      </form>
    )
  }
}

ChangePasswordForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    password: PropTypes.string.isRequired,
    verifyPassword: PropTypes.string.isRequired,
  }),
  errors: PropTypes.shape({
    passwordError: PropTypes.string.isRequired,
    verifyPasswordError: PropTypes.string.isRequired,
  }),
}
