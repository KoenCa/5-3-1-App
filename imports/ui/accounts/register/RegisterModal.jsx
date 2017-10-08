import React, {Component} from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

import { successNoty } from '../../../util/noty/noty-defaults.js';
import RegisterForm from './RegisterForm.jsx';

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      verifyPassword: '',
      emailError: '',
      passwordError: '',
      verifyPasswordError: ''
    };

    this.onRegisterInputChange = this.onRegisterInputChange.bind(this);
    this.registerBtnClicked = this.registerBtnClicked.bind(this);
    this.resetValidations = this.resetValidations.bind(this);
    this.runValidations = this.runValidations.bind(this);
    this.register = this.register.bind(this);
    this.emptyInputFields = this.emptyInputFields.bind(this);
    this.passwordsAreEqual = this.passwordsAreEqual.bind(this);
    this.registerCallback = this.registerCallback.bind(this);
  }

  componentDidMount() {
    $('#registerModal').on('hidden.bs.modal', this.props.onModalClose);
    $('#registerModal').modal();
  }

  onRegisterInputChange(target) {
    const id = target.id;
    const value = target.value;

    this.setState({[id]: value});
  }

  registerBtnClicked() {
    this.resetValidations(this.runValidations)
  }

  resetValidations(callback) {
    this.setState({
      emailError: '',
      passwordError: '',
      verifyPasswordError: ''
    }, callback);
  }

  runValidations() {
    const { emailEmpty, passwordEmpty, verifyPasswordEmpty } = this.emptyInputFields();
    if (emailEmpty || passwordEmpty || verifyPasswordEmpty) {
      return this.setState({
        emailError: emailEmpty ? 'Field is required.' : '',
        passwordError: passwordEmpty ? 'Field is required.' : '',
        verifyPasswordError: verifyPasswordEmpty ? 'Field is required.' : ''
      });
    } else if (!this.passwordsAreEqual()) {
      return this.setState({
        passwordError: 'Passwords are not identical.',
        verifyPasswordError: 'Passwords are not identical.',
      });
    } else {
      this.register()
    }
  }

  emptyInputFields() {
    const { email, password, verifyPassword } = this.state;
    let errorState = {};

    errorState.emailEmpty = email ? false : true;
    errorState.passwordEmpty = password ? false : true;
    errorState.verifyPasswordEmpty = verifyPassword ? false : true;

    return errorState;
  }

  passwordsAreEqual() {
    const { password, verifyPassword } = this.state;

    return password === verifyPassword
      ? true
      : false
  }

  register() {
    const {email, password} = this.state;

    Accounts.createUser({
      email: email,
      password: password
    }, this.registerCallback);
  }

  registerCallback(error) {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $('#registerModal').modal('hide')
      successNoty('Successfuly registered and logged in!');
    }
  }

  render() {
    const registerData = {
      email: this.state.email,
      password: this.state.password,
      verifyPassword: this.state.verifyPassword
    };

    const errors = {
      emailError: this.state.emailError,
      passwordError: this.state.passwordError,
      verifyPasswordError: this.state.verifyPasswordError
    }

    return (
      <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <RegisterForm onInputChange={this.onRegisterInputChange} userInfo={registerData} errors={errors}/>
              {this.state.meteorError && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                {this.state.meteorError}
              </div>
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.registerBtnClicked}>Register</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RegisterModal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
}
