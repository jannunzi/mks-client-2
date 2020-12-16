import React from "react";
import FirmwareDownload from "./firmware-download";
import ConfigurationDownload from "./config-download";

export default class Downloads extends React.Component {
    render() {
        return (
            <div>
                <h1>Update to the Generator</h1>

                <div className="mks-shadow-border">
                    <div className={`row`}>
                        <div className={`col`}>
                            <FirmwareDownload/>
                        </div>
                        <div className={`col`}>
                            <ConfigurationDownload/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
