import React from "react";
import {connect} from "react-redux";
import scopeActions, {selectTrigger, selectTriggerParameter} from "../../actions/scope-actions/scope-actions"

const Parameters = (
  {
    selectedTrigger,
    triggerParameters,
    addTriggerParameter,
    deleteTriggerParameter,
    selectTriggerParameter,
    selectTriggerParameterState,
    selectTriggerParameterComparison,
    selectTriggerParameterValue
  }) =>
  <div className="mks-trigger-parameters">
    {
      selectedTrigger &&
      <i onClick={() => addTriggerParameter(selectedTrigger)} className="fa fa-plus fa-2x pull-right"></i>
    }
    <h2>Parameters</h2>
    <div className="row">
      <div className="col-6">
        <h6>Parameter</h6>
      </div>
      {/*<div className="col-3">*/}
      {/*  <h6>State</h6>*/}
      {/*</div>*/}
      <div className="col-2">
        <h6>Comparison</h6>
      </div>
      <div className="col-3">
        <h6>Value</h6>
      </div>
      <div className="col-1">
      </div>
    </div>
    {
      triggerParameters &&
      triggerParameters[selectedTrigger] &&
      triggerParameters[selectedTrigger].parameters &&
      triggerParameters[selectedTrigger].parameters.map((parameter, index) =>
        <div key={index} className="row">
          <div className="col-6">
            <input type="text"
                   list={`parameter-${selectedTrigger}-${index}`}
                   defaultValue={parameter.parameter}
                   onChange={(event) =>
                     selectTriggerParameter(selectedTrigger, index, event.target.value)}
                   className="form-control"/>

            <datalist id={`parameter-${selectedTrigger}-${index}`}>
              {
                triggerParameters[selectedTrigger].parameterOptions.map((option, optionIndex) =>
                  <option
                    key={optionIndex}
                    value={option}/>)
              }
            </datalist>
          </div>
          {/*<div className="col-3">*/}
          {/*  <input type="text"*/}
          {/*         list={`state-${selectedTrigger}-${index}`}*/}
          {/*         defaultValue={parameter.state}*/}
          {/*         onChange={(event) =>*/}
          {/*           selectTriggerParameterState(selectedTrigger, index, event.target.value)}*/}
          {/*         className="form-control"/>*/}

          {/*  <datalist id={`state-${selectedTrigger}-${index}`}>*/}
          {/*    {*/}
          {/*      triggerParameters[selectedTrigger].stateOptions.map((option, optionIndex) =>*/}
          {/*        <option*/}
          {/*          key={optionIndex}*/}
          {/*          value={option}/>)*/}
          {/*    }*/}
          {/*  </datalist>*/}
          {/*</div>*/}
          <div className="col-2">
            <input type="text"
                   list={`comparison-${selectedTrigger}-${index}`}
                   defaultValue={parameter.comparison}
                   onChange={(event) =>
                     selectTriggerParameterComparison(selectedTrigger, index, event.target.value)}
                   className="form-control"/>

            <datalist id={`comparison-${selectedTrigger}-${index}`}>
              {
                triggerParameters[selectedTrigger].comparisonOptions.map((option, optionIndex) =>
                  <option
                    key={optionIndex}
                    value={option}/>)
              }
            </datalist>
          </div>
          <div className="col-3">
            <input type="text"
                   list={`${selectedTrigger}-${index}`}
                   defaultValue={parameter.value}
                   onChange={(event) =>
                     selectTriggerParameterValue(selectedTrigger, index, event.target.value)}
                   className="form-control"/>
              <datalist id={`${selectedTrigger}-${index}`}>
                {
                  triggerParameters[selectedTrigger].valueOptions.map((option, optionIndex) =>
                    <option
                      key={optionIndex}
                      value={option}/>)
                }
              </datalist>
          </div>
          <div className="col-1">
            <i onClick={() => deleteTriggerParameter(selectedTrigger, index)} className="fa fa-remove fa-2x pull-right"></i>
          </div>
        </div>
      )
    }
  </div>

const stateToPropertyMapper = (state) => ({
  triggerParameters: state.scopeReducer.triggerParameters,
  selectedTrigger: state.scopeReducer.selectedTrigger
})

const dispatchToPropertyMapper = (dispatch) => ({
  addTriggerParameter: (selectedTrigger) =>
    scopeActions.addTriggerParameter(dispatch, selectedTrigger),
  deleteTriggerParameter: (selectedTrigger, index) =>
    scopeActions.deleteTriggerParameter(dispatch, selectedTrigger, index),
  selectTriggerParameter: (selectedTrigger, index, parameterOption) =>
    scopeActions.selectTriggerParameter(dispatch, selectedTrigger, index, parameterOption),
  selectTriggerParameterState: (selectedTrigger, index, stateOption) =>
    scopeActions.selectTriggerParameterState(dispatch, selectedTrigger, index, stateOption),
  selectTriggerParameterComparison: (selectedTrigger, index, comparisonOption) =>
    scopeActions.selectTriggerParameterComparison(dispatch, selectedTrigger, index, comparisonOption),
  selectTriggerParameterValue: (selectedTrigger, index, valueOption) =>
    scopeActions.selectTriggerParameterValue(dispatch, selectedTrigger, index, valueOption),
})

export default connect
( stateToPropertyMapper,
  dispatchToPropertyMapper)
(Parameters)
