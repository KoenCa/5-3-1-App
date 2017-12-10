import {React, expect, sinon, shallow} from '../../../../test_packages_imports';
import {Accounts} from 'meteor/accounts-base';
import RegisterModal from '../../../../../ui/accounts/register/RegisterModal';

describe('Register modal', () => {
  let wrapper, onModalCloseSpy, jQueryStub, wrapperInstance, accountsCreateUserStub;

  const jQueryMockObject = {
    modal: sinon.spy(),
    on: sinon.spy()
  }

  beforeEach(() => {
    onModalCloseSpy = sinon.spy();
    jQueryStub = sinon.stub(window, '$').returns(jQueryMockObject);
    accountsCreateUserStub = sinon.stub(Accounts, 'createUser');

    wrapper = shallow(
      <RegisterModal onModalClose={onModalCloseSpy} />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    jQueryStub.restore();
    accountsCreateUserStub.restore();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('ModalHeader')).to.have.length(1);
    expect(wrapper.find('ModalBody')).to.have.length(1);
    expect(wrapper.find('RegisterForm')).to.have.length(1);
    expect(wrapper.find('ModalFooter')).to.have.length(1);
    expect(wrapper.find({type: 'button'})).to.have.length(1);
    expect(wrapper.find({type: 'submit'})).to.have.length(1);
  });

  it('should have the correct formId', () => {
    expect(wrapperInstance.formId).to.eql('registerForm');
  });


  it('should have the correct modalName', () => {
    expect(wrapperInstance.modalName).to.eql('registerModal');
  });

  context('#onRegisterInputChange', () => {
    it('should set the state based on the target element id and value', () => {
      wrapperInstance.onRegisterInputChange({id: 'testId', value: 'testValue'});
      expect(wrapper.state('testId')).to.eql('testValue');
    });
  });

  context('#register', () => {
    it('should call the correct meteor method when changeEmail component method is called', () => {
      wrapper.setState({email: 'koen@test.com', password: 'secret'});
      wrapperInstance.register();
      expect(accountsCreateUserStub).to.have.been.calledOnce;
      expect(accountsCreateUserStub).to.have.been.calledWith(
        {email: 'koen@test.com', password: 'secret'}, wrapperInstance.registerCallback
      );
    });
  });

  context('#registerCallback', () => {
    it('should set meteorError prop on state if it is called with an error', () => {
      const reason = 'Just because...';
      wrapperInstance.registerCallback({reason: reason});
      expect(wrapper.state('meteorError')).to.eql(reason);
    });

    it('should hide the modal when there is no error', () => {
      wrapperInstance.registerCallback();
      expect(jQueryStub).to.have.been.calledOnce;
      expect(jQueryStub).to.have.been.calledWith('#registerModal');
    });
  });
});
