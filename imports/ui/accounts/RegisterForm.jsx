import React, { Component } from 'react';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        this.props.onInputChange(target);
    }

    render() {
        const email = this.props.userInfo.email;
        const password = this.props.userInfo.password;
        const verifyPassword = this.props.userInfo.verifyPassword;        

        return (
            <form>
                <div className="form-group">
                    <label htmlFor="email" className="form-control-label">Email:</label>
                    <input value={email} type="email" className="form-control" id="email" onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-control-label">Password:</label>
                    <input value={password} type="password" className="form-control" id="password" onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="verifyPassword" className="form-control-label">Verify password:</label>
                    <input value={verifyPassword} type="password" className="form-control" id="verifyPassword" onChange={this.handleInputChange} />
                </div>
            </form>
        )
    }
}