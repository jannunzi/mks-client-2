import React from "react";
import {connect} from "react-redux";

const Renders = (
  {
    renders = []
  }) =>
  <div>
    <h2>Renders</h2>
    <div className="row">
      <div className="col-1"><h5>Serial</h5></div>
      <div className="col-5"><h5>Name</h5></div>
      <div className="col-2"><h5>Status</h5></div>
      <div className="col-4"><h5>Progress</h5></div>
    </div>
      {
        renders.map(render =>
          <div key={render.serial} className="row">
            <div className="col-1">{render.serial}</div>
            <div className="col-5">{render.name}</div>
            <div className="col-2">{render['job-status']}</div>
            <div className="col-4">
              <div className="progress">
                <div className="progress-bar progress-bar-striped"
                     style={{width: `${Math.round(100*render.progress.completed/render.progress.total)}%`}}>
                  {Math.round(100*render.progress.completed/render.progress.total)}%
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>

const stateToPropertyMapper = (state) => {
  return {
    renders: state.scopeReducer.renders
  }
}
export default connect(
  stateToPropertyMapper
)(Renders)
