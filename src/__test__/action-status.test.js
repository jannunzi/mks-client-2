import * as actions from '../actions/status';
import * as types from '../actions/status';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test Generator Status Actions', () => {
    afterEach( () => {
        fetchMock.restore()
    })
    it ('should create an action to set status data', () => {
        const deviceStatus = {
            hostname: [
                {
                    hostname: 'Gen1_4564390'
                },
                {
                    serial: '4564390'
                },
                {
                    model :'Gen1'
                }
            ],
            uptime: [
                {
                    UptimeSeconds: '134908'
                }
            ],
            missing: 
            {
                configIds: 'SUCCESS',
                hostname: 'SUCCESS',
                serial: 'SUCCESS',
                model: 'SUCCESS',
                uptime: 'SUCCESS',
                firmwareVersion: 'SUCCESS'
            },
            deviceStatus: [
                {
                    deviceStatus: {
                        configIDs: {
                            ConfigIDIncludingIPConfig: {
                                Value: {
                                    _text: '487609'
                                }
                            },
                            ConfigIDExcludingIPConfig: {
                                Value: {
                                    _text: '678765'
                                }
                            }
                        }
                    }
                }
            ],
            firmwareVersion: {
                revisionEdit: "revisionEdit = \"3\"",
                revisionMajor: "revisionEdit = \"1\"",
                revisionMinor: "revisionEdit = \"2\"",
                revisionTag:   "revisionEdit = \"IN\"",
            },
        }
        const expectedAction = {
            type: types.FETCH_DEVICE_STATUS_SUCCESS,
            deviceStatus  
        }
        expect(actions.fetchDeviceStatusSuccess(deviceStatus)).toEqual(expectedAction)
    })
    it ('should create an action to set product name', () => {
        const product = 'EDGE-8560Z'  
        const expectedAction = {
            type: types.FETCH_PRODUCT_NAME_SUCCESS,
            product
        }
        expect(actions.fetchProductNameSuccess(product)).toEqual(expectedAction)
    })
    it ('should execute async actions when fetching generator status data - SUCCESS', () => {
        const deviceStatus = {
            deviceStatus: [{
                configIDs: {
                    ConfigIDIncludingIPConfig: {
                        Value: {
                            _text: '487609'
                        }
                    },
                    ConfigIDExcludingIPConfig: {
                        Value: {
                            _text: '678765'
                        }
                    }
                }
            }],
            firmwareVersion: {
                revisionEdit: "revisionEdit = \"3\"",
                revisionMajor: "revisionEdit = \"1\"",
                revisionMinor: "revisionEdit = \"2\"",
                revisionTag:   "revisionEdit = \"IN\"",
            },
            hostname: [
                {
                    hostname: 'Gen1_4564390'
                },
                {
                    serial: '4564390'
                },
                {
                    model: 'Gen1'
                }
            ],
            uptime: Math.round(134908/60),
            missing: 
                {
                    configIds: 'SUCCESS',
                    hostname: 'SUCCESS',
                    serial: 'SUCCESS',
                    model: 'SUCCESS',
                    uptime: 'SUCCESS',
                    firmwareVersion: 'SUCCESS'
                }
        };
        
        const payload = {
            deviceStatus: [{
                configIDs: {
                    ConfigIDIncludingIPConfig: {
                        Value: {
                            _text: '487609'
                        }
                    },
                    ConfigIDExcludingIPConfig: {
                        Value: {
                            _text: '678765'
                        }
                    }
                }
            }],
                firmwareVersion: {
                    revisionEdit: "revisionEdit = \"3\"",
                    revisionMajor: "revisionEdit = \"1\"",
                    revisionMinor: "revisionEdit = \"2\"",
                    revisionTag:   "revisionEdit = \"IN\"",
                },
                hostname: [
                    {
                        hostname: 'Gen1_4564390'
                    },
                    {
                        serial: '4564390'
                    },
                    {
                        model: 'Gen1'
                    }
                ],
                uptime: Math.round(134908/60),
                missing: 
                    {
                        configIds: 'SUCCESS',
                        hostname: 'SUCCESS',
                        serial: 'SUCCESS',
                        model: 'SUCCESS',
                        uptime: 'SUCCESS',
                        firmwareVersion: 'SUCCESS'
                    },
            };
            const loading = true;
            const error = ''

        fetchMock.get('http://localhost:8081/device-status', {
            status: 200,
            body: JSON.stringify(payload)
        });

        
        const expectedActions = [
            { type: types.FETCH_DEVICE_STATUS_INIT, loading: loading},
            { type: types.FETCH_DEVICE_STATUS_SUCCESS, deviceStatus: payload},
        ]
        const store = mockStore( {deviceStatus})
        return store.dispatch(actions.fetchDeviceStatus()).then(() => {
            //return async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
            
        
    

    })
    it ('should execute async actions when fetching generator status data - ERROR', () => {
        const loading = true
        const error = 'Something bad happened'
        const payload = {
            deviceStatus: [{
                configIDs: {
                    ConfigIDIncludingIPConfig: {
                        Value: {
                            _text: '487609'
                        }
                    },
                    ConfigIDExcludingIPConfig: {
                        Value: {
                            _text: '678765'
                        }
                    }
                }
            }],
                firmwareVersion: {
                    revisionEdit: "revisionEdit = \"3\"",
                    revisionMajor: "revisionEdit = \"1\"",
                    revisionMinor: "revisionEdit = \"2\"",
                    revisionTag:   "revisionEdit = \"IN\"",
                },
                hostname: [
                    {
                        hostname: 'Gen2_4564390'
                    },
                    {
                        serial: '4564390'
                    },
                    {
                        model: 'Gen2'
                    }
                ],
                uptime: Math.round(134908/60),
                missing: 
                    {
                        configIds: 'SUCCESS',
                        hostname: 'SUCCESS',
                        serial: 'SUCCESS',
                        model: 'SUCCESS',
                        uptime: 'SUCCESS',
                        firmwareVersion: 'SUCCESS'
                    },
            };

        fetchMock.restore();
        fetchMock.get('http://localhost:8081/device-status', {
            status: 404,
            body: JSON.stringify(payload)
        });

        const expectedActions = [
            { type: types.FETCH_DEVICE_STATUS_ERROR, error, loading: false }
        ]
        const store = mockStore( {loading, error})
        store.dispatch(actions.fetchDeviceStatusError(error, false));
        expect(store.getActions()).toEqual(expectedActions)
        
    })
})

