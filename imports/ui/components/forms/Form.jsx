import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {

  componentDidMount() {
    this.form = document.getElementById(this.props.formId);
  }

  formSubmitted = (event) => {
    event.preventDefault()

    if (!this.form.checkValidity()) {
      this.setFormErrors()
    } else {
      this.setFormErrors()
      this.props.onFormValid()
    }
  }

  setFormErrors = () => {
    const formInputs = this.form.getElementsByTagName('input')
    for (input of formInputs) {
      this.setValidityOfInput(input, input.checkValidity())
    }
  }

  setValidityOfInput = (input, isValid) => {
    isValid
      ? input.classList.remove('is-invalid')
      : input.classList.add('is-invalid')
  }

  render() {
    return (
      <form id={this.props.formId} onSubmit={this.formSubmitted} noValidate>
        {this.props.children}
      </form>
    )
  }
}

Form.propTypes = {
  formId: PropTypes.string.isRequired,
  onFormValid: PropTypes.func.isRequired
}
