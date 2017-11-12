import {React, expect, shallow} from '../../../../test_packages_imports';
import ModalFooter from '../../../../../ui/components/modal/ModalFooter';

describe('ModalFooter component', () => {
  it('should have the correct elements', () => {
    const wrapper = shallow(<ModalFooter/>);
    expect(wrapper.contains(
      <div className='modal-footer'></div>
    )).to.be.true;
  });

  it('should render children if passed in', () => {
    const wrapper = shallow(
      <ModalFooter>
        <div className='test'></div>
        <div className='test'></div>
        <div className='test'></div>
      </ModalFooter>
    );
    expect(wrapper.find('.test').length).to.eql(3);
  });
});
