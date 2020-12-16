import React from 'react';
import {connect} from 'react-redux';
import {applyConfigChanges, saveConfigChanges, fetchDeviceConfig} from '../actions/config';

import Form from "react-jsonschema-form"
import './device-config.css';

const uiSchema = {
	title: {
	  classNames: "config-table-caption"
	},
	properties: {
		className: "table-input"
	}
};

export class DeviceConfig extends React.Component {	


	handleClick(formData) {
		var buttonName = document.activeElement.name
		if(buttonName === 'Apply Changes')
			return this.props.applyChanges(formData, this.props.configTitle)
		else
			return this.props.saveChanges(formData, this.props.configTitle)		
	}


	render() {
		const onSubmit = ({formData}) => {this.handleClick(formData)};
		if(this.props.schema !== null) {
			var schema = (
				<div className="mks-tabs">
					<Form schema={this.props.schema[0]}
						formData={this.props.configData}
						//I dont think this uiSchema is doing anything
						uiSchema={uiSchema}
						onSubmit={onSubmit}>
						<span className ='required-fields'>* Required Fields</span>
						<button className='blue-button' name='Apply Changes' id='apply-changes' type="submit">
								Apply Changes
						</button>
						<button className='blue-button' name='Save as Defaults' id='save-defaults' type="submit">
								Save as Defaults
						</button>
					</Form>	
					
				</div>
			)
		}

		return (
			<div>
				{schema}
			</div>						
		)
}


}

const mapStateToProps = state => ({
	driveControllerSchema: state.config.driveControllerSchema,
	schema: state.config.schema,
	configData: state.config.configData,
	configTitle: state.config.configTitle,	
});

const mapDispatchToProps = dispatch => ({
	applyChanges: (configData, configTitle) => dispatch(applyConfigChanges(configData, configTitle)),
	saveChanges: (configData, configTitle) => dispatch(saveConfigChanges(configData, configTitle)),
	fetchConfig: (configTitle, schema) => dispatch(fetchDeviceConfig(configTitle, schema)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceConfig);
