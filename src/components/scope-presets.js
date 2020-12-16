import React from "react";

import {scopePresets} from "../config/config";
import {Link} from "react-router-dom";
import {findAllScopePresets} from "../services/ScopePresetService";
import {connect} from "react-redux";

class ScopePresets extends React.Component {

    state = {
        triggerSource: "",
        fileType: "SBF",
        status: "START"
    }

    componentDidMount = () => {
        this.props.findAllScopePresets()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(prevProps.match.params.preset !== this.props.match.params.preset) {
            this.props.findDescriptionForPreset(this.props.match.params.preset)
        }
    }

    render() {
        return(
            <div>
                <h1>Scope Presets</h1>
                <div className="mks-shadow-border">
                    <div className={`row`}>
                        <div className={`col`}>
                            <h2>Preset</h2>
                            <div className={`list-group`}>
                                {
                                    this.props.presets.map(preset =>
                                        <button
                                            key={preset.label}
                                            onClick={() => this.props.history.push(`/scope-presets/${preset.label}`)}
                                            className={`list-group-item ${preset.label === this.props.match.params.preset ? 'active':''}`}>
                                            {preset.label}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        <div className={`col`}>
                            <h2>Description</h2>
                            <div className={`list-group mks-scrollable`}>
                            {
                                this.props.description &&
                                this.props.description.map(description =>
                                    <div key={description.label}
                                         className={`list-group-item`}>
                                        {description.label}: {description.value}
                                    </div>
                                )
                            }
                            </div>
                            <div className={`row mks-margin-top-10px`}>
                                <div className={`col-4`}>
                                    <h2>Source</h2>
                                </div>
                                <div className={`col-8`}>
                                    <select className={`form-control`}>
                                        <option>Trigger Source 1</option>
                                        <option>Trigger Source 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className={`row  mks-margin-top-10px`}>
                                <div className={`col-4`}>
                                    <h2 className="mks-nowrap">File Type</h2>
                                </div>
                                <div className={`col-8`}>
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <a onClick={() => this.setState({fileType: "SBF"})}
                                               className={`nav-link ${this.state.fileType === "SBF"?"active":""}`}
                                               href="#">SBF</a>
                                        </li>
                                        <li className="nav-item">
                                            <a onClick={() => this.setState({fileType: "CSV"})}
                                               className={`nav-link ${this.state.fileType === "CSV"?"active":""}`}
                                               href="#">CSV</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <p>
                        {   this.state.status === "START" &&
                            <button
                                onClick={() => this.setState({
                                    status: "TRIGGERED"
                                })}
                                className="btn btn-primary mks-margin-left-10px" >
                                Trigger
                                <i className={`fa fa-toggle-off mks-margin-left-10px`}/>
                            </button>
                        }
                        {   (this.state.status === "TRIGGERED" ||
                             this.state.status === "RUNNING" ||
                             this.state.status === "STOPPED") &&
                            <button
                                onClick={() => this.setState({
                                    status: "START"
                                })}
                                className="btn btn-danger mks-margin-left-10px" >
                                Cancel
                                <i className={`fa fa-toggle-on mks-margin-left-10px`}/>
                            </button>
                        }
                        {   this.state.status !== "RUNNING" &&
                            <button
                                disabled={this.state.status !== "TRIGGERED"}
                                onClick={() => this.setState({status: "RUNNING"})}
                                className="btn btn-success mks-margin-left-10px">
                                Run
                                <i className={`fa fa-play mks-margin-left-10px`}/>
                            </button>
                        }
                        {   this.state.status === "RUNNING" &&
                            <button
                                onClick={() => this.setState({status: "STOPPED"})}
                                className="btn btn-danger mks-margin-left-10px" >
                                Stop
                                <i className={`fa fa-stop mks-margin-left-10px`}/>
                            </button>
                        }
                        <button
                            onClick={() => this.setState({status: "START"})}
                            disabled={this.state.status !== "STOPPED"}
                            className="btn btn-primary mks-margin-left-10px" >
                            Upload File
                            <i className={`fa fa-arrow-circle-up mks-margin-left-10px`}/>
                        </button>
                    </p>
                </div>
            </div>
        )
    }
}

const stateMapper = (state) => {
    return ({
        presets: state.presets.presets,
        description: state.presets.description
    })
}

const dispatchMapper = (dispatch) => ({
    findAllScopePresets: () =>
        findAllScopePresets()
            .then(presets => {
                dispatch({
                    type: "FIND_ALL_PRESETS",
                    presets: presets
                })
            }),
    findDescriptionForPreset: (presetLabel) =>
        findAllScopePresets()
            .then(presets => {
                dispatch({
                    type: "FIND_DESCRIPTION",
                    presets: presets,
                    description: presets
                        .find(
                            preset => preset.label ===
                                presetLabel)
                        .description

                })
            })
})

export default connect(
    stateMapper, dispatchMapper)(ScopePresets)
