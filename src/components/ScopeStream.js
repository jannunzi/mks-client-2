import React from 'react'
import Oscilloscope from "./Oscilloscope";
import Buffer from "./Buffer";

export default class ScopeStream extends React.Component {
    buffer = new Buffer(25)
    constructor(props) {
        super(props);
        this.state = {
            oscilloscopeData: this.buffer.get()
        };
    }

    render() {
        return (
            <div>
                <h1>Scope Stream</h1>
                <div className="mks-shadow-border">
                    {/* <Oscilloscope data={this.state.oscilloscopeData}/> */}
                </div>
            </div>
        )
    }
}
