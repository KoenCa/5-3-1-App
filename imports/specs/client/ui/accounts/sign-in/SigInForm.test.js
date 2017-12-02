import {React, expect, sinon, mount} from '../../../../test_packages_imports';
import SignInForm from '../../../../../ui/accounts/sign-in/SignInForm';
import Form from '../../../../../ui/components/forms/Form';

describe('Sign In form', () => {
  let wrapper, onInputChangeSpy, signInSpy, handleInputChangeSpy, formIsValidSpy;

  const formId = 'myForm';
  const userInfo = {
    email: 'jaap@gmail.com',
    password: 'test123'
  };

  beforeEach(() => {
    onInputChangeSpy = sinon.spy();
    signInSpy = sinon.spy();
    wrapper = mount(
      <SignInForm
        formId={formId} userInfo={userInfo} onInputChange={onInputChangeSpy} signIn={signInSpy}
      />
    );
    const componentInstance = wrapper.instance();

    handleInputChangeSpy = sinon.spy(componentInstance, 'handleInputChange');
    formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');

    componentInstance.forceUpdate();
  });

  afterEach(() => {
    onInputChangeSpy.reset();
    signInSpy.reset();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.find('Form').length).to.eql(1);
    expect(wrapper.find('input#email').length).to.eql(1);
    expect(wrapper.find('input#password').length).to.eql(1);
  });

  it('should respond to change of the input elements', () => {
    wrapper.find('input#email').simulate('change');
    wrapper.find('input#password').simulate('change');
    expect(handleInputChangeSpy.calledTwice).to.be.true;
  });

  it('should call the onInputChange method prop when inputs are changed', () => {
    wrapper.find('input#email').simulate('change');
    wrapper.find('input#password').simulate('change');
    expect(onInputChangeSpy.calledTwice).to.be.true;
  });

  it('should have the correct state', () => {
    expect(wrapper.find('input#email').props().value).to.eql(userInfo.email);
    expect(wrapper.find('input#password').props().value).to.eql(userInfo.password);
  });

  it('should call signIn method prop when form is valid when submitting', () => {
    wrapper.find(`form#${formId}`).simulate('submit');
    expect(formIsValidSpy.calledOnce).to.be.true;
    expect(signInSpy.calledOnce).to.be.true;
  });

  it('should not call signIn method prop when form is invalid when submitting', () => {
    wrapper.unmount();
    wrapper = mount(
      <SignInForm
        formId={formId} userInfo={{email: 'test', password: 'test'}} signIn={signInSpy}
      />
    );

    wrapper.find(`form#${formId}`).simulate('submit');
    expect(formIsValidSpy.notCalled).to.be.true;
    expect(signInSpy.notCalled).to.be.true;
  });
});
