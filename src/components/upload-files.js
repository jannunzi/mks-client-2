import React from 'react';
import {connect} from 'react-redux';
import utilities from "../utils/utilities";
import {fetchUploadFiles} from '../actions/upload-files';
import {logFromClient} from '../actions/clientLogging';

const baseUrl = utilities.getBaseUrl();

export class UploadFiles extends React.Component {

    constructor(props) {
        super(props);
        this.downloadLink = React.createRef()
    }

    state = {
        uploadFiles: {
            Faults:         {label: "Faults",         selected: false},
            WebsiteLog:     {label: "Website Log",    selected: false},
            ConfigIDs:      {label: "ConfigIDs",      selected: false},
            ConfigChanges:  {label: "Config Changes", selected: false},
            Combined:       {label: "Combined",       selected: false},
            Notes:          {label: "Notes",          selected: false},
            Warnings:       {label: "Warnings",       selected: false},
            ConfigFiles:    {label: "Config Files",   selected: false}
        },
        count: 0,
        selectAll: false
    }

    submitFiles = () => {
        if (this.state.count > 0)
            this.props.dispatch(
                fetchUploadFiles(
                    Object.keys(this.state.uploadFiles)
                        .map(key => key)
                        .filter(key => this.state.uploadFiles[key].selected)))
                .then((response) => {
                    this.downloadLink.current.click()
                })
        var windowObj = {
            heading: 'EXTRACT FILES FROM GENERATOR IP ADDRESS',
            content: window.location.href
        }
        this.props.dispatch(logFromClient(windowObj))
    }

    selectAll = () => {
        this.setState(prevState => {
            prevState.selectAll = !prevState.selectAll
            if(prevState.selectAll) {
                prevState.count = 8;
            } else {
                prevState.count = 0;
            }
            Object.keys(prevState.uploadFiles).forEach(key => {
                prevState.uploadFiles[key].selected = prevState.selectAll
            })
            return prevState
        })
    }

    selectFile = (key) => {
        this.setState(prevState => {
            if(prevState.uploadFiles[key].selected) {
                prevState.count--
            } else {
                prevState.count++
            }
            if(prevState.count === 8) {
                prevState.selectAll = true
            } else {
                prevState.selectAll = false
            }
            prevState.uploadFiles[key].selected = !prevState.uploadFiles[key].selected
            return prevState
        })
    }

    render() {
        return (
          <div className={`mks-upload-files`}>
              <h1>Extract Files</h1>
              <div className="mks-shadow-border">
                  <div className={`col-12 col-sm-12 col-md-10 col-lg-7 col-xl-5`}>
                      <br/>
                      <h2>Select files to extract</h2>
                      <br/>
                      <ul className={`list-group`}>
                          <li
                            onClick={this.selectAll}
                            className={`list-group-item ${this.state.selectAll ? "active" : ""}`}>
                              {!this.state.selectAll && <i className="fa fa-square-o fa-2x"></i>}
                              { this.state.selectAll && <i className="fa fa-check-square-o fa-2x"></i>}
                              <span className={`mks-margin-left-10px mks-file`}>
                                    Select All
                                </span>
                          </li>
                          {
                              //list-group-item-danger
                              Object.keys(this.state.uploadFiles).map(key => {
                                  let highlight = this.state.uploadFiles[key].selected ? "active" : ""
                                  const missing = this.props.uploadResults.missing.length > 0 &&
                                    this.props.uploadResults.missing.find(file => file === key)                                  
                                  highlight = missing ?
                                    "list-group-item-danger" : highlight
                                  return(
                                    <li key={key}
                                        onClick={() => this.selectFile(key)}
                                        className={`list-group-item ${highlight}`}>
                                        {!this.state.uploadFiles[key].selected && <i className="fa fa-square-o fa-2x"></i>}
                                        { this.state.uploadFiles[key].selected && <i className="fa fa-check-square-o fa-2x"></i>}
                                        <span
                                          className={`mks-margin-left-10px mks-file`}>
                                                {this.state.uploadFiles[key].label}
                                            &nbsp;
                                            {missing ? "(Not found)" : ""}
                                            </span>
                                    </li>
                                  )})
                          }
                      </ul>
                      <br/>

                      <button
                        disabled={this.state.count === 0}
                        onClick={this.submitFiles}
                        className={`btn btn-success btn-lg btn-block`}>
                          Extract Files
                      </button>
                  </div>

                  <a ref={this.downloadLink}
                     className={`mks-transparent-color`}
                     href={`${baseUrl}/download-upload-files`}>
                      Extract
                  </a>
              </div>
          </div>
        )
    }
}

const mapStateToProps = state => ({
    uploadResults: state.uploadFiles.uploadResults
});

export default connect(mapStateToProps)(UploadFiles);
