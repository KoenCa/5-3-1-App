import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ChangeEmailForm extends Component {
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

    const { email, verifyEmail } = this.props.userInfo;
    const { emailError, verifyEmailError } = this.props.errors;

    const emailClasses = emailError
      ? incorrectClasses
      : correctClasses;
    const verifyEmailClasses = verifyEmailError
      ? incorrectClasses
      : correctClasses;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="email" className="form-control-label">Email:</label>
          <input value={email} type="email" className={emailClasses} id="email" onChange={this.handleInputChange} />
          <div className="invalid-feedback">
            {emailError}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="verifyEmail" className="form-control-label">Verify email:</label>
          <input value={verifyEmail} type="email" className={verifyEmailClasses} id="verifyEmail" onChange={this.handleInputChange} />
          <div className="invalid-feedback">
            {verifyEmailError}
          </div>
        </div>
      </form>
    )
  }
}

ChangeEmailForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
    verifyEmail: PropTypes.string.isRequired,
  }),
  errors: PropTypes.shape({
    emailError: PropTypes.string.isRequired,
    verifyEmailError: PropTypes.string.isRequired,
  }),
}
