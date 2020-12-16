import React from 'react';
import {connect} from 'react-redux'
import {Route, withRouter} from 'react-router-dom';
import {API_BASE_URL} from '../config.js'
import './app.css';

//components
import logo from '../public/MKSLogo.PNG';
import NavBar from './nav-bar';
import DeviceStatus from './device-status';
import Downloads from "./downloads";
import ConfigurationTabs from "./configuration-tabs";
import UploadFiles from './upload-files';
import FirmwareDownload from './firmware-download';
import UserManagement from "./user-management";
// import Dashboard from './dashboard';
// import ScopeControl from './scope-control';
// import ScopeStream from "./ScopeStream";
// import Smith from "./smith";

//dispatch methods
import { fetchDeviceSchema } from '../actions/schema-action';
import {currentRole} from "../actions/user-action";

//used for spinner when waiting for server to load
import LoadingOverlay from 'react-loading-overlay';


class App extends React.Component {
   
    state = {
        loadingFailed: false
    }

    componentDidMount = () => {
        this.props.dispatch(currentRole())
        this.props.dispatch(fetchDeviceSchema())
        this.verifyConnection()
    }

    verifyConnection = () =>
        fetch(`${API_BASE_URL}/device-schema`)
            .then(response => {
                this.setState(prefState => {
                    if(prefState.loadingFailed) {
                        setTimeout(() => window.location.replace('/'), 1000)
                    }
                    return {
                        loadingFailed: false
                    }
                })})
            .catch(e => {
                setTimeout(this.verifyConnection, 1000)
                this.setState({
                    loadingFailed: true
                })
            })

    render() {

        return (
            <LoadingOverlay
                active={this.state.loadingFailed}
                spinner
                text='Connecting to server...'
            >
            <div className='app'>
                <h1>{this.props.product}</h1>
                <div className="side-nav">
                    <img src={logo} className="app-logo" alt="logo" />
                    <NavBar {...this.props}/>
                    <div>
                        <span className='mks-website-version-email'>Website v2.0</span>
                    </div>
                </div>
                <div className="mks-main-content">
                    {/* <Route exact path='/' component={Dashboard} /> */}
                    <Route exact path="/" component={DeviceStatus} />
                    <Route exact path="/device-status" component={DeviceStatus} />
                    <Route exact path="/upload-files" component={UploadFiles} />
                    <Route exact path="/device-config/:config" component={ConfigurationTabs} />
                    <Route exact path="/firmware-download" component={FirmwareDownload} />
                    <Route exact path="/downloads" component={Downloads} />
                    {/* <Route exact path="/scope-control" component={ScopeControl} /> */}
                    {/* <Route exact path="/scope-stream" component={ScopeStream} /> */}
                    <Route exact path="/user-management" component={UserManagement} />
                    {/* <Route exact path="/smith" component={Smith} /> */}
                </div>
            </div>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.schema.loading,
})

export default withRouter(connect(mapStateToProps)(App));
