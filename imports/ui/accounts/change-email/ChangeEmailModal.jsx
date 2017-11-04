import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

import {successNoty} from '../../../util/noty/noty-defaults';
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../components/modal/Modal';
import ChangeEmailForm from './ChangeEmailForm';

export default class ChangeEmailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      verifyEmail: '',
    };

    this.formId = 'changeEmailForm';
    this.modalName = 'changeEmailModal';
  }

  onChangeEmailInputChange = (target) => {
    const {id, value} = target;
    this.setState({[id]: value});
  }

  changeEmail = () => {
    const {email} = this.state;
    Meteor.call('accounts.changeEmail', email, this.changeEmailCallback);
  }

  changeEmailCallback = (error, result) => {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $(`#${this.modalName}`).modal('hide')
      successNoty('Your email has been changed successfully!');
    }
  }

  render() {
    return (
      <Modal modalName={this.modalName} onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Change email"/>
        <ModalBody meteorError={this.state.meteorError}>
          <ChangeEmailForm
            onInputChange={this.onChangeEmailInputChange} changeEmail={this.changeEmail}
            formId={this.formId} userInfo={{...this.state}}
          />
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="submit" form={this.formId} className="btn btn-primary">Confirm</button>
        </ModalFooter>
      </Modal>
    )
  }
}

ChangeEmailModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
