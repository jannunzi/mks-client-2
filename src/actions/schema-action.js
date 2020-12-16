import { API_BASE_URL } from '../config.js';

export const FETCH_DEVICE_SCHEMA_INIT = 'FETCH_DEVICE_SCHEMA_INIT';
export const fetchDeviceSchemaInit = loading => ({
    type: FETCH_DEVICE_SCHEMA_INIT,
    loading
});

export const FETCH_DEVICE_SCHEMA_SUCCESS = 'FETCH_DEVICE_SCHEMA_SUCCESS';
export const fetchDeviceSchemaSuccess = (schema) => ({
    type: FETCH_DEVICE_SCHEMA_SUCCESS,
    schema,
});

export const FETCH_DEVICE_SCHEMA_ERROR = 'FETCH_DEVICE_SCHEMA_ERROR';
export const fetchDeviceSchemaError = error => ({
    type: FETCH_DEVICE_SCHEMA_ERROR,
    error
});

//async method to get the device configuration schema
export const fetchDeviceSchema = () => async (dispatch) => {
    var responseClone

    dispatch(fetchDeviceSchemaInit());   
    return fetch(`${API_BASE_URL}/device-schema`, {
            method: 'GET',
            //TO DO:  add in authorization
            headers: {
                'content-Type': 'application/json'
            },
        }).then(res => {
            // console.log('res = ', res)
            if (res.ok) {
                // console.log('return res json = ', res.json())
                responseClone = res.clone()
                return res.json();
            }
        }).catch( err => {
            if(err instanceof SyntaxError) {
                return responseClone.text()
            }
        }).then(schema => {
            dispatch(fetchDeviceSchemaSuccess(schema));
            
        }).catch (err => {
            dispatch(fetchDeviceSchemaError(err));
        })  
};