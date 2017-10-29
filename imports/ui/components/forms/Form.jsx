import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {formIsSubmitted: false};
  }

  formSubmitted = (event) => {
    event.preventDefault()

    if (!this.form.checkValidity()) {
      this.setState({formIsSubmitted: true});
    } else {
      this.props.onFormValid();
    }
  }

  render() {
    const {formId} = this.props;
    const {formIsSubmitted} = this.state;

    return (
      <form
        id={formId} onSubmit={this.formSubmitted} ref={(input) => { this.form = input; }}
        className={formIsSubmitted ? 'was-validated' : ''} noValidate
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
