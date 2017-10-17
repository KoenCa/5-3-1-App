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

    const { oldPassword, newPassword, verifyPassword } = this.props.userInfo;
    const { oldPasswordError, newPasswordError, verifyPasswordError } = this.props.errors;

    const oldPasswordClasses = oldPasswordError
      ? incorrectClasses
      : correctClasses;
    const newPasswordClasses = newPasswordError
      ? incorrectClasses
      : correctClasses;
    const verifyPasswordClasses = verifyPasswordError
      ? incorrectClasses
      : correctClasses;

    return (
      <form>
      <div className="form-group">
        <label htmlFor="oldPassword" className="form-control-label">Old password:</label>
        <input value={oldPassword} type="password" className={oldPasswordClasses} id="oldPassword" onChange={this.handleInputChange} />
        <div className="invalid-feedback">
          {oldPasswordError}
        </div>
      </div>
        <div className="form-group">
          <label htmlFor="newPassword" className="form-control-label">New password:</label>
          <input value={newPassword} type="password" className={newPasswordClasses} id="newPassword" onChange={this.handleInputChange} />
          <div className="invalid-feedback">
            {newPasswordError}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="verifyPassword" className="form-control-label">Verify new password:</label>
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
    oldPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    verifyPassword: PropTypes.string.isRequired,
  }),
  errors: PropTypes.shape({
    oldPasswordError: PropTypes.string.isRequired,
    newPasswordError: PropTypes.string.isRequired,
    verifyPasswordError: PropTypes.string.isRequired,
  }),
}
