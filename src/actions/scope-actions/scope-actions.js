import * as constants from "./scope-constants"
import scopeService from "../../services/scope-service"

export const scope = (dispatch) =>
  scopeService.scope()
    .then(scope => dispatch({
      type: constants.SCOPE,
      scope
    }))

export const selectStream = (dispatch, stream, selected) =>
  scopeService.scopeStreamsStream(stream)
    .then(channel => {
      dispatch({
        type: constants.SELECT_STREAM,
        stream, selected, channel
      })
    })

export const unselectStream = (dispatch, stream) =>
  dispatch({
    type: constants.UNSELECT_STREAM,
    stream
  })

export const updateScope = (dispatch, state) =>
  dispatch({
    type: constants.UPDATE_SCOPE,
    state
  })

export const selectTrigger = (dispatch, trigger, selected) =>
      dispatch({
        type: constants.SELECT_TRIGGER,
        trigger, selected
      })
export const addTriggerParameter = (dispatch, selectedTrigger) =>
  dispatch({
    type: constants.ADD_TRIGGER_PARAMETER,
    selectedTrigger
  })

export const deleteTriggerParameter = (dispatch, selectedTrigger, index) =>
  dispatch({
    type: constants.DELETE_TRIGGER_PARAMETER,
    selectedTrigger, index
  })
export const selectTriggerParameter = (dispatch, selectedTrigger, index, parameter) =>
  dispatch({
    type: constants.SELECT_TRIGGER_PARAMETER,
    selectedTrigger, index, parameter
  })
export const selectTriggerParameterState = (dispatch, selectedTrigger, index, state) =>
  dispatch({
    type: constants.SELECT_TRIGGER_PARAMETER_STATE,
    selectedTrigger, index, state
  })
export const selectTriggerParameterComparison = (dispatch, selectedTrigger, index, comparison) =>
  dispatch({
    type: constants.SELECT_TRIGGER_PARAMETER_COMPARISON,
    selectedTrigger, index, comparison
  })
export const selectTriggerParameterValue = (dispatch, selectedTrigger, index, value) =>
  dispatch({
    type: constants.SELECT_TRIGGER_PARAMETER_VALUE,
    selectedTrigger, index, value
  })

const selectStreamChannels = (dispatch, stream, channels) =>
  dispatch({
    type: constants.SELECT_STREAM_CHANNELS,
    stream, channels
  })

const setStreamDepth = (dispatch, stream, depth) =>
  dispatch({
    type: constants.SET_STREAM_CHANNEL_DEPTH,
    stream, depth
  })

const setStreamDivisor = (dispatch, stream, divisor) =>
  dispatch({
    type: constants.SET_STREAM_CHANNEL_DIVISOR,
    stream, divisor
  })

const renders = (dispatch) =>
  scopeService.findAllRenders()
    .then(obj =>
      dispatch({
        type: constants.FIND_ALL_RENDERS,
        renders: obj.renders
      }))

const captures = (dispatch) =>
  scopeService.findAllCaptures()
    .then(obj =>
      dispatch({
        type: constants.FIND_ALL_CAPTURES,
        captures: obj.captures
      }))

const runScopeCaptureRequest = (
  dispatch, selectedStreams, selectedTrigger,
  triggerParameters, captureName, channels) => {

  selectedStreams = Object.keys(selectedStreams).filter(stream => selectedStreams[stream] === true)

  const scopeCaptureRequest = {
    streams: selectedStreams,
    trigger: selectedTrigger,
    depths: [],
    decimations: [],
    pretriggers: [],
    quanta: 1,
    "trigger-args": {}
  }

  Object.keys(channels).forEach((channelKey, ndx) => {
    if(channels[channelKey].depth) {
      scopeCaptureRequest.depths[ndx] = channels[channelKey].depth
    }
    if(channels[channelKey].divisor) {
      scopeCaptureRequest.decimations[ndx] = channels[channelKey].divisor
    }
  })

  const parameters = triggerParameters && triggerParameters[selectedTrigger] ?
    triggerParameters[selectedTrigger].parameters : null
  if(parameters) {
    Object.keys(parameters).forEach(key => {
      const parameter = parameters[key].parameter
      const value = parameters[key].value
      if(parameter && value) {
        scopeCaptureRequest["trigger-args"][parameter] = value
      }
    })
  }

  scopeService.runScopeCaptureRequest(scopeCaptureRequest, captureName)
    .then(response => console.log(response))

}

const deleteCapture = (dispatch, captureName) =>
  scopeService.deleteCapture(captureName)
    .then(response => console.log(response))


export default {
  scope, updateScope, selectStream,

  selectTrigger, addTriggerParameter, deleteTriggerParameter,

  selectTriggerParameter, selectTriggerParameterState, selectTriggerParameterComparison, selectTriggerParameterValue,

  selectStreamChannels, setStreamDepth, setStreamDivisor,

  renders, runScopeCaptureRequest,

  captures, deleteCapture
}
