import React, { Component } from 'react';

import RegisterForm from './RegisterForm.jsx'

export default class RegisterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            verifyPassword: '',
        };

        this.onRegisterInputChange = this.onRegisterInputChange.bind(this);
    }

    componentDidMount() {
        $('#registerModal').modal({
            backdrop: 'static'
        })
    }

    onRegisterInputChange(target) {
        const id = target.id;
        const value = target.value;

        this.setState({
            [id]: value
        });
    }

    render() {
        const registerData = {
            email: this.state.email,
            password: this.state.password,
            verifyPassword: this.state.verifyPassword,
        };      

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
                            <RegisterForm 
                                onInputChange={this.onRegisterInputChange} 
                                userInfo={registerData}
                            />
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