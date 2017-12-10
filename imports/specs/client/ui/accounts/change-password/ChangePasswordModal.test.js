import {React, expect, sinon, shallow} from '../../../../test_packages_imports';
import {Accounts} from 'meteor/accounts-base';
import ChangePasswordModal from '../../../../../ui/accounts/change-password/ChangePasswordModal';

describe('Change password modal', () => {
  let wrapper, onModalCloseSpy, jQueryStub, wrapperInstance, accountsChangePasswordStub;

  const jQueryMockObject = {
    modal: sinon.spy(),
    on: sinon.spy()
  }

  beforeEach(() => {
    onModalCloseSpy = sinon.spy();
    jQueryStub = sinon.stub(window, '$').returns(jQueryMockObject);
    accountsChangePasswordStub = sinon.stub(Accounts, 'changePassword');

    wrapper = shallow(
      <ChangePasswordModal onModalClose={onModalCloseSpy} />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    jQueryStub.restore();
    accountsChangePasswordStub.restore();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('ModalHeader')).to.have.length(1);
    expect(wrapper.find('ModalBody')).to.have.length(1);
    expect(wrapper.find('ChangePasswordForm')).to.have.length(1);
    expect(wrapper.find('ModalFooter')).to.have.length(1);
    expect(wrapper.find({type: 'button'})).to.have.length(1);
    expect(wrapper.find({type: 'submit'})).to.have.length(1);
  });

  it('should have the correct formId', () => {
    expect(wrapperInstance.formId).to.eql('changePasswordForm');
  });


  it('should have the correct modalName', () => {
    expect(wrapperInstance.modalName).to.eql('changePasswordModal');
  });

  context('#onChangePasswordInputChange', () => {
    it('should set the state based on the target element id and value', () => {
      wrapperInstance.onChangePasswordInputChange({id: 'testId', value: 'testValue'});
      expect(wrapper.state('testId')).to.eql('testValue');
    });
  });

  context('#changePassword', () => {
    it('should call the correct meteor method when changeEmail component method is called', () => {
      wrapper.setState({oldPassword: 'testOld', newPassword: 'testNew'});
      wrapperInstance.changePassword();
      expect(accountsChangePasswordStub).to.have.been.calledOnce;
      expect(accountsChangePasswordStub).to.have.been.calledWith(
        'testOld', 'testNew', wrapperInstance.changePasswordCallback
      );
    });
  });

  context('#changePasswordCallback', () => {
    it('should set meteorError prop on state if it is called with an error', () => {
      const reason = 'Just because...';
      wrapperInstance.changePasswordCallback({reason: reason});
      expect(wrapper.state('meteorError')).to.eql(reason);
    });

    it('should hide the modal when there is no error', () => {
      wrapperInstance.changePasswordCallback();
      expect(jQueryStub).to.have.been.calledOnce;
      expect(jQueryStub).to.have.been.calledWith('#changePasswordModal');
    });
  });
});
