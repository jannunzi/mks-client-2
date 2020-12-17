import * as constants from "../actions/scope-actions/scope-constants";
import channel from "../components/scope-capture/channel";
import {cloneDeep} from "lodash"

const initialState = {
  selectedTrigger: "",
  selectedStreams: {},
  scope: {},
  scopeStreams: [],
  scopeStreamsStream: {},
  triggerParametersSchema: {
    "Bin-Synced-Readbacks": {
      parameterOptions: [
        {
          title: "condition",
          type: String,
          enum: [
            "fault","Value B","Value C","Value D"
          ],
        },
        {
          title: "Parameter B",
          type: Number,
          min: 0,
          max: 100
        }
      ],
      stateOptions: [
        "Any state", "State 1", "State 2", "State 3", "State 4"
      ],
      comparisonOptions: [
        "=", "!=", "<", ">"
      ],
      valueOptions: [
        "Value A","Value B","Value C","Value D"
      ],
      parameters: [
        {parameter: "Parameter B", state: "State 2", comparison: "<", value: "Value C"},
        {state: "State 2", comparison: "<"},
        {parameter: "Parameter C"}
      ]
    },
    "Power Scope Trigger": {
      parameterOptions: [
        "Parameter X", "Parameter Y", "Parameter Z"
      ],
      stateOptions: [
        "Any state", "State A", "State B", "State C", "State D"
      ],
      comparisonOptions: [
        "=", "!=", "<", ">"
      ],
      valueOptions: [
        "Value X","Value Y","Value Z"
      ],
      parameters: [
        {}, {}
      ]
    },
    "SysMon Trigger": {
      parameterOptions: [
        "Parameter 1", "Parameter 2", "Parameter 3", "Parameter 4"
      ],
      stateOptions: [
        "Any state", "State X", "State Y", "State Z"
      ],
      comparisonOptions: [
        "=", "!=", "<", ">"
      ],
      valueOptions: [
        "Value 1","Value 2","Value 3","Value 4"
      ],
      parameters: [

      ]
    },
    "Timed Trigger": {
      parameterOptions: [
        "delay-time", "reverse-power", "gmag2-threshold", "gmag2-mode", "gmag2", "thresh-mode", "condition"
      ],
      stateOptions: [
        "Any state", "State X", "State Y", "State Z"
      ],
      comparisonOptions: [
        "gt", "gte", "lt", "lte", "=", "!=", "<", ">"
      ],
      valueOptions: [
        "sync-loss", "fault", "warning", "rf-on", "rf-off"
      ],
      parameters: [
        {parameter: "delay-time", value: 5}
      ]
    }
  },
  triggerParameters: {
    "Bin-Synced-Readbacks": {
      parameterOptions: [
        "forward-power", "reverse-power", "delivered-power", "gmag2", "invalid-source",
      ],
      stateOptions: [
        "Any state", "State 1", "State 2", "State 3", "State 4"
      ],
      comparisonOptions: [
        "=", "!=", "<", ">"
      ],
      valueOptions: [
      ],
      parameters: [
      ]
    },
    "Power Scope Trigger": {
      parameterOptions: [
        "coherent-forward-power", "coherent-reverse-power", "coherent-delivered-power", "coherent-gmag2",
        "synced-forward-power",   "synced-reverse-power",   "synced-delivered-power",   "synced-gmag2",
        "unsynced-forward-power", "unsynced-reverse-power", "unsynced-delivered-power", "unsynced-gmag2",
        "invalid-source"
      ],
      stateOptions: [
        "Any state", "State A", "State B", "State C", "State D"
      ],
      comparisonOptions: [
        "=", "!=", "<", ">"
      ],
      valueOptions: [
      ],
      parameters: [
      ]
    },
    "SysMon Trigger": {
      parameterOptions: [
        "fault","warning","rf-on","rf-off",
      ],
      stateOptions: [
        "Any state", "State X", "State Y", "State Z"
      ],
      comparisonOptions: [
        "=", "!=", "<", ">"
      ],
      valueOptions: [
      ],
      parameters: [
      ]
    },
    "Timed Trigger": {
      parameterOptions: [
        "delay-time", "reverse-power", "gmag2-threshold", "gmag2-mode", "gmag2", "thresh-mode", "condition"
      ],
      stateOptions: [
        "Any state", "State X", "State Y", "State Z"
      ],
      comparisonOptions: [
        "gt", "gte", "lt", "lte", "=", "!=", "<", ">"
      ],
      valueOptions: [
        "sync-loss", "fault", "warning", "rf-on", "rf-off"
      ],
      parameters: [
        {parameter: "delay-time", comparison: "=", value: 5}
      ]
    }
  },
  renders: [
    {
      "serial": 1,
      "name": "Frequency Render Job",
      "job-status": "Completed",
      "progress": {
        "completed": 2384512,
        "total": 8384512
      }
    },
    {
      "serial": 2,
      "name": "Frequency Render Job",
      "job-status": "Completed",
      "progress": {
        "completed": 1384512,
        "total": 8384512
      }
    }
  ]
}

export default (state = initialState, action) => {
  let nextState = cloneDeep(state)
  switch (action.type) {
    case constants.SCOPE:
      return {
        ...state,
        scope: action.scope
      }
    case constants.SELECT_STREAM:
      nextState.selectedStreams[action.stream] = action.selected
      nextState.scopeStreamsStream[action.stream] = action.channel
      return nextState
    case constants.UNSELECT_STREAM:
      state.selectedStreams[action.stream] = false
      return {...state}
    case constants.UPDATE_SCOPE:
      return action.state

    case constants.SELECT_TRIGGER:
      nextState.selectedTrigger = action.trigger
      return nextState
    case constants.ADD_TRIGGER_PARAMETER:
      nextState.triggerParameters[action.selectedTrigger].parameters.push({})
      return nextState
    case constants.DELETE_TRIGGER_PARAMETER:
      nextState.triggerParameters[action.selectedTrigger].parameters.splice(action.index, 1)
      return nextState

    case constants.SELECT_TRIGGER_PARAMETER:
      nextState.triggerParameters[action.selectedTrigger].parameters[action.index].parameter = action.parameter
      return nextState

    case constants.SELECT_TRIGGER_PARAMETER_STATE:
      nextState.triggerParameters[action.selectedTrigger].parameters[action.index].state = action.state
      return nextState

    case constants.SELECT_TRIGGER_PARAMETER_COMPARISON:
      nextState.triggerParameters[action.selectedTrigger].parameters[action.index].comparison = action.comparison
      return nextState

    case constants.SELECT_TRIGGER_PARAMETER_VALUE:
      nextState.triggerParameters[action.selectedTrigger].parameters[action.index].value = action.value
      return nextState

    case constants.SELECT_STREAM_CHANNELS:
      nextState.scopeStreamsStream[action.stream].selectedChannels = action.channels
      return nextState

    case constants.SET_STREAM_CHANNEL_DEPTH:
      nextState.scopeStreamsStream[action.stream].depth = action.depth
      return nextState

    case constants.SET_STREAM_CHANNEL_DIVISOR:
      nextState.scopeStreamsStream[action.stream].divisor = action.divisor
      return nextState

    case constants.FIND_ALL_RENDERS:
      nextState.renders = action.renders
      return nextState

    case constants.FIND_ALL_CAPTURES:
      nextState.captures = action.captures
      return nextState

    default:
      return state
  }
}
