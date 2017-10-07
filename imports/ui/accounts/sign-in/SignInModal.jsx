import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SignInModal extends Component {
  componentDidMount() {
    $('#signInModal').modal({backdrop: 'static'})
  }

  render() {
    return (
      <div className="modal fade" id="signInModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign in</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onModalClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="email" className="form-control-label">Email:</label>
                  <input type="email" className="form-control" id="email"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-control-label">Password:</label>
                  <input type="password" className="form-control" id="password"/>
                </div>
              </form>
              <a href="javascript:void(0);">Forgot password?</a>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onModalClose}>Cancel</button>
              <button type="button" className="btn btn-primary">Sign in</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SignInModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}
