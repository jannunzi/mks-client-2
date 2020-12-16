import React from 'react';
import {connect} from 'react-redux';
import './nav-bar.css';
import {Dropdown, DropdownButton, ListGroup} from "react-bootstrap";

//dispatch methods
import {fetchDeviceConfig} from '../actions/config-action';
import {currentRole} from "../actions/user-action";

export class NavBar extends React.Component {

    
    fetchConfigFile(schema) {
        this.props.fetchConfig(schema.fileName, schema)
        this.navigateTo(`/device-config/${schema.title}`)
    }

    navigateTo = target => {
        this.props.history.push(target)
    }

    render() {
        return (
            <div className={`mks-nav-bar`}>
                <ListGroup>
                    {/* <ListGroup.Item
                        action
                        onClick={(e) => this.navigateTo("/")}>
                        <i className="fa fa-home"/> Dashboard
                    </ListGroup.Item> */}
                    {this.props.role && this.props.role.privileges.deviceStatus &&
                    <ListGroup.Item
                        action
                        onClick={(e) => this.navigateTo("/device-status")}>
                        <i className="fa fa-wrench"/> Device Status
                    </ListGroup.Item>}
                    {this.props.role && this.props.role.privileges.deviceStatus &&
                    <ListGroup.Item
                        action
                        onClick={(e) => this.navigateTo("/upload-files")}>
                        <i className="fa fa-wrench"/> Extract from Generator
                    </ListGroup.Item>}
                    {
                        this.props.role &&
                        (
                            this.props.role.privileges.deviceConfigCustomer ||
                            this.props.role.privileges.deviceConfigProduct
                        ) &&
                        <ListGroup.Item>
                            <i className="fa fa-cog"/>
                            <DropdownButton
                                className="mks-display-inline"
                                drop='right'
                                title="Device Config"
                                id="dropdown-menu-align-right">
                                {
                                    this.props.schemas.map((schema, index) => {
                                        //we don't want to show the freqencyController.json or 
                                        //basicDriveController.json on the NavBar
                                        //as there are no corresponding config files in /tmp/apply
                                        //frequencyController schema is a $ref in frequencyControllerRandom and
                                        //frequencyControllerXft and basicDriveController is used in DriveController
                                        if(schema.title === 'Frequency Configuration' ||
                                           schema.title === 'Basic Drive Controller' || 
                                           schema.title === 'Gain Scheduler Configuration' ||
                                           schema.title === 'Basic Rail Controller') {
                                            return null
                                        }
                                        else if(schema.properties.hasOwnProperty('Customer') &&
                                        this.props.role.privileges.deviceConfigCustomer)
                                            {
                                                return (
                                                    <Dropdown.Item
                                                        key={index}
                                                        onClick={(e) => this.fetchConfigFile(schema)}>
                                                        {schema.title}
                                                    </Dropdown.Item> 
                                                )
                                            } 
                                        else if(schema.properties.hasOwnProperty('Product') &&
                                        this.props.role.privileges.deviceConfigProduct)
                                            { 
                                                return (
                                                    <Dropdown.Item
                                                        key={index}
                                                        onClick={(e) => this.fetchConfigFile(schema)}>
                                                        {schema.title}
                                                    </Dropdown.Item>
                                                )
                                            }  
                                    })
                                }                                   
                            </DropdownButton>
                        </ListGroup.Item>
                    }
                    {/* {
                        this.props.role &&
                        (
                            this.props.role.privileges.scopeData ||
                            this.props.role.privileges.deviceConfigCustomer ||
                            this.props.role.privileges.deviceConfigProduct
                        ) &&
                        <ListGroup.Item
                            action
                            onClick={(e) => this.navigateTo("/scope-control")}>
                            <i className="fa fa-home"/> Scope Control
                        </ListGroup.Item>
                    } */}
                    {this.props.role && this.props.role.privileges.firmwareUpload &&
                    <ListGroup.Item
                        action
                        onClick={(e) => this.navigateTo("/downloads")}>
                        <i className="fa fa-home"/> Update to Generator
                    </ListGroup.Item>}
                    <ListGroup.Item
                        action
                        onClick={(e) => this.navigateTo("/user-management")}>
                        <i className="fa fa-home"/> User Management
                    </ListGroup.Item>
                    {/*<ListGroup.Item>*/}
                    {/*    <i className="fa fa-cog"/>*/}
                    {/*    <DropdownButton*/}
                    {/*        className="mks-display-inline"*/}
                    {/*        drop='right'*/}
                    {/*        title="Power Station"*/}
                    {/*        id="dropdown-menu-align-right">*/}
                    {/*        <Dropdown.Item*/}
                    {/*            onClick={(e) => this.navigateTo("smith")}>*/}
                    {/*            Smith Chart*/}
                    {/*        </Dropdown.Item>*/}
                    {/*    </DropdownButton>*/}
                    {/*</ListGroup.Item>*/}
                </ListGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        schemas: state.schema.schemas,
        role: state.user.role,
        loading: state.user.loading
    }
}
const mapDispatchToProps = dispatch => ({
    fetchConfig: (configTitle, schema) => dispatch(fetchDeviceConfig(configTitle, schema)),
    currentRole: () => dispatch(currentRole())
        
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);


