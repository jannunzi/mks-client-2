import React from "react";
import {connect} from "react-redux";
import Channel from "./channel";

const Channels = (
  {
    selectedStreams
  }) =>
  <div>
    <h2>Channels</h2>
    <div className="row">
      {
        Object.keys(selectedStreams).map(stream => (
            selectedStreams[stream] === true ?
            <Channel key={stream} stream={stream}/> : null
          )
        )
      }
    </div>
  </div>

const stateToPropertyMapper = (state) => ({
  selectedStreams: state.scopeReducer.selectedStreams
})

export default connect
(stateToPropertyMapper)
(Channels)
