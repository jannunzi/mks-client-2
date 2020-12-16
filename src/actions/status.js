import { API_BASE_URL } from '../config.js';

export const FETCH_DEVICE_STATUS_INIT = 'FETCH_DEVICE_STATUS_INIT';
export const fetchDeviceStatusInit = loading => ({
    type: FETCH_DEVICE_STATUS_INIT,
    loading
});

export const FETCH_DEVICE_STATUS_SUCCESS = 'FETCH_DEVICE_STATUS_SUCCESS';
export const fetchDeviceStatusSuccess = deviceStatus => ({
    type: FETCH_DEVICE_STATUS_SUCCESS,
    deviceStatus,
});

export const FETCH_DEVICE_STATUS_ERROR = 'FETCH_DEVICE_STATUS_ERROR';
export const fetchDeviceStatusError = (error, loading) => ({
    type: FETCH_DEVICE_STATUS_ERROR,
    error,
    loading
});

export const FETCH_PRODUCT_NAME_INIT = 'FETCH_PRODUCT_NAME_INIT';
export const fetchProductNameInit = loading => ({
    type: FETCH_PRODUCT_NAME_INIT,
    loading
});

export const FETCH_PRODUCT_NAME_SUCCESS = 'FETCH_PRODUCT_NAME_SUCCESS';
export const fetchProductNameSuccess = product => ({
    type: FETCH_PRODUCT_NAME_SUCCESS,
    product,
});

export const FETCH_PRODUCT_NAME_ERROR = 'FETCH_PRODUCT_NAME_ERROR';
export const fetchProductNameError = (error, loading) => ({
    type: FETCH_PRODUCT_NAME_ERROR,
    loading,
    error
});


//async method to get the device status
export const fetchDeviceStatus = () => (dispatch) => {
    var responseClone;
    var loading = true
    dispatch(fetchDeviceStatusInit(loading));
    return fetch(`${API_BASE_URL}/device-status`, {
        method: 'GET',
        //TO DO:  add in authorization
        headers: {
            'content-type': 'application/json'
        },
    }).then(res => {
        if (res.ok) {
            // console.log('return res json = ', res.json())
            responseClone = res.clone()
            return res.json();
        }           
    }).catch( err => {
        if(err instanceof SyntaxError) {
            return responseClone.text()
        }
    }).then (deviceStatus => {
        dispatch(fetchDeviceStatusSuccess(deviceStatus));
    }).catch (err => {
        loading = false
        dispatch(fetchDeviceStatusError(err, loading))
    })
};

//async method to get the device product name
export const fetchProductName = () => (dispatch) => {
    dispatch(fetchProductNameInit());
    return fetch(`${API_BASE_URL}/product-name`, {
        method: 'GET',
        //TO DO:  add in authorization
        headers: {
            'content-type': 'application/json'
        },
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    })
    .then (name => {
        dispatch(fetchProductNameSuccess(name));
    })
    .catch (err => {
        dispatch(fetchProductNameError(err))
    })
};