import React from 'react';
import {connect} from 'react-redux';
import { API_BASE_URL } from '../config.js';
import {logFromClient} from '../actions/clientLogging';

export class ConfigurationDownload extends React.Component {

    state = {
        donwloadState: ''
    }

    fileSelectionChanged = (e) => {
        var fd = new FormData();
        var content = []
        for (var x = 0; x < e.target.files.length; x++) {
            fd.append("config", e.target.files[x]);
            content.push(e.target.files[x])
        }

        fetch(`${API_BASE_URL}/config-download`, {
            method: "POST",
            body: fd
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    donwloadState: 'SUCCESS'
                })
            } else {
                this.setState({
                    donwloadState: 'FAILURE',
                    message: ''
                })
            }
        })
        var windowObj = {
            heading: 'UPDATE FILES TO GENERATOR IP ADDRESS',
            content: window.location.href
        }
        return this.props.logClient(windowObj)
    }

    render() {
        return(
            <div>
                <h2>Configuration Update</h2>
                <div className={`dzu-dropzone`}>
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
                            accept='.aes'
                            multiple
                            encType="multipart/form-data"
                            onChange={this.fileSelectionChanged}
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

                {
                    this.state.donwloadState === 'SUCCESS' &&
                    <div>
                        <br/>
                        <div className="alert-success mks-alert">
                            <i className="fa fa-thumbs-o-up"></i>
                            SUCCESS: Your configuration has been successfully updated
                        </div>
                    </div>
                }

                {
                    this.state.donwloadState === 'FAILURE' &&
                    <div>
                        <br/>
                        <div className="alert-danger mks-alert">
                            <i className="fa fa-thumbs-o-down"></i>
                            Configuration Update Failed!
                        </div>
                    </div>
                }
            </div>
        )
    }
}
const mapDispathToProps = dispatch => ({
    logClient: (windowObj) => dispatch(logFromClient(windowObj))
});

export default connect(null, mapDispathToProps)(ConfigurationDownload);

