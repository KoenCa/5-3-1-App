import {React, Meteor, expect, sinon, shallow, mount} from '../../../../test_packages_imports';
import ChangeEmailForm from '../../../../../ui/accounts/change-email/ChangeEmailForm';
import Form from '../../../../../ui/components/forms/Form';

describe('Change email form', () => {
  let wrapper, onInputChangeSpy, changeEmailSpy, formIsValidSpy, emailsAreEqualSpy,
  showEmailErrorSpy, showEmailValiditySpy, checkEqualEmailsOnBlurSpy;

  const formId = 'myForm';
  const validUserInfo = {
    email: 'jaap@gmail.com',
    verifyEmail: 'jaap@gmail.com'
  };
  const invalidUserInfo = {
    email: 'jaap',
    verifyEmail: 'jaap@gmail.com'
  };
  const invalidPasswordsUserInfo = {
    email: 'jaap@gmail.com',
    verifyEmail: 'koen@gmail.com'
  };

  beforeEach(() => {
    onInputChangeSpy = sinon.spy();
    changeEmailSpy = sinon.spy();

    wrapper = mount(
      <ChangeEmailForm
        formId={formId} userInfo={validUserInfo} onInputChange={onInputChangeSpy}
        changeEmail={changeEmailSpy}
      />
    );
    const componentInstance = wrapper.instance();

    // Spies/stubs for component methods
    formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');
    emailsAreEqualSpy = sinon.spy(componentInstance, 'emailsAreEqual');

    // Update wrapper and component instance so spies/stubs are applied
    wrapper.update();
    componentInstance.forceUpdate();
  });

  afterEach(() => {
    onInputChangeSpy.reset();
    changeEmailSpy.reset();
    formIsValidSpy.restore();
    emailsAreEqualSpy.restore();
    wrapper.unmount();
  });

  it('should contain the correct elements', () => {
    expect(wrapper.find('Form').length).to.eql(1);
    expect(wrapper.find('input#email').length).to.eql(1);
    expect(wrapper.find('input#verifyEmail').length).to.eql(1);
  });

  it('should have the correct state', () => {
    expect(wrapper.find('input#email').props().value).to.eql(validUserInfo.email);
    expect(wrapper.find('input#verifyEmail').props().value).to.eql(validUserInfo.verifyEmail);
  });

  it('should call the onInputChange method prop when inputs are changed', () => {
    wrapper.find('input#email').simulate('change');
    wrapper.find('input#verifyEmail').simulate('change');
    expect(onInputChangeSpy.calledTwice).to.be.true;
  });

  context('Submit form with valid data', () => {
    beforeEach(() => {
      wrapper.find(`form#${formId}`).simulate('submit');
    });

    it('should trigger the formIsValid callback method', () => {
      expect(formIsValidSpy.calledOnce).to.be.true;
    });

    it('should check if the emails are equal for custom validations', () => {
      expect(emailsAreEqualSpy.calledOnce).to.be.true;
      expect(emailsAreEqualSpy.returned(true)).to.be.true;
    });

    it('should call the changeEmail callback method from the properties', () => {
      expect(changeEmailSpy.calledOnce).to.be.true;
    });
  });


  context('Submit form with invalid data', () => {
    beforeEach(() => {
      onInputChangeSpy = sinon.spy();
      changeEmailSpy = sinon.spy();

      wrapper = mount(
        <ChangeEmailForm
          formId={formId} userInfo={invalidUserInfo} onInputChange={onInputChangeSpy}
          changeEmail={changeEmailSpy}
        />
      );
      const componentInstance = wrapper.instance();

      // Spies/stubs for component methods
      formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');
      emailsAreEqualSpy = sinon.spy(componentInstance, 'emailsAreEqual');

      // Update wrapper and component instance so spies/stubs are applied
      wrapper.update();
      componentInstance.forceUpdate();

      wrapper.find(`form#${formId}`).simulate('submit');
    });

    afterEach(() => {
      onInputChangeSpy.reset();
      changeEmailSpy.reset();
      formIsValidSpy.restore();
      emailsAreEqualSpy.restore();
      wrapper.unmount();
    });


    it('should not trigger the formIsValid callback method', () => {
      expect(formIsValidSpy.called).to.be.false;
    });

    it('should not check if the emails are equal', () => {
      expect(emailsAreEqualSpy.called).to.be.false;
    });

    it('should not call the changeEmail callback method from the properties', () => {
      expect(changeEmailSpy.called).to.be.false;
    });
  });

  context('Submit form with emails that are not equal', () => {
    beforeEach(() => {
      onInputChangeSpy = sinon.spy();
      changeEmailSpy = sinon.spy();

      wrapper = mount(
        <ChangeEmailForm
          formId={formId} userInfo={invalidPasswordsUserInfo} onInputChange={onInputChangeSpy}
          changeEmail={changeEmailSpy}
        />
      );
      const componentInstance = wrapper.instance();

      // Spies/stubs for component methods
      formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');
      emailsAreEqualSpy = sinon.spy(componentInstance, 'emailsAreEqual');
      showEmailErrorSpy = sinon.spy(componentInstance, 'showEmailError');
      setCustomValiditySpy = sinon.spy(componentInstance.verifyEmailInput, 'setCustomValidity');

      // Update wrapper and component instance so spies/stubs are applied
      wrapper.update();
      componentInstance.forceUpdate();

      wrapper.find(`form#${formId}`).simulate('submit');
    });

    afterEach(() => {
      onInputChangeSpy.reset();
      changeEmailSpy.reset();
      formIsValidSpy.restore();
      emailsAreEqualSpy.restore();
      showEmailErrorSpy.restore();
      setCustomValiditySpy.restore();
      wrapper.unmount();
    });

    it('should trigger the formIsValid callback method', () => {
      expect(formIsValidSpy.calledOnce).to.be.true;
    });

    it('should check if the passwords are equal', () => {
      expect(emailsAreEqualSpy.calledOnce).to.be.true;
      expect(emailsAreEqualSpy.returned(false)).to.be.true;
    });

    it('should show a password error to the user', () => {
      expect(showEmailErrorSpy.calledOnce).to.be.true;
      expect(setCustomValiditySpy.calledWith('Emails must match.')).to.be.true;
    });

    it('should not call the changeEmail callback method from the properties', () => {
      expect(changeEmailSpy.called).to.be.false;
    });
  });

  context('Blur on verifyPassword input', () => {
    beforeEach(() => {
      onInputChangeSpy = sinon.spy();
      changeEmailSpy = sinon.spy();

      wrapper = mount(
        <ChangeEmailForm
          formId={formId} userInfo={validUserInfo} onInputChange={onInputChangeSpy}
          changeEmail={changeEmailSpy}
        />
      );
      const componentInstance = wrapper.instance();

      // Spies/stubs for component methods
      formIsValidSpy = sinon.spy(componentInstance, 'formIsValid');
      emailsAreEqualSpy = sinon.spy(componentInstance, 'emailsAreEqual');
      showEmailValiditySpy = sinon.spy(componentInstance, 'showEmailValidity');
      setCustomValiditySpy = sinon.spy(componentInstance.verifyEmailInput, 'setCustomValidity');
      checkEqualEmailsOnBlurSpy = sinon.spy(componentInstance, 'checkEqualEmailsOnBlur');

      // Update wrapper and component instance so spies/stubs are applied
      wrapper.update();
      componentInstance.forceUpdate();

      wrapper.find('input#verifyEmail').simulate('blur');
    });

    afterEach(() => {
      onInputChangeSpy.reset();
      changeEmailSpy.reset();
      formIsValidSpy.restore();
      emailsAreEqualSpy.restore();
      showEmailValiditySpy.restore();
      setCustomValiditySpy.restore();
      checkEqualEmailsOnBlurSpy.restore();
      wrapper.unmount();
    });

    it('should call the correct callback of the onBlur event of the input', () => {
      expect(checkEqualEmailsOnBlurSpy.calledOnce).to.be.true;
    });

    it('should check if the passwords are equal ', () => {
      expect(emailsAreEqualSpy.calledOnce).to.be.true;
      expect(emailsAreEqualSpy.returned(true)).to.be.true;
      expect(setCustomValiditySpy.calledWith('')).to.be.true;
    });

    it('should show that passwords are valid to the user', () => {
      expect(showEmailValiditySpy.calledOnce).to.be.true;
    });
  });
});
