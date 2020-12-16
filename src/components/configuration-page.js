import React from "react";

import './device-config.css'
import {applyConfigChanges, fetchDeviceConfig, saveConfigChanges} from "../actions/config-action";
import { logFromClient } from "../actions/clientLogging";

import {connect} from "react-redux";
import Form from "react-jsonschema-form";
import timbersCopyPasteJqueryPlugin from '../jQuery/timbersController'
import exponential from '../jQuery/exponential'
import FormErrorList from "./form-error-list";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {errorMessages} from "../config/config";
import { nullDependencies } from "mathjs";

const uiSchema = {
    "ui:options":  {
        orderable: false,
        removable: false,
    },
    title: {
        classNames: "config-table-caption"
    },
    properties: {
        className: "table-input"
    }
};

export class ConfigurationPage extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
       formData: {},
       present: {},
       formData: {},
       present: {},
       past: [],
       selectedPresetIndex: -1,
       selectedBinIndex: -1,
       selectedTable: false,
       errorList: [],
       error: null
     }

    componentWillMount = () => {
    	if(!this.props.loading) {
    		this.setState({
                formData: this.props.configData ? this.props.configData[this.props.tab]: {},
        		present: this.props.configData ? this.props.configData[this.props.tab]: {},
        		past: [],
        		selectedPresetIndex: -1,
        		selectedBinIndex: -1,
        		selectedTable: false,
        		errorList: [],
        		error: null
            	})
        }
        timbersCopyPasteJqueryPlugin(this)
        exponential(this)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.error !== this.props.error ||
          (prevProps.configData !== this.props.configData)) {
            exponential(this)
            this.setState({
                formData: this.props.configData[this.props.tab],
                errorList: [],
                past: [this.props.configData[this.props.tab]],
                error: this.props.error
            })
            if(this.props.error) {
                const error = errorMessages[this.props.error] || "Unable to save configurations"
                NotificationManager.error(error);
            }
        }
    }
    
    clearErrorList = () =>
      this.setState({
          errorList: [],
          error: null
      })

    clearSelectedPreset = () => {
        this.setState(prevState => {
            let currentPresets = prevState.formData['Hopping Presets']
              .map(row => row.map(col => col))

            for(let y=0; y<currentPresets.length; y++) {
                for(let x=0; x<currentPresets[0].length; x++) {
                    currentPresets[y][x] =
                      y === prevState.selectedPresetIndex ?
                        0 : currentPresets[y][x]
                }
            }

            const newFormData = Object.assign({}, {
                ...prevState.formData,
                'Hopping Presets': currentPresets
            })

            return ({
                formData: newFormData,
                past: [...prevState.past, newFormData ]
            })
        })
    }

    clearTable = () => {
        this.setState(prevState => {
            let currentPresets = prevState.formData['Hopping Presets']
              .map(row => row.map(col => col))

            for(let y=0; y<currentPresets.length; y++) {
                for(let x=0; x<currentPresets[0].length; x++) {
                    currentPresets[y][x] = 0
                }
            }

            const newFormData = Object.assign({}, {
                ...prevState.formData,
                'Hopping Presets': currentPresets
            })

            return ({
                formData: newFormData,
                past: [...prevState.past, newFormData ]
            })
        })
    }

    clearSelectedBin = () => {
        this.setState(prevState => {
            let currentPresets = prevState.formData['Hopping Presets']
              .map(row => row.map(col => col))

            for(let y=0; y<currentPresets.length; y++) {
                for(let x=0; x<currentPresets[0].length; x++) {
                    currentPresets[y][x] =
                      x === prevState.selectedBinIndex ?
                        0 : currentPresets[y][x]
                }
            }

            const newFormData = Object.assign({}, {
                ...prevState.formData,
                'Hopping Presets': currentPresets
            })

            return ({
                formData: newFormData,
                past: [...prevState.past, newFormData ]
            })
        })
    }

    onSubmit = (formData) => {
    	NotificationManager.success("Saved", document.activeElement.name, 3000);
        this.setState({
          errorList: []
        })
        if(this.props.configData) {
            const buttonName = document.activeElement.name
            this.props.configData[this.props.tab] = formData
            //check for button name, and save config.
            //If the user hit the enter key after making a change, we don't want to save it
            //They must select one of the buttons to save.
            if(buttonName === 'Apply Changes')
                return this.props.applyChanges(this.props.configData, this.props.configSchema.fileName)
            else if(buttonName === 'Save as Defaults')
                return this.props.saveChanges(this.props.configData, this.props.configSchema.fileName)
            else
                return
        }
    }

    onUndo = () => {
        this.setState(prevState => {
            prevState.past.pop()
            return ({
                formData: prevState.past[this.state.past.length - 1]
            })
        })
    }

    onChange = (formData) => {
        this.setState(() => {
            return ({
              formData: formData.formData,
            })
        })
    }

    onError = (errorList) => {
        errorList.push('CONFIG VALIDATION IP ADDRESS:  ' + window.location.href);
        errorList.push({buttonPress: document.activeElement.name})
        let errorObj = {
            heading: 'CONFIG VALIDATION ERRORS',
            content: errorList,
        }
        this.setState({
          errorList: errorList
        })

        return this.props.logClient(errorObj)
    }

    render() {
        const onSubmit = ({formData}) => this.onSubmit(formData)

        if(this.props.configSchema !== null) {
            if(this.state.past === null) {
                this.setState({
                    past: [this.state.formData]
                })
            }
            var schema = (
                <div>
                    <NotificationContainer/>
                    {
                      !this.props.configData &&
                        <div>
                          <br/>
                          <div className="alert alert-danger">
                            No configuration data found
                          </div>
                        </div>
                    }
                    {   
                        <Form schema={this.props.configSchema.properties[this.props.tab]}
                              noHtml5Validate={true}
                              showErrorList={true}
                              formData={this.state.formData}
                              noValidate={false}
                              uiSchema={uiSchema}
                              onError={this.onError}
                              onChange={this.onChange}
                              onSubmit={onSubmit}>
                            <span className='required-fields'>* Required Fields</span>
                            <button className='blue-button' name='Apply Changes' id='apply-changes' type="submit">
                                Apply Changes
                            </button>
                            <button className='blue-button' name='Save as Defaults' id='save-defaults' type="submit">
                                Save as Defaults
                            </button>
                        </Form>
                    }
                    <div id="mks-timbers-control">
                        {
                            this.state.past.length > 1 &&
                            <button className="btn btn-danger mks-margin-left-10px" onClick={this.onUndo}>
                                <i className="fa fa-undo"/>
                                &nbsp;
                                Undo
                            </button>
                        }
                        {
                            this.state.selectedPresetIndex >= 0 &&
                            <button className="btn btn-danger mks-margin-left-10px"
                                    onClick={this.clearSelectedPreset}>
                                <i className="fa fa-trash"/>
                                &nbsp;
                                Clear Preset
                            </button>
                        }
                        {
                            this.state.selectedBinIndex >= 0 &&
                            <button className="btn btn-danger mks-margin-left-10px"
                                    onClick={this.clearSelectedBin}>
                                <i className="fa fa-trash"/>
                                &nbsp;
                                Clear Bin
                            </button>
                        }
                        {
                            this.state.selectedTable &&
                            <button className="btn btn-danger mks-margin-left-10px"
                                    onClick={this.clearTable}>
                                <i className="fa fa-trash"/>
                                &nbsp;
                                Clear Table
                            </button>
                        }
                    </div>
                    {
                      this.state.errorList &&
                      this.state.errorList.length > 0 &&
                      this.props.configData &&
                        <FormErrorList
                          errorList={this.state.errorList}
                          clearErrorList={this.clearErrorList}/>
                    }
                </div>
            )
        }

        return (
            <div className="config-panel">
                {schema}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    loading: state.config.loading,
    configSchema: state.config.configSchema,
    configData: state.config.configData,
    configTitle: state.config.configTitle,
    error: state.config.error
});

const mapDispatchToProps = dispatch => ({
    applyChanges: (configData, configTitle) => dispatch(applyConfigChanges(configData, configTitle)),
    saveChanges: (configData, configTitle) => dispatch(saveConfigChanges(configData, configTitle)),
    fetchConfig: (configTitle, schema) => dispatch(fetchDeviceConfig(configTitle, schema)),
    logClient: (errorObj) => dispatch(logFromClient(errorObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
