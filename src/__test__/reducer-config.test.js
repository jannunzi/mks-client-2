import * as types from '../actions/config-action';
import reducer from '../reducers/config-reducer';


describe('Test Generator Config Reducers', () => {
    it ('Should return the generator config initial state', () => {
        expect(reducer(undefined, {}, )).toEqual(
            {
                configData: [],
                configSchema: [],
                configTitle: '',
                loading: false,
                error: ''               
            }
        )
    })
    it ('Should handle FETCH_DEVICE_CONFIG_SUCCESS', () => {
    expect(reducer({}, {
        type: types.FETCH_DEVICE_CONFIG_SUCCESS,
        loading: false,
        error: false,
        config: {
                "Product": {
                    "Softstart Voltage Threshold": 0,
                    "PAV RF On Threshold": 0.8,
                    "PAV RF Off Threshold": 10.0
                }
        }
    })
    ).toEqual(
        {
        loading: false,
        error: false,
        configData: {
                "Product":{
                    "Softstart Voltage Threshold": 0,
                    "PAV RF On Threshold": 0.8,
                    "PAV RF Off Threshold": 10.0
                }
            }
        }
    )
    })
})