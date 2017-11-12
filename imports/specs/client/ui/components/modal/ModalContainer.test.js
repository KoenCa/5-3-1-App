import {React, expect, sinon, shallow} from '../../../../test_packages_imports';
import ModalContainer from '../../../../../ui/components/modal/ModalContainer';

describe('ModalContainer component', () => {
  beforeEach(() => {
    this.jQueryMockObject = {
      modal: sinon.spy(),
      on: sinon.spy()
    };
    this.jqueryStub  = sinon.stub(window, '$').returns(this.jQueryMockObject);
    this.modalClose = sinon.spy();
    this.wrapper = shallow(<ModalContainer modalName='MyModal' onModalClose={modalClose}/>);
  });

  afterEach(() => {
    this.jqueryStub.restore();
  });

  it('should contain the correct elements', () => {
    expect(this.wrapper.contains(
      <div className="modal fade" id="MyModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          </div>
        </div>
      </div>
    )).to.be.true;
  });

  it('should call the correct jQuery methods after mounting', () => {
    expect(this.jQueryMockObject.on.calledWith('hidden.bs.modal', modalClose)).to.be.true;
    expect(this.jQueryMockObject.modal.called).to.be.true;
    expect(this.jqueryStub.calledWith('#MyModal')).to.be.true;
  });

  it('should set the id via the modalName prop', () => {
    expect(this.wrapper.find('div#MyModal').length).to.eql(1);
  });
});
