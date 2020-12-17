import React, {useState} from "react";
import {connect} from "react-redux";
import Streams from "./streams";
import Channels from "./channels";
import Triggers from "./triggers";
import Parameters from "./parameters";
import Renders from "./renders";
import scopeActions from "../../actions/scope-actions/scope-actions"
import './scope-captures.scss'
import Captures from "./captures";

function ScopeCaptures(
  {
    expanded,
    triggerParameters,
    channels,
    selectedTrigger,
    selectedStreams,
    runScopeCaptureRequest
  }) {
  const [captureName, setCaptureName] = useState("mks")
  const [tab, setTab] = useState("capture")
  const toggleTab = (theTab) => {
    setTab(theTab)
  }
  return (
    <div className={
    `mks-scope-capture ${expanded ? 'mks-scope-presets-expanded' : ''}
     mks-background-color-white mks-scope-presets`}>
    <div className="row">
      <div className="col-xs-2" style={{position: "relative", left: "15px"}}>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className={`nav-link btn-lg ${tab==="capture" ? "active":""}`}
               onClick={() => toggleTab("capture")}>
              Capture
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link btn-lg ${tab==="renders" ? "active":""}`}
               onClick={() => toggleTab("renders")}>
              Renders
            </a>
          </li>
        </ul>
      </div>
      <div className="col-xs-7" style={{position: "relative", left: "40px"}}>
        <h1>
          Scope Captures
        </h1>
      </div>
      <div className="col-xs-3" style={{position: "absolute", right: "0px"}}>
        <form className="form-inline">
          <input
            value={captureName}
            onChange={(event) => setCaptureName(event.target.value)}
            placeholder="Capture Name"
            className="form-control form-control-lg"/>
          <button
            onClick={() => runScopeCaptureRequest(selectedStreams, selectedTrigger, triggerParameters, captureName, channels)}
            className="btn btn-lg btn-success mks-margin-right-60px mks-margin-left-5px">
            Run
          </button>
        </form>
      </div>
    </div>
    <div className="mks-shadow-border">
      {
        tab === "capture" &&
        <div>
          <div className="row">
            <div className="col-3">
              <Streams/>
            </div>
            <div className="col-9">
              <Channels/>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-3">
              <Triggers/>
            </div>
            <div className="col-9">
              <Parameters/>
            </div>
          </div>
          <hr/>
          <form className="form-inline pull-right" style={{position: "relative", left: "60px"}}>
            <input
              value={captureName}
              onChange={(event) => setCaptureName(event.target.value)}
              placeholder="Capture Name"
              className="form-control form-control-lg"/>
            <button
              onClick={() => runScopeCaptureRequest(selectedStreams, selectedTrigger, triggerParameters, captureName, channels)}
              className="btn btn-lg btn-success mks-margin-right-60px mks-margin-left-5px">
              Run
            </button>
          </form>
          <h2>Command Line Interface</h2>
          <br/>
          <textarea rows={10} className="form-control">
          </textarea>
          <hr/>
        </div>
      }
      {
        tab === "renders" &&
        <Captures/>
        }
    </div>
  </div>)
}
const stateToPropertyMapper = (state) => ({
  triggerParameters: state.scopeReducer.triggerParameters,
  channels: state.scopeReducer.scopeStreamsStream,
  selectedStreams: state.scopeReducer.selectedStreams,
  selectedTrigger: state.scopeReducer.selectedTrigger,
})
const dispatchToPropertyMapper = (dispatch) => ({
  runScopeCaptureRequest: (selectedStreams, selectedTrigger, triggerParameters, captureName, channels) =>
    scopeActions.runScopeCaptureRequest(dispatch, selectedStreams, selectedTrigger, triggerParameters, captureName, channels)
})
export default connect
( stateToPropertyMapper,
  dispatchToPropertyMapper)
(ScopeCaptures)
