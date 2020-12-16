import React from 'react'

import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {Nav} from "react-bootstrap";

import ConfigurationPage from "./configuration-page";

export class ConfigurationTabs extends React.Component{
    
    // Default tab is Customer
    state = {
    	properties: this.props.configSchema.properties,
        configurationTab: this.props.role.privileges.deviceConfigProduct ? 'Product' : 'Customer'
    }

    componentWillMount() {
        //if the user refreshes the browser while on a config page, its easier to
        //redirect to 'home', instead of trying to recreate the schema and config for the page
        if(this.props.role.role === 'ANONYMOUS') {
            window.location.replace('/')
        }
        if(!this.props.loading) {
            this.selectDefaultConfigurationTab()
        }
      }
  
      componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.loading) {
            this.selectDefaultConfigurationTab()        
        }
      }

    selectDefaultConfigurationTab = () => {
      // check to see if the selected configurationTab is valid
      let currentConfigurationTab = this.state.configurationTab
      let configurationTabExists = false
      let firstConfigurationTab = null
      Object.keys(this.props.configSchema.properties).map((k) => {
        if(firstConfigurationTab === null) {
          firstConfigurationTab = k
        }
        if(currentConfigurationTab === k) {
          configurationTabExists = true
        }
      })
      // if not, then choose the first one
      if(!configurationTabExists) {
        this.setState({
          configurationTab: firstConfigurationTab
        })
      }
    }

    handleTabChange = (configurationTab) => this.setState({ configurationTab });

    render() {
        return(
            <div>
                <h1>{this.props.configTitle}</h1>
                <div>
                    <Nav variant="pills" defaultActiveKey="/Customer">
                        {
                            Object.keys(this.props.configSchema.properties).map((k) => {
                                if(k === "Product" && this.props.role.privileges.deviceConfigProduct) {
                                    return (
                                        <Nav.Item activekey={k} key={k} onClick={() => this.handleTabChange(k)}>
                                            <Nav.Link className={this.state.configurationTab === k?'active':''}>{k}</Nav.Link>
                                        </Nav.Item>
                                    )
                                } else if(k !== "Product") {
                                    return (
                                        <Nav.Item activekey={k} key={k} onClick={() => this.handleTabChange(k)}>
                                            <Nav.Link className={this.state.configurationTab === k?'active':''}>{k}</Nav.Link>
                                        </Nav.Item>
                                    )
                                } else {
                                    return null
                                }
                            })
                        }
                    </Nav>

                    {
                        Object.keys(this.props.configSchema.properties).map((k, index) => {
                            if(k === "Product" && this.props.role.privileges.deviceConfigProduct && 
                                k === this.state.configurationTab) {
                                return (
                                    <ConfigurationPage
                                        key={index}
                                        tab={k}
                                        configurationSchema={this.props.configSchema.properties[k]}/>
                                )
                            } else if(k !== "Product"  && k === this.state.configurationTab) {
                                return (
                                    <ConfigurationPage
                                        key={index}
                                        tab={k}
                                        configurationSchema={this.props.configSchema.properties[k]}/>
                                )
                            }
                        })
                    }                   
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        role: state.user.role,
        loading: state.config.loading,
        configSchema: state.config.configSchema,
        configTitle: state.config.configTitle
    }
}
export default connect(mapStateToProps)(ConfigurationTabs);
