import React from 'react';
import {connect} from 'react-redux';
import './device-status.css';

import {fetchDeviceStatus} from '../actions/status';


export class DeviceStatus extends React.Component {
  UNSAFE_componentWillMount() {
	return this.props.dispatch(fetchDeviceStatus());
		
	}

    render() {
      return(
      	<div className="mks-device-status">
            <h1>Device Status</h1>
            <div className="mks-shadow-border">
                <div className="row">
                    <div className="col-3">
                        Generator Model
                    </div>
                    <div className="col-9">
                        {
                            this.props.missing.model === 'FAILURE' &&
                                <input
                                    readOnly={true}
                                    value={'FAILURE: missing, malformed or empty hostname file'}
                                    className="form-control alert-danger mks-alert"/>
                        }
                        {
                            this.props.missing.model === 'SUCCESS' &&
                                <input
                                    readOnly={true}
                                    value={this.props.model}
                                    className="form-control"/>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        Generator Serial
                    </div>
                    <div className="col-9">
                        {
                            this.props.missing.serial === 'FAILURE' &&
                                <input
                                    readOnly={true}
                                    value={'FAILURE: missing, malformed or empty hostname file'}
                                    className="form-control alert-danger mks-alert"/>
                        }
                        {
                            this.props.missing.serial === 'SUCCESS' &&
                                <input
                                    readOnly={true}
                                    value={this.props.serial}
                                    className="form-control"/>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        Hostname
                    </div>
                    <div className="col-9">
                        {
                            this.props.missing.hostname === 'FAILURE' &&
                                <input
                                    readOnly={true}
                                    value={'FAILURE: missing, malformed or empty hostname file'}
                                    className="form-control alert-danger mks-alert"/>
                        }
                        {
                            this.props.missing.hostname === 'SUCCESS' &&
                                <input
                                    readOnly={true}
                                    value={this.props.hostname}
                                    className="form-control"/>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        Firmware Version
                    </div>
                    <div className="col-9">
                        {
                            this.props.missing.firmwareVersion === 'FAILURE' &&
                                <input
                                    readOnly={true}
                                    value={'FAILURE: missing or empty buildVersions.py file'}
                                    className="form-control alert-danger mks-alert"/>
                        }
                        {
                            this.props.missing.firmwareVersion === 'SUCCESS' &&
                                <input
                                    readOnly={true}
                                    value={this.props.firmware}
                                    className="form-control"/>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        Config with IP
                    </div>
                    <div className="col-9">
                        {  
                            this.props.missing.configIds === 'FAILURE' &&
                                <input
                                    readOnly={true}
                                    value={'FAILURE: missing or empty deviceStatus.xml file'}
                                    className="form-control alert-danger mks-alert"/>
                        }
                        {
                            this.props.missing.configIds ==='SUCCESS' &&
                                <input
                                    readOnly={true}
                                    value={this.props.configWithIP}
                                    className="form-control"/>
                        }
                    </div>
                </div>
		<div className="row">
                    <div className="col-3">
                        Config with No IP
                    </div>
                    <div className="col-9">
                        {
                            this.props.missing.configIds === 'FAILURE' &&
                                <input
                                    readOnly={true}
                                    value={'FAILURE: missing or empty deviceStatus.xml file'}
                                    className="form-control alert-danger mks-alert"/>
                        }
                        {
                            this.props.missing.configIds === 'SUCCESS' &&
                                <input
                                    readOnly={true}
                                    value={this.props.configWithNoIP}
                                    className="form-control"/>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        Uptime
                    </div>
                    <div className="col-9">
                        {
                            this.props.missing.uptime === 'FAILURE' &&
                                <input
                                    readOnly={true}
                                    value={'FAILURE: missing or empty uptime file'}
                                    className="form-control alert-danger mks-alert"/>
                        }
                        {
                            this.props.missing.uptime === 'SUCCESS' &&
                                <input
                                    type="text"
                                    readOnly={true}
                                    value={`${this.props.uptime} minutes`}
                                    className="form-control"/>
                        }
                    </div>
                </div>
            </div>
        </div>
      )
    }
}

const mapStateToProps = state => ({
	loading: state.status.loading,
	model: state.status.model,
    serial: state.status.serial,
    firmware: state.status.firmware,
    hostname: state.status.hostname,
    configWithIP: state.status.configWithIP,
    configWithNoIP: state.status.configWithNoIP,
    uptime: state.status.uptime,
    missing: state.status.missing,
});

export default connect(mapStateToProps)(DeviceStatus);
