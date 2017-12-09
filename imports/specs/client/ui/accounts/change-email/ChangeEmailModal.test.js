import {React, Meteor, expect, sinon, shallow, mount} from '../../../../test_packages_imports';
import ChangeEmailModal from '../../../../../ui/accounts/change-email/ChangeEmailModal';

describe('Change email modal', () => {
  let wrapper, onModalCloseSpy, jQueryStub, wrapperInstance, meteorChangeEmailStub;

  const jQueryMockObject = {
    modal: sinon.spy(),
    on: sinon.spy()
  }

  beforeEach(() => {
    onModalCloseSpy = sinon.spy();
    jQueryStub = sinon.stub(window, '$').returns(jQueryMockObject);
    meteorChangeEmailStub = sinon.stub(Meteor, 'call');

    wrapper = shallow(
      <ChangeEmailModal onModalClose={onModalCloseSpy} />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    jQueryStub.restore();
    meteorChangeEmailStub.restore();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('ModalHeader')).to.have.length(1);
    expect(wrapper.find('ModalBody')).to.have.length(1);
    expect(wrapper.find('ChangeEmailForm')).to.have.length(1);
    expect(wrapper.find('ModalFooter')).to.have.length(1);
    expect(wrapper.find({type: 'button'})).to.have.length(1);
    expect(wrapper.find({type: 'submit'})).to.have.length(1);
  });

  it('should have the correct formId', () => {
    expect(wrapperInstance.formId).to.eql('changeEmailForm');
  });


  it('should have the correct modalName', () => {
    expect(wrapperInstance.modalName).to.eql('changeEmailModal');
  });

  context('#onChangeEmailInputChange', () => {
    it('should set the state based on the target element id and value', () => {
      wrapperInstance.onChangeEmailInputChange({id: 'testId', value: 'testValue'});
      expect(wrapper.state('testId')).to.eql('testValue');
    });
  });

  context('#changeEmail', () => {
    it('should call the correct meteor method when changeEmail component method is called', () => {
      wrapper.setState({email: 'koen@test.com'});
      wrapperInstance.changeEmail();
      expect(meteorChangeEmailStub).to.have.been.calledOnce;
      expect(meteorChangeEmailStub).to.have.been.calledWith(
        'accounts.changeEmail', {email: 'koen@test.com'}, wrapperInstance.changeEmailCallback
      );
    });
  });

  context('#changeEmailCallback', () => {
    it('should set meteorError prop on state if it is called with an error', () => {
      const reason = 'Just because...';
      wrapperInstance.changeEmailCallback({reason: reason});
      expect(wrapper.state('meteorError')).to.eql(reason);
    });

    it('should hide the modal when there is no error', () => {
      wrapperInstance.changeEmailCallback();
      expect(jQueryStub).to.have.been.calledOnce;
      expect(jQueryStub).to.have.been.calledWith('#changeEmailModal');
    });
  });
});
