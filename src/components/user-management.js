import React from 'react'
import '../../src/jga.css'
import {connect} from 'react-redux';
import {login, logout} from "../actions/user-action"


export class UserManagement extends React.Component{
    constructor(props) {
        super(props)
    }

    state = {
        password: "",
        loginSuccess: false
    }

    updateForm = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    loginUser = () => {
        return this.props.loginUser(this.state.password)

    }

    keyPress = (event) => {
        if (event.key === 'Enter') 
            return this.props.loginUser(this.state.password)
    }

    render() {
        return (
            <div>
                <h1>User Management</h1>
                <div className="mks-shadow-border">
                    <div className="container">
                        {
                            this.state.loginSuccess &&
                            <div>
                                <div className={`alert-success mks-alert`}>
                                    <h3>Login successful</h3>
                                </div>
                                <br/>
                            </div>
                        }
                        <div className="row">
                            <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2">
                                Enter Password
                            </div>
                            <div className="col-8 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                                <div className="input-group">
                                    <input
                                        type="password"
                                        onChange={this.updateForm}
                                        value={this.state.password}
                                        className="form-control"
                                        placeholder="jdoe"
                                        onKeyPress={this.keyPress}/>
                                    <div className="input-group-append">
                                        <button
                                            onClick={this.loginUser}
                                            className="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">
                                <br/>
                                <button
                                    onClick={this.props.logout}
                                    className="btn btn-primary btn-block">
                                    Exit Website Access Level
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(UserManagement);
