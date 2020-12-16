import React from "react";

export default class FormErrorList extends React.Component {
  render() {
    return(
      <div id="mks-error-list">
        <ul className="list-group">
          <li className="list-group-item active">
            Error List
            <span className="mks-margin-left-5px">
            ({
              this.props.errorList.filter(error => error.property).length
            })
            </span>
            <i onClick={this.props.clearErrorList} className="fa fa-remove fa-2x pull-right"/>
          </li>
          <li className="list-group-item mks-display-none">
            HIDE ME
          </li>
        </ul>
        <div className="mks-scrollable-wrapper">
          <ul className="list-group">
            <li className="list-group-item mks-display-none">
              HIDE ME
            </li>
          {
              this.props.errorList.forEach((error, index) =>
                {
                  if(error.property) {
                    const errorProperties = error.property.split('][')
                    return (
                      <li key={index} className="list-group-item">
                        {
                          errorProperties.map((e, i) =>
                            <span key={i} className="mks-margin-left-10px">
                              {
                                e.replace('[', '')
                                  .replace(']', '')
                                  .replace(/\'/g, '')
                              }
                              {
                                i < errorProperties.length - 2 ? <i className="fa fa-arrow-right mks-margin-left-right-15px"/> : null
                              }
                            </span>)
                        }
                        <span className="mks-margin-left-10px">{error.message}</span>
                      </li>
                    )
                  }
                }
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}
