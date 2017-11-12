import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';

import ModalHeader from '../../../../../ui/components/modal/ModalHeader';

describe('ModalHeader component', () => {
  it('should contain the correct elements', () => {
    const wrapper = shallow(<ModalHeader/>);
    expect(wrapper.contains(
      <div className="modal-header">
        <h5 className="modal-title"></h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )).to.be.true;
  });

  it('should show the modal title that is passed in via props', () => {
    const wrapper = shallow(<ModalHeader modalTitle='My Modal'/>);
    expect(wrapper.find('h5.modal-title').text()).to.eql('My Modal');
  });
});
