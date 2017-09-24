import React, { Component } from 'react';

export default class RegisterModal extends Component {
    componentDidMount() {
        $('#registerModal').modal({
            backdrop: 'static'
        })
    }

    render() {
        return (
            <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Register</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onModalClose} >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-control-label">Email:</label>
                                    <input type="email" className="form-control" id="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-control-label">Password:</label>
                                    <input type="password" className="form-control" id="password"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="verifyPassword" className="form-control-label">Verify password:</label>
                                    <input type="password" className="form-control" id="verifyPassword"/>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onModalClose}>Cancel</button>
                            <button type="button" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}