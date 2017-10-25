import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: true
    };
  }

  formSubmitted = (event) => {
    event.preventDefault()

    if (!this.form.checkValidity()) {
      this.setState({
        formValid: false
      });
    } else {
      this.setState({
        formValid: true
      }, this.props.onFormValid);
    }
  }

  render() {
    return (
      <form
        id={this.props.formId}
        onSubmit={this.formSubmitted}
        ref={(input) => { this.form = input; }}
        className={this.state.formValid ? '' : 'was-validated' }
        noValidate
      >
        {this.props.children}
      </form>
    )
  }
}

Form.propTypes = {
  formId: PropTypes.string.isRequired,
  onFormValid: PropTypes.func.isRequired
}
