import {React, Meteor, expect, sinon, shallow, mount} from '../../../../test_packages_imports';
import RegisterForm from '../../../../../ui/accounts/register/RegisterForm';
import Form from '../../../../../ui/components/forms/Form';

describe('Register form', () => {
  let wrapper;

  const formId = 'myForm';
  const userInfo = {
    email: 'jaap@gmail.com',
    password: 'test123',
    verifyPassword: 'test123'
  };

  beforeEach(() => {
    this.onInputChangeSpy = sinon.spy();
    this.registerSpy = sinon.spy();
    wrapper = mount(
      <RegisterForm
        formId={formId} userInfo={userInfo} onInputChange={onInputChangeSpy} register={registerSpy}
      />
    );
  });

  afterEach(() => {
    this.onInputChangeSpy.reset();
    this.registerSpy.reset();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.find('Form').length).to.eql(1);
    expect(wrapper.find('input#email').length).to.eql(1);
    expect(wrapper.find('input#password').length).to.eql(1);
    expect(wrapper.find('input#verifyPassword').length).to.eql(1);
  });

  it('should have the correct state', () => {
    expect(wrapper.find('input#email').props().value).to.eql(userInfo.email);
    expect(wrapper.find('input#password').props().value).to.eql(userInfo.password);
    expect(wrapper.find('input#verifyPassword').props().value).to.eql(userInfo.verifyPassword);
  });

  it('should call the onInputChange method prop when inputs are changed', () => {
    wrapper.find('input#email').simulate('change');
    wrapper.find('input#password').simulate('change');
    wrapper.find('input#verifyPassword').simulate('change');
    expect(this.onInputChangeSpy.calledThrice).to.be.true;
  });

  it('should call register method prop when form is valid when submitting', () => {
    wrapper.find(`form#${formId}`).simulate('submit');
    expect(this.registerSpy.calledOnce).to.be.true;
  });

  it('should not call register method prop when form is invalid when submitting', () => {
    wrapper.unmount();
    wrapper = mount(
      <RegisterForm
        formId={formId} userInfo={{email: 'test', password: 'test'}} register={registerSpy}
      />
    );

    wrapper.find(`form#${formId}`).simulate('submit');
    expect(this.registerSpy.notCalled).to.be.true;
  });
});
