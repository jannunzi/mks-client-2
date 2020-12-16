import React from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone-uploader'

import { fetchFirmwareDownload } from '../actions/firmware-download';
import { fetchDeviceSchema } from '../actions/schema-action';

import 'react-dropzone-uploader/dist/styles.css'
import './firmware-download.css'

import {API_BASE_URL} from '../config'
import {FAILURE_MESSAGES} from "../config/config";
import {arrayIncludesArray} from "../utils/utilities";

// ==upload==> (START) ==> (UPLOAD IN PROGRESS) ==> (UPLOAD COMPLETE) ==> (REBOOTING) =response.ok=> (DONE)
//                          |               ^       |               ^       |      ^
//                          +-status.status-|       +---------------+       +------+
//                              ===                     response.ok         !response.ok
//                          "UPLOAD IN PROGRESS"
export class FirmwareDownload extends React.Component {

    TIMEOUT_SECONDS = 300

    state = {
        timeoutSeconds: this.TIMEOUT_SECONDS,
        monitorCount: 0,
        interval: -1,
        status: "",
        message: "",
        state: null,
        success: false,
        timedout: false,
        showProgressBar: false,
        firmwareDownloadError: this.props.error,
        token: null
    }

    startMonitor = () => {
        // start upload progress on server
        const now = new Date()
        const dateString = now.toDateString()
        const milliseconds = now.getTime()
        const token = `IGNORE ${dateString} ${milliseconds}`
        fetch(`${API_BASE_URL}/firmware-download-status-start/${token}`)

        // start monitor on client
        // TODO: maybe do it every 500ms
        const interval = setInterval(this.monitor, 1000)

        // initialize monitor state
        this.setState({
            interval: interval,
            state: "START UPDATE",
            showProgressBar: true,
            token: token
        })
    }

    // monitor upload status
    monitor = () => {
        fetch(`${API_BASE_URL}/firmware-download-status-monitor/${this.state.token}`)
            .then(response => {
		console.log('firmware-download-status-monitor response = ', response)
                return response.json()
            })
            .catch(error => {
                if(error.toString().toUpperCase().indexOf("ERROR") >= 0) {
		    console.log('firmware-download-status-monitor error = ', error)
                    this.setState(prevState => {
                        return {
                            monitorCount: prevState.monitorCount + 1,
                            state: "SERVER REBOOTING"
                        }
                    })
                }
            })
            .then(status => {
                this.setState(prevState => {
                    const nextState = Object.assign({}, prevState, {
                        monitorCount: prevState.monitorCount + 1
                    })
                    if(prevState.monitorCount >= this.state.timeoutSeconds) {
			console.log('firmware-download-status-monitor monitorCount = ', prevState.monitorCount)
			console.log('firmware-download-status-monitor state = ', prevState.state)
                        clearInterval(prevState.interval)
                        return {
                            monitorCount: 0,
                            interval: -1,
                            state: "TIMED OUT"
                        }
                    }
                    else if(prevState.state === "SERVER REBOOTING" && status) {
			console.log('firmware-download-status-monitor prevState = ', prevState.state)
                        clearInterval(prevState.interval)
                        setTimeout(() => window.location.replace('/'), 3000)                                               
                        return {
                            monitorCount: 0,
                            interval: -1,
                            state: "SUCCESS",
                            showProgressBar: false
                        }
                    }
                    else if(prevState.state !== "SERVER REBOOTING") {
                        if(status && status.upgradeResults) {
                            const stat = status.upgradeResults

                            // if there's a failure, stop interval, change to failed state
                            if(arrayIncludesArray(stat, FAILURE_MESSAGES)) {
                                clearInterval(prevState.interval)
                                return {
                                    monitorCount: 0,
                                    interval: -1,
                                    state: "FAILED",
                                    message: stat
                                }
                            }

                            // if there's no failure, parse the message and display it
                            // last element is latest message
                            // NOTE: the -2 below is because last element is empty string

                            const statusParts = stat[stat.length - 2].split(':')
                            let message = stat[stat.length - 2]
                            // see if first part of message is a date
                            let date = null
                            date = Date.parse(statusParts[0])
                            if(!isNaN(date)) {
                                message = statusParts[statusParts.length - 1].trim().toUpperCase()
                            } else {
                                message = statusParts[0].trim().toUpperCase()
                            }

                            return {
                                monitorCount: prevState.monitorCount + 1,
                                state: message.startsWith("IGNORE") ? "UPDATING FIRMWARE" : message
                            }
                        }
                    }
                    return nextState;
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        const onSubmit = (event) => {
            this.startMonitor()
            this.props.downloadFirmware(event.target.files[0])
        };

        const Input = ({ accept }) => {
            const text = 'Click to Select File'

            return (
                <div>
                    <label style={{
                        backgroundColor: 'none',
                        textAlign: 'center',
                        color: 'black',
                        cursor: 'pointer',
                        padding: 15, borderRadius: 3 }}>
                        <i className="fa fa-arrow-circle-up mks-font-size-100px mks-color-dark-blue"></i>
                        <br/>
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            name='IronNewt.zcz'
                            accept={accept}
                            multiple
                            encType="multipart/form-data"
                            onChange={onSubmit}
                        />
                        <div style={{
                            backgroundColor: "rgb(010,087,164)",
                            color: "white",
                            padding: 10,
                            marginTop: 10
                        }}>
                            SELECT FILE
                        </div>
                    </label>
                </div>
            )
        }

        return(
            <div>
                <h2>Firmware Update</h2>

                <Dropzone
                    onSubmit={onSubmit}
                    type='file'
                    name="IronNewt.zcz"
                    accept=".zcz"
                    InputComponent={Input}/>

                {
                    (
                        this.state.showProgressBar === true &&
                        this.state.state !== "FAILED"
                    ) &&
                    <div>
                        <br/>
                        <div className="alert-info mks-alert">
                            <i className="fa fa-info-circle"></i>
                            STATUS: {this.state.state}
                        </div>
                        <br/>
                        <div className="text-center">
                            <i className="fa fa-spinner fa-4x fa-spin"/>
                            <br/>
                            <br/>
                            Please do not leave this screen while the firmware is updating.
                            <br/>
                        </div>
                    </div>
                }

                {
                    this.state.state === "TIMED OUT" &&
                    <div>
                        <br/>
                        <div className="alert-danger mks-alert">
                            <i className="fa fa-thumbs-o-down"></i>
                            {
                              this.state.state === "TIMED OUT" &&
                              <span>TIMEOUT: Firmware update has timed out</span>
                            }
                        </div>
                    </div>
                }

                {
                    this.state.state === "FAILED" &&
                    <div>
                        <br/>
                        <div className="alert-danger mks-alert">
                            <i className="fa fa-thumbs-o-down"></i>
                            {this.state.message}
                        </div>
                    </div>
                }

                {
                    this.state.state === "SUCCESS" &&
                    <div>
                        <br/>
                        <div className="alert-success mks-alert">
                            <i className="fa fa-thumbs-o-up"></i>
                            SUCCESS: Your firmware has been successfully loaded
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    downloadFirmware: (files) => dispatch(fetchFirmwareDownload(files)),
    getDeviceSchema: () => dispatch(fetchDeviceSchema())
})
const mapStateToProps = state => ({
    error: state.firmwareDownload.error
})

export default connect(mapStateToProps, mapDispatchToProps)(FirmwareDownload);
