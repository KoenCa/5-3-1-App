import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';

import {successNoty} from '../../../util/noty/noty-defaults';
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../components/modal/Modal';
import ChangePasswordForm from './ChangePasswordForm';

export default class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      verifyPassword: '',
    };

    this.formId = 'changePasswordForm';
    this.modalName = 'changePasswordModal';
  }

  onChangePasswordInputChange = (target) => {
    const {id, value} = target;
    this.setState({[id]: value});
  }

  changePassword = () => {
    const {oldPassword, newPassword} = this.state;
    Accounts.changePassword(oldPassword, newPassword, this.changePasswordCallback);
  }

  changePasswordCallback = (error) => {
    if (error) {
      this.setState({meteorError: error.reason})
    } else {
      $(`#${this.modalName}`).modal('hide')
      successNoty('Your password has been changed successfully!');
    }
  }

  render() {
    return (
      <Modal modalName={this.modalName} onModalClose={this.props.onModalClose}>
        <ModalHeader modalTitle="Change password"/>
        <ModalBody meteorError={this.state.meteorError}>
          <ChangePasswordForm
            onInputChange={this.onChangePasswordInputChange} changePassword={this.changePassword}
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

ChangePasswordModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
