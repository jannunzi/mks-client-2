import React from "react";
import {connect} from "react-redux";
import scopeActions from "../../actions/scope-actions/scope-actions"
import {API_BASE_URL} from "../../config";

const Captures = (
  {
    captures = [],
    deleteCapture
  }) =>
<div>
  <h2>Renders</h2>
  <table className="table table-striped">
    <colgroup>
      <col span="1" style={{"width": "10%"}}/>
      <col span="1" style={{"width": "10%"}}/>
      <col span="1" style={{"width": "10%"}}/>
      <col span="1" style={{"width": "20%"}}/>
      <col span="1" style={{"width": "10%"}}/>
      <col span="1" style={{"width": "25%"}}/>
      <col span="1" style={{"width": "10%"}}/>
      <col span="1" style={{"width": "5%"}}/>
    </colgroup>

    <thead>
      <tr>
        <th colSpan={3}><h4>Captures</h4></th>
        <th colSpan={5}><h4>Renders</h4></th>
      </tr>
      <tr>
        <th><h5>Name</h5></th>
        <th><h5>Status</h5></th>
        <th><h5>State</h5></th>
        <th><h5>Name</h5></th>
        <th><h5>Status</h5></th>
        <th><h5>File</h5></th>
        <th><h5>Progress</h5></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {
      captures.map((capture, ndx) =>
        <tr key={ndx}>
          <th>{capture['capture-name']}</th>
          <th>{capture['status']}</th>
          <th>{capture['capture-state']}</th>
          <th>{capture['renders'] && capture['renders'][0].name}</th>
          <th>{capture['renders'] && capture['renders'][0]['job-status']}</th>
          <th>{capture['renders'] && capture['renders'][0]['render-file']}</th>
          <th>
            {
              capture['renders'] && capture['renders'][0] && capture['renders'][0]['job-status'] !== 'Completed' && capture['renders'][0]['progress'] &&
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated"
                     style={{width: `${Math.round(100*capture['renders'][0]['progress'].completed/capture['renders'][0]['progress'].total)}%`}}>
                  {Math.round(100*capture['renders'][0]['progress'].completed/capture['renders'][0]['progress'].total)}%
                </div>
              </div>
            }
            {
              capture['renders'] && capture['renders'][0] && capture['renders'][0]['job-status'] === 'Completed' &&
              <a href={`${API_BASE_URL}/scope/${capture['renders'][0]['render-file']}`}
                 className="btn btn-primary btn-block">
                SBF <i className="fa fa-download"></i>
              </a>
            }
          </th>
          <th>
            <button onClick={() => deleteCapture(capture['capture-name'])} className="btn btn-danger">
              <i className="fa fa-trash"></i>
            </button>
          </th>
        </tr>
      )
    }
    </tbody>
  </table>
</div>

const stateToPropertyMapper = (state) => ({
  captures: state.scopeReducer.captures,
  renders: state.scopeReducer.renders
})
const dispatchToPropertyMapper = (dispatch) => ({
  deleteCapture: (captureName) => scopeActions.deleteCapture(dispatch, captureName)
})
export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(Captures)
