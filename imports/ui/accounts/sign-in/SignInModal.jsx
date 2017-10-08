import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

import {successNoty} from '../../../util/noty/noty-defaults';
import SignInForm from './SignInForm.jsx';

export default class SignInModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    };

    this.onSignInInputChange = this.onSignInInputChange.bind(this);
    this.signInBtnClicked = this.signInBtnClicked.bind(this);
    this.resetValidations = this.resetValidations.bind(this);
    this.runValidations = this.runValidations.bind(this);
    this.emptyInputFields = this.emptyInputFields.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signInCallback = this.signInCallback.bind(this);
  }

  componentDidMount() {
    $('#signInModal').on('hidden.bs.modal', this.props.onModalClose);
    $('#signInModal').modal()
  }

  onSignInInputChange(target) {
    const {id, value} = target;

    this.setState({[id]: value});
  }

  signInBtnClicked() {
    this.resetValidations(this.runValidations)
  }

  resetValidations(callback) {
    this.setState({
      emailError: '',
      passwordError: ''
    }, callback);
  }

  runValidations() {
    const {emailEmpty, passwordEmpty} = this.emptyInputFields();
    if (emailEmpty || passwordEmpty) {
      return this.setState({
        emailError: emailEmpty
          ? 'Field is required.'
          : '',
        passwordError: passwordEmpty
          ? 'Field is required.'
          : ''
      });
    } else {
      this.signIn()
    }
  }

  emptyInputFields() {
    const {email, password} = this.state;
    let errorState = {};

    errorState.emailEmpty = email
      ? false
      : true;
    errorState.passwordEmpty = password
      ? false
      : true;

    return errorState;
  }

  signIn() {
    const {email, password} = this.state;

    Meteor.loginWithPassword({
      email: email
    }, password, this.signInCallback);
  }

  signInCallback(error) {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $('#signInModal').modal('hide')
      successNoty('You are logged in!');
    }
  }

  render() {
    const signInData = {
      email: this.state.email,
      password: this.state.password
    };

    const errors = {
      emailError: this.state.emailError,
      passwordError: this.state.passwordError
    };

    return (
      <div className="modal fade" id="signInModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign in</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <SignInForm onInputChange={this.onSignInInputChange} userInfo={signInData} errors={errors}/>

              <a href="javascript:void(0);">Forgot password?</a>

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
              <button type="button" className="btn btn-primary" onClick={this.signInBtnClicked}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SignInModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
