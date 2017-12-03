import {React, expect, sinon, mount} from '../../../../test_packages_imports';
import ChangePasswordForm from '../../../../../ui/accounts/change-password/ChangePasswordForm';
import Form from '../../../../../ui/components/forms/Form';

describe('Change password form', () => {
  let wrapper, onInputChangeSpy, handleInputChange, changePasswordSpy, formIsValidSpy, passwordsAreEqualSpy,
  showPasswordErrorSpy, showPassworValiditySpy, checkEqualPasswordsOnBlurSpy;

  const formId = 'myForm';
  const validUserInfo = {
    oldPassword: 'testing',
    newPassword: 'test123',
    verifyPassword: 'test123'
  };
  const invalidUserInfo = {
    oldPassword: '',
    newPassword: 'test123',
    verifyPassword: 'test123'
  };
  const invalidPasswordsUserInfo = {
    oldPassword: 'testing',
    newPassword: 'test13',
    verifyPassword: 'test123'
  };

  beforeEach(() => {
    onInputChangeSpy = sinon.spy();
    changePasswordSpy = sinon.spy();

    wrapper = mount(
      <ChangePasswordForm
        formId={formId} userInfo={validUserInfo} onInputChange={onInputChangeSpy}
        changePassword={changePasswordSpy}
      />
    );
    const componentInstance = wrapper.instance();

    formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');
    passwordsAreEqualSpy = sinon.spy(componentInstance, 'passwordsAreEqual');
    handleInputChangeSpy = sinon.spy(componentInstance, 'handleInputChange');

    componentInstance.forceUpdate();
  });

  afterEach(() => {
    onInputChangeSpy.reset();
    changePasswordSpy.reset();
    formIsValidSpy.restore();
    passwordsAreEqualSpy.restore();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.find('Form').length).to.eql(1);
    expect(wrapper.find('input#oldPassword').length).to.eql(1);
    expect(wrapper.find('input#newPassword').length).to.eql(1);
    expect(wrapper.find('input#verifyPassword').length).to.eql(1);
  });

  it('should respond to change of the input elements', () => {
    wrapper.find('input#oldPassword').simulate('change');
    wrapper.find('input#newPassword').simulate('change');
    wrapper.find('input#verifyPassword').simulate('change');
    expect(handleInputChangeSpy.calledThrice).to.be.true;
  });

  it('should call the onInputChange method prop when inputs are changed', () => {
    wrapper.find('input#oldPassword').simulate('change');
    wrapper.find('input#newPassword').simulate('change');
    wrapper.find('input#verifyPassword').simulate('change');
    expect(onInputChangeSpy.calledThrice).to.be.true;
  });

  it('should have the correct state', () => {
    expect(wrapper.find('input#oldPassword').props().value).to.eql(validUserInfo.oldPassword);
    expect(wrapper.find('input#newPassword').props().value).to.eql(validUserInfo.newPassword);
    expect(wrapper.find('input#verifyPassword').props().value).to.eql(validUserInfo.verifyPassword);
  });

  context('Submit form with valid data', () => {
    beforeEach(() => {
      wrapper.find(`form#${formId}`).simulate('submit');
    });

    it('should trigger the formIsValid callback method', () => {
      expect(formIsValidSpy.calledOnce).to.be.true;
    });

    it('should check if the passwords are equal for custom validations', () => {
      expect(passwordsAreEqualSpy.calledOnce).to.be.true;
      expect(passwordsAreEqualSpy.returned(true)).to.be.true;
    });

    it('should call the register callback method from the properties', () => {
      expect(changePasswordSpy.calledOnce).to.be.true;
    });
  });


  context('Submit form with invalid data', () => {
    beforeEach(() => {
      onInputChangeSpy = sinon.spy();
      changePasswordSpy = sinon.spy();

      wrapper = mount(
        <ChangePasswordForm
          formId={formId} userInfo={invalidUserInfo} onInputChange={onInputChangeSpy}
          changePassword={changePasswordSpy}
        />
      );
      const componentInstance = wrapper.instance();

      // Spies/stubs for component methods
      formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');
      passwordsAreEqualSpy = sinon.spy(componentInstance, 'passwordsAreEqual');

      // Update wrapper and component instance so spies/stubs are applied
      wrapper.update();
      componentInstance.forceUpdate();

      wrapper.find(`form#${formId}`).simulate('submit');
    });

    afterEach(() => {
      onInputChangeSpy.reset();
      changePasswordSpy.reset();
      formIsValidSpy.restore();
      passwordsAreEqualSpy.restore();
      wrapper.unmount();
    });


    it('should not trigger the formIsValid callback method', () => {
      expect(formIsValidSpy.called).to.be.false;
    });

    it('should not check if the passwords are equal', () => {
      expect(passwordsAreEqualSpy.called).to.be.false;
    });

    it('should not call the register callback method from the properties', () => {
      expect(changePasswordSpy.called).to.be.false;
    });
  });

  context('Submit form with passwords that are not equal', () => {
    beforeEach(() => {
      onInputChangeSpy = sinon.spy();
      changePasswordSpy = sinon.spy();

      wrapper = mount(
        <ChangePasswordForm
          formId={formId} userInfo={invalidPasswordsUserInfo} onInputChange={onInputChangeSpy}
          changePasswordSpy={changePasswordSpy}
        />
      );
      const componentInstance = wrapper.instance();

      // Spies/stubs for component methods
      formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');
      passwordsAreEqualSpy = sinon.spy(componentInstance, 'passwordsAreEqual');
      showPasswordErrorSpy = sinon.spy(componentInstance, 'showPasswordError');
      setCustomValiditySpy = sinon.spy(componentInstance.verifyPasswordInput, 'setCustomValidity');

      // Update wrapper and component instance so spies/stubs are applied
      wrapper.update();
      componentInstance.forceUpdate();

      wrapper.find(`form#${formId}`).simulate('submit');
    });

    afterEach(() => {
      onInputChangeSpy.reset();
      changePasswordSpy.reset();
      formIsValidSpy.restore();
      passwordsAreEqualSpy.restore();
      showPasswordErrorSpy.restore();
      setCustomValiditySpy.restore();
      wrapper.unmount();
    });

    it('should trigger the formIsValid callback method', () => {
      expect(formIsValidSpy.calledOnce).to.be.true;
    });

    it('should check if the passwords are equal', () => {
      expect(passwordsAreEqualSpy.calledOnce).to.be.true;
      expect(passwordsAreEqualSpy.returned(false)).to.be.true;
    });

    it('should show a password error to the user', () => {
      expect(showPasswordErrorSpy.calledOnce).to.be.true;
      expect(setCustomValiditySpy.calledWith('Passwords must match.')).to.be.true;
    });

    it('should not call the changePassword callback method from the properties', () => {
      expect(changePasswordSpy.called).to.be.false;
    });
  });

  context('Blur on verifyPassword input', () => {
    beforeEach(() => {
      onInputChangeSpy = sinon.spy();
      changePasswordSpy = sinon.spy();

      wrapper = mount(
        <ChangePasswordForm
          formId={formId} userInfo={validUserInfo} onInputChange={onInputChangeSpy}
          changePasswordSpy={changePasswordSpy}
        />
      );
      const componentInstance = wrapper.instance();

      // Spies/stubs for component methods
      formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');
      passwordsAreEqualSpy = sinon.spy(componentInstance, 'passwordsAreEqual');
      showPassworValiditySpy = sinon.spy(componentInstance, 'showPassworValidity');
      setCustomValiditySpy = sinon.spy(componentInstance.verifyPasswordInput, 'setCustomValidity');
      checkEqualPasswordsOnBlurSpy = sinon.spy(componentInstance, 'checkEqualPasswordsOnBlur');

      // Update wrapper and component instance so spies/stubs are applied
      wrapper.update();
      componentInstance.forceUpdate();

      wrapper.find('input#verifyPassword').simulate('blur');
    });

    afterEach(() => {
      onInputChangeSpy.reset();
      changePasswordSpy.reset();
      formIsValidSpy.restore();
      passwordsAreEqualSpy.restore();
      showPassworValiditySpy.restore();
      setCustomValiditySpy.restore();
      checkEqualPasswordsOnBlurSpy.restore();
      wrapper.unmount();
    });

    it('should call the correct callback of the onBlur event of the input', () => {
      expect(checkEqualPasswordsOnBlurSpy.calledOnce).to.be.true;
    });

    it('should check if the passwords are equal ', () => {
      expect(passwordsAreEqualSpy.calledOnce).to.be.true;
      expect(passwordsAreEqualSpy.returned(true)).to.be.true;
      expect(setCustomValiditySpy.calledWith('')).to.be.true;
    });

    it('should show that passwords are valid to the user', () => {
      expect(showPassworValiditySpy.calledOnce).to.be.true;
    });
  });
});
