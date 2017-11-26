import {React, expect, sinon, mount} from '../../../../test_packages_imports';
import SignInForm from '../../../../../ui/accounts/sign-in/SignInForm';
import Form from '../../../../../ui/components/forms/Form';

describe('Sign In form', () => {
  let wrapper;

  const formId = 'myForm';
  const userInfo = {
    email: 'jaap@gmail.com',
    password: 'test123'
  };

  beforeEach(() => {
    this.onInputChangeSpy = sinon.spy();
    this.signInSpy = sinon.spy();
    wrapper = mount(
      <SignInForm
        formId={formId} userInfo={userInfo} onInputChange={onInputChangeSpy} signIn={signInSpy}
      />
    );
  });

  afterEach(() => {
    this.onInputChangeSpy.reset();
    this.signInSpy.reset();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.exists(<Form formId={formId} onFormValid={function(){}}/>)).to.be.true;
    expect(wrapper.exists(<input type="email" id="email" required/>)).to.be.true;
    expect(wrapper.exists(<input type="password" id="password" required/>)).to.be.true;
  });

  it('should have the correct state', () => {
    expect(wrapper.find('input#email').props().value).to.eql(userInfo.email);
    expect(wrapper.find('input#password').props().value).to.eql(userInfo.password);
  });

  it('should call the onInputChange method prop when inputs are changed', () => {
    wrapper.find('input#email').simulate('change');
    wrapper.find('input#password').simulate('change');
    expect(this.onInputChangeSpy.calledTwice).to.be.true;
  });

  it('should call signIn method prop when form is valid when submitting', () => {
    wrapper.find(`form#${formId}`).simulate('submit');
    expect(this.signInSpy.calledOnce).to.be.true;
  });

  it('should not call signIn method prop when form is invalid when submitting', () => {
    wrapper.unmount();
    wrapper = mount(
      <SignInForm
        formId={formId} userInfo={{email: 'test', password: 'test'}} signIn={signInSpy}
      />
    );

    wrapper.find(`form#${formId}`).simulate('submit');
    expect(this.signInSpy.notCalled).to.be.true;
  });
});
