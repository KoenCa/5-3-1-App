import {React, Meteor, expect, sinon, shallow} from '../../../../test_packages_imports';
import SignInModal from '../../../../../ui/accounts/sign-in/SignInModal';

describe('Sign In modal', () => {
  let wrapper, onModalCloseSpy, jQueryStub, wrapperInstance, meteorLoginStub;

  const jQueryMockObject = {
    modal: sinon.spy(),
    on: sinon.spy()
  }

  beforeEach(() => {
    onModalCloseSpy = sinon.spy();
    jQueryStub = sinon.stub(window, '$').returns(jQueryMockObject);
    meteorLoginStub = sinon.stub(Meteor, 'loginWithPassword');

    wrapper = shallow(
      <SignInModal onModalClose={onModalCloseSpy} />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    jQueryStub.restore();
    meteorLoginStub.restore();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('ModalHeader')).to.have.length(1);
    expect(wrapper.find('ModalBody')).to.have.length(1);
    expect(wrapper.find('SignInForm')).to.have.length(1);
    expect(wrapper.find('ModalFooter')).to.have.length(1);
    expect(wrapper.find({type: 'button'})).to.have.length(1);
    expect(wrapper.find({type: 'submit'})).to.have.length(1);
  });

  it('should have the correct formId', () => {
    expect(wrapperInstance.formId).to.eql('signInForm');
  });

  it('should have the correct modalName', () => {
    expect(wrapperInstance.modalName).to.eql('signInModal');
  });

  context('#onSignInInputChange', () => {
    it('should set the state based on the target element id and value', () => {
      wrapperInstance.onSignInInputChange({id: 'testId', value: 'testValue'});
      expect(wrapper.state('testId')).to.eql('testValue');
    });
  });

  context('#signIn', () => {
    it('should call the correct meteor method when changeEmail component method is called', () => {
      wrapper.setState({email: 'koen@test.com', password: 'secret'});
      wrapperInstance.signIn();
      expect(meteorLoginStub).to.have.been.calledOnce;
      expect(meteorLoginStub).to.have.been.calledWith(
        {email: 'koen@test.com'}, 'secret', wrapperInstance.signInCallback
      );
    });
  });

  context('#signInCallback', () => {
    it('should set meteorError prop on state if it is called with an error', () => {
      const reason = 'Just because...';
      wrapperInstance.signInCallback({reason: reason});
      expect(wrapper.state('meteorError')).to.eql(reason);
    });

    it('should hide the modal when there is no error', () => {
      wrapperInstance.signInCallback();
      expect(jQueryStub).to.have.been.calledOnce;
      expect(jQueryStub).to.have.been.calledWith('#signInModal');
    });
  });
});
