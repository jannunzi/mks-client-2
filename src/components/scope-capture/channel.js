import React from "react";
import {connect} from "react-redux";
import scopeActions from "../../actions/scope-actions/scope-actions"

const Channel = (
  {
    stream,
    channels = {},
    selectStreamChannels,
    setStreamDepth,
    setStreamDivisor
  }) =>
{
  const roundDivision = (divisor, stream) => {
    for(let i=1; i < 100; i++) {
      const br = channels[stream]['base-rate'] / i;
      if(divisor >= br) {
        divisor = Math.round(br)
        setStreamDivisor(stream, divisor)
        break
      }
    }
  }
  return(
    <div className="col-4 mks-channel mks-border-1px-solid-lightgray">
    <h4>{stream}</h4>
    <select
      onChange={(event) => {
        selectStreamChannels(stream, event)
      }}
      className="form-control"
      style={{"resize": "vertical"}}
      size={10}
      multiple>
      {
        channels &&
        channels[stream] &&
        channels[stream].channels &&
        channels[stream].channels.map(channel =>
          <option
            key={channel}
            value={channel}>
            {channel}
          </option>)
      }
    </select>
    <div className="row">
      <div className="col-6">
        <h6># OF SAMPLES</h6>
      </div>
      <div className="col-6">
        <input
          value={channels[stream].depth}
          onChange={(event) => setStreamDepth(stream, event.target.value)}
          className="form-control"/>
      </div>
      <div className="col-6">
        <h6>CAPTURE RATE (Hz)</h6>
      </div>
      <div className="col-6">
        <input
          list={stream}
          value={channels[stream].divisor}
          onBlur={() => {roundDivision(channels[stream].divisor, stream)}}
          onChange={(event) => setStreamDivisor(stream, event.target.value)}
          className="form-control"/>
        <datalist id={stream}>
          {
            Array.from({length: 10}).map((item, ndx) =>
              <option key={ndx}>{Math.round(channels[stream]['base-rate'] / (ndx + 1))}</option>
            )
          }
        </datalist>
      </div>
    </div>
  </div>)
}

const stateToPropertyMapper = (state) => ({
  streams: state.scopeReducer.scope.streams,
  // TODO: rename "scopeStreamsStream" to "channels"?
  channels: state.scopeReducer.scopeStreamsStream,
})
const dispatchToPropertyMapper = (dispatch) => ({
  selectStreamChannels: (stream, event) => {
    let channels = {}
    for(let option of event.target.options) {
      channels[option.value] = option.selected
    }
    scopeActions.selectStreamChannels(dispatch, stream, channels)
  },
  setStreamDepth: (stream, depth) =>
    scopeActions.setStreamDepth(dispatch, stream, depth),
  setStreamDivisor: (stream, divisor) =>
    scopeActions.setStreamDivisor(dispatch, stream, divisor)
})

export default connect
(stateToPropertyMapper,
  dispatchToPropertyMapper)
(Channel)
