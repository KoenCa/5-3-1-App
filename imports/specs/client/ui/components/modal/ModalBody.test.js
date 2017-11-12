import {React, expect, shallow} from '../../../../test_packages_imports';
import ModalBody from '../../../../../ui/components/modal/ModalBody';
import AlertDanger from '../../../../../ui/components/alerts/AlertDanger';

describe('ModalBody component', () => {
  it('should render the correct elements', () => {
    const wrapper = shallow(<ModalBody/>);
    expect(wrapper.contains(
      <div className="modal-body"></div>
    )).to.be.true;
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <ModalBody>
        <div className='test'></div>
        <div className='test'></div>
        <div className='test'></div>
      </ModalBody>
    );
    expect(wrapper.find('.test').length).to.eql(3);
  });

  it('should show AlertDanger when meteorError props is passed in', () => {
    const error = 'This is an error.'
    const wrapper = shallow(
      <ModalBody meteorError={error}>
        <div className='test'></div>
        <div className='test'></div>
      </ModalBody>
    );
    expect(wrapper.find('.test').length).to.eql(2);
    expect(wrapper.contains(
      <AlertDanger message={error} />
    )).to.be.true;
  });
});
