import * as types from '../actions/status';
import reducer from '../reducers/status';


describe('Test Generator Status Reducers', () => {
    it ('Should return the generator status initial state', () => {
        expect(reducer(undefined, {}, )).toEqual(
            {
                model: '',
                serial: '',
                firmware: '',
                hostname: '',
                configWithIP: '',
                configWithNoIP: '',
                uptime: '',
                missing: [],
                product: '',
                loading: false,
                error: ''
            }
        )
    })
    it ('Should handle FETCH_DEVICE_STATUS_SUCCESS', () => {
        expect(reducer({}, {
            type: types.FETCH_DEVICE_STATUS_SUCCESS,
            loading: false,
            error: false,
            deviceStatus: {
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
        })
        ).toEqual(
            {
                loading: false,
                error: false,
                model: 'Gen1',
                serial: '4564390',
                hostname: 'Gen1_4564390',
                configWithIP: '487609',
                configWithNoIP: '678765',
                uptime: Math.round(134908/60),
                firmware: 'IN_1.2.3',
                missing: 
                    {
                        configIds: 'SUCCESS',
                        hostname: 'SUCCESS',
                        serial: 'SUCCESS',
                        model: 'SUCCESS',
                        uptime: 'SUCCESS',
                        firmwareVersion: 'SUCCESS'
                    }
                
            }
        )
    })
    it ('Should handle FETCH_PRODUCT_NAME_SUCCESS', () => {
        expect(reducer({}, {
            type: types.FETCH_PRODUCT_NAME_SUCCESS,
            loading: false,
            error: false,
            product: 'EDGE-500R40Z'
        })
        ).toEqual(
            {
                loading: false,
                error: false,
                product: 'EDGE-500R40Z'
            }
        )
    })
    
    
    
})