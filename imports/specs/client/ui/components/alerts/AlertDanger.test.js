import {React, expect, shallow} from '../../../../test_packages_imports';
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
