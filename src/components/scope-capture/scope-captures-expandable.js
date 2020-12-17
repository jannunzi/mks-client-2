import React from "react";
import ScopePresets from "./scope-captures";
import scopeActions from "../../actions/scope-actions/scope-actions"
import {connect} from "react-redux";

class ScopeCapturesExpandable extends React.Component {
  state = {
    expanded: false
  }
  componentDidMount() {
    this.props.scope()
    setInterval(() => {
      this.props.renders()
      this.props.captures()
    }, 2000)
  }

  render() {
    return(
      <div>
        <span className="mks-scope-presets-expand-controls">
          {
            !this.state.expanded &&
            <i onClick={() => this.setState({expanded: true})}
               className="fa fa-2x fa-expand"></i>
          }
          {
            this.state.expanded &&
            <i onClick={() => this.setState({expanded: false})}
               className="fa fa-2x fa-close"></i>
          }
            </span>
          }
        <ScopePresets expanded={this.state.expanded}/>
      </div>
    )
  }
}

const stateToPropertyMapper = (state) => ({})
const dispatcherToPropertyMapper = (dispatch) => ({
  scope: () => {
    // debugger
    scopeActions.scope(dispatch)
  },
  renders: () => {
    scopeActions.renders(dispatch)
  },
  captures: () => scopeActions.captures(dispatch)
})

export default connect
  (stateToPropertyMapper, dispatcherToPropertyMapper)
(ScopeCapturesExpandable)
