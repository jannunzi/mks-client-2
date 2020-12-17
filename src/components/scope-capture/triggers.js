import React from "react";
import {connect} from "react-redux";
import scopeActions from "../../actions/scope-actions/scope-actions"

const Triggers = (
  {
    scope,
    triggers = [],
    selectTrigger,
    selectedTrigger
  }) =>
  <div>
    <h2>Triggers</h2>
    <ul className="list-group">
      {
        triggers.map(trigger =>
          <li key={trigger}
              className={`list-group-item ${trigger === selectedTrigger ? 'active':''}`}>
            <label>
              <input
                checked={trigger === selectedTrigger}
                onChange={(event) => {
                  selectTrigger(trigger, event.target.checked)
                }}
                type="radio"
                name="triggers"/>
              {trigger}
            </label>
          </li>
        )
      }
    </ul>
  </div>

const stateToPropertyMapper = (state) => ({
  scope: state.scopeReducer.scope,
  triggers: state.scopeReducer.scope["soft-triggers"],
  selectedTrigger: state.scopeReducer.selectedTrigger
})
const dispatchToPropertyMapper = (dispatch) => ({
  selectTrigger: (trigger, selected) =>
    scopeActions.selectTrigger(dispatch, trigger, selected)
})
export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(Triggers)
