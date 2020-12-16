import * as types from '../actions/schema-action'
import reducer from '../reducers/schema-reducer';


describe('Test Generator Schema Reducers', () => {
    it ('Should return the generator schema initial state', () => {
        expect(reducer(undefined, {}, )).toEqual(
            {
                schemas: [],
                loading: false,
                error: ''
            }
        )
    })
    it ('Should handle FETCH_DEVICE_SCHEMA_SUCCESS', () => {
        expect(reducer({}, {
            type: types.FETCH_DEVICE_SCHEMA_SUCCESS,   
            loading: false,
            error: false,        
            schema: [{
                "title": "Hardware Manager Configuration",
                "description": "Defines requirements for the Hardware Manager Configs. Each Config File must contain at least one of 'Product', 'Customer' or 'Trivial'",
                "type": "object",
                "required":["Product"],
                "additionalProperties": false,
                "properties": {
                      "Product": {
                        "description":"MKS Only Configs",
                        "type":"object",
                        "required": [ "Softstart Voltage Threshold", "PAV RF On Threshold", "PAV RF Off Threshold"],
                        "additionalProperties": false,
                        "properties":{
                            "Softstart Voltage Threshold": {
                                "description": "Bulk Voltage at which the soft start is allowed to close the contactor. This parameter is required.",
                                "type":"number"
                            },
            
                            "PAV RF On Threshold": {
                                "description": "Minimum PA Voltage at which the RF is allowed to turn on. This parameter is required.",
                                "type":"number"
                            },
            
                        }
            
                    }
                }
            }]
        })
        ).toEqual(
            {        
                loading: false,
                error: false,        
                schemas: [{
                        "title": "Hardware Manager Configuration",
                        "description": "Defines requirements for the Hardware Manager Configs. Each Config File must contain at least one of 'Product', 'Customer' or 'Trivial'",
                        "type": "object",
                        "required":["Product"],
                        "additionalProperties": false,
                        "properties": {
                              "Product": {
                                "description":"MKS Only Configs",
                                "type":"object",
                                "required": [ "Softstart Voltage Threshold", "PAV RF On Threshold", "PAV RF Off Threshold"],
                                "additionalProperties": false,
                                "properties":{
                                    "Softstart Voltage Threshold": {
                                        "description": "Bulk Voltage at which the soft start is allowed to close the contactor. This parameter is required.",
                                        "type":"number"
                                    },
                    
                                    "PAV RF On Threshold": {
                                        "description": "Minimum PA Voltage at which the RF is allowed to turn on. This parameter is required.",
                                        "type":"number"
                                    },
                    
                                }
                    
                            }
                        }
                    }]
                }

            )
        })
})
