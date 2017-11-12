import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';

import AlertDanger from '../../../../../ui/components/alerts/AlertDanger';

describe('AlertDanger component', () => {
  it('should render the correct HTML', () => {
    const wrapper = shallow(<AlertDanger/>);
    expect(wrapper.contains(<div className='alert alert-danger' role='alert'></div>)).to.be.true;
  });

  it('should show the messages that is passed in via props', () => {
    const wrapper = shallow(<AlertDanger message='This is a test message.'/>);
    expect(wrapper.find('div.alert').text()).to.eql('This is a test message.');
  });
});
