import React from 'react';

export default class ScopeControl extends React.Component {

    message() {
        return
    }

    render() {

        let button = (
            <button onClick={() => this.message()}>
                <a className="nav-words" href='/'>
                    Download scope file
                </a>
            </button>
        )

        return (
            <div>
                <h1>Scope Control Page</h1>
                {button}
            </div>
        )
    }
}
