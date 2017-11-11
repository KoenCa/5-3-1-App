import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import {shallow, mount} from 'enzyme';

import Form from '../../../../../ui/components/forms/Form';

describe('Form component', () => {
  it('should contain a form', () => {
    const wrapper = shallow(<Form formId='myForm' onFormValid={function(){}}  />);
    expect(wrapper.find('form#myForm')).to.have.lengthOf(1);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Form formId='myForm' onFormValid={function(){}}>
        <div className='unique'></div>
      </Form>
    );
    expect(wrapper.contains(<div className='unique' />)).to.equal(true);
  });

  describe('Form validations when submitting', () => {
    beforeEach(() => {
      this.mockEvent = {
        preventDefault: sinon.spy(),
      };
      this.onFormValidSpy = sinon.spy();
    });

    context('Form is valid', () => {
      beforeEach(() => {
        this.wrapper = mount(
          <Form formId='myForm' onFormValid={onFormValidSpy}/>
        );
        this.wrapper.find('form#myForm').simulate('submit', mockEvent);
      });

      afterEach(() => {
        this.wrapper.unmount();
      });

      it('should trigger the callback that is given via props', () => {
        expect(this.mockEvent.preventDefault.called).to.be.true;
        expect(this.onFormValidSpy.called).to.be.true;
      });
    });

    context('Form is invalid', () => {
      beforeEach(() => {
        // Use mount because we need the DOM API.
        this.wrapper = mount(
          <Form formId='myForm' onFormValid={onFormValidSpy}>
            <input type='text' required></input>
          </Form>
        );
        this.wrapper.find('form#myForm').simulate('submit', mockEvent);
      });

      afterEach(() => {
        this.wrapper.unmount();
      });

      it('should add the \'was-validated\' class to the form', () => {
        expect(this.mockEvent.preventDefault.called).to.be.true;
        expect(this.onFormValidSpy.called).to.be.false;
        expect(this.wrapper.instance().state.formIsSubmitted).to.be.true;
        expect(this.wrapper.find('form#myForm').hasClass('was-validated')).to.be.true;
      });
    });
  });
});
