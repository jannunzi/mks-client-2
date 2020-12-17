import React from "react";
import scopeActions from "../../actions/scope-actions/scope-actions"
import {connect} from "react-redux";

const Streams = (
  {
    state,
    streams = [],
    update,
    selectStream,
    selectedStreams
  }) =>
  <div>
    <h2>Streams</h2>
    <ul className="list-group">
      {
        streams.map((stream, index) =>
          <li key={index}
              className={`list-group-item ${state.selectedStreams[stream] === true ? 'active' : ''}`}>
            <label>
              <input
                checked={state.selectedStreams[stream] || false}
                onChange={(event) => {
                selectStream(stream, event.target.checked)
              }} type="checkbox"/>
              {stream}
            </label>
          </li>
        )
      }
    </ul>
  </div>

const stateToPropertyMapper = (state) => ({
  state: state.scopeReducer,
  scope: state.scopeReducer.scope,
  streams: state.scopeReducer.scope.streams,
  selectedStreams: state.scopeReducer.selectedStreams
})
const dispatchToPropertyMapper = (dispatch) => ({
  selectStream: (stream, selected) => scopeActions.selectStream(dispatch, stream, selected)
})
export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(Streams)
