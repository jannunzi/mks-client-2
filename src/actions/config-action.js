import { API_BASE_URL } from '../config.js';

export const FETCH_DEVICE_CONFIG_INIT = 'FETCH_DEVICE_CONFIG_INIT';
export const fetchDeviceConfigInit = (configTitle, schema) => ({
    type: FETCH_DEVICE_CONFIG_INIT,
    configTitle,
    schema,
});

export const FETCH_DEVICE_CONFIG_SUCCESS = 'FETCH_DEVICE_CONFIG_SUCCESS';
export const fetchDeviceConfigSuccess = (config) => ({
    type: FETCH_DEVICE_CONFIG_SUCCESS,
    config,
});

export const FETCH_DEVICE_CONFIG_ERROR = 'FETCH_DEVICE_CONFIG_ERROR';
export const fetchDeviceConfigError = error => ({
    type: FETCH_DEVICE_CONFIG_ERROR,
    error,
});


//async method to get the device configuration data
export const fetchDeviceConfig = (configTitle, schema) => async (dispatch) => {
    //Saving the schema in the init so its available for the device-config table render
    var responseClone;
    dispatch(fetchDeviceConfigInit(configTitle, schema));
    return fetch(`${API_BASE_URL}/device-config/${configTitle}`, {
            method: 'GET',
            //TO DO:  add in authorization
            headers: {
                'content-Type': 'application/json',
            },
        }).then( res => {
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
        }).then( json => {
            console.log('configData = ', json)
            dispatch(fetchDeviceConfigSuccess(json));
        }).catch (err => {
            console.log('error = ', err)
            dispatch(fetchDeviceConfigError(err));
        })

};


export const FETCH_SAVED_CONFIG_FILES_INIT = 'FETCH_SAVED_CONFIG_FILES_INIT';
export const fetchSavedConfigFilesInit = () => ({
    type: FETCH_SAVED_CONFIG_FILES_INIT,
});

export const FETCH_SAVED_CONFIG_FILES_SUCCESS = 'FETCH_SAVED_CONFIG_FILES_SUCCESS';
export const fetchSavedConfigFilesSuccess = () => ({
    type: FETCH_SAVED_CONFIG_FILES_SUCCESS,
});

export const FETCH_SAVED_CONFIG_FILES_ERROR = 'FETCH_SAVED_CONFIG_FILES_ERROR';
export const fetchSavedConfigFilesError = error => ({
    type: FETCH_SAVED_CONFIG_FILES_ERROR,
    error,
});


//async method to copy the saved configs from /mnt/config to /tmp/config
export const fetchSavedConfigFiles = () => async (dispatch) => {
    var responseClone
    //Saving the schema in the init so its available for the device-config table render
    dispatch(fetchSavedConfigFilesInit());
    return fetch(`${API_BASE_URL}/saved-config`, {
            method: 'PUT',
            //TO DO:  add in authorization
            headers: {
                'content-Type': 'application/json'
            }
        }).then( res => {
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
        }).then( (configs) => {
            dispatch(fetchSavedConfigFilesSuccess());
        }).catch (err => {
            console.log('error = ', err)
            dispatch(fetchSavedConfigFilesError(err));
        })

};

export const APPLY_DEVICE_CONFIG_INIT = 'APPLY_DEVICE_CONFIG_INIT';
export const applyDeviceConfigInit = (loading, error) => ({
    type: APPLY_DEVICE_CONFIG_INIT,
    loading,
    error
});

export const APPLY_DEVICE_CONFIG_SUCCESS = 'APPLY_DEVICE_CONFIG_SUCCESS';
export const applyDeviceConfigSuccess = (loading, error) => ({
    type: APPLY_DEVICE_CONFIG_SUCCESS,
    loading,
    error
});

export const APPLY_DEVICE_CONFIG_ERROR = 'APPLY_DEVICE_CONFIG_ERROR';
export const applyDeviceConfigError = (loading, error) => ({
    type: APPLY_DEVICE_CONFIG_ERROR,
    loading,
    error
});

//async method to get the device configuration
export const applyConfigChanges = (configData, configTitle) => async (dispatch) => {

    dispatch(applyDeviceConfigInit());

    return fetch(`${API_BASE_URL}/applyConfigs/${configTitle}`, {
            method: 'PUT',
            body: JSON.stringify(configData),
            //TO DO:  add in authorization
            headers: {
                'content-Type': 'application/json'
            }
        }).then( res => {
            console.log('res = ', res)
            if (res.ok) {
                dispatch(applyDeviceConfigSuccess());
            }           
        }).catch( err => {
            dispatch(applyDeviceConfigError(false, err.toString()));
        })
    }


export const SAVE_DEVICE_CONFIG_INIT = 'SAVE_DEVICE_CONFIG_INIT';
export const saveDeviceConfigInit = (loading, error) => ({
    type: SAVE_DEVICE_CONFIG_INIT,
    loading,
    error
});

export const SAVE_DEVICE_CONFIG_SUCCESS = 'SAVE_DEVICE_CONFIG_SUCCESS';
export const saveDeviceConfigSuccess = (loading, error) => ({
    type: SAVE_DEVICE_CONFIG_SUCCESS,
    loading,
    error
});

export const SAVE_DEVICE_CONFIG_ERROR = 'SAVE_DEVICE_CONFIG_ERROR';
export const saveDeviceConfigError = (loading, error) => ({
    type: SAVE_DEVICE_CONFIG_ERROR,
    loading,
    error
});

//async method to get the device configuration
export const saveConfigChanges = (configData, configTitle) => async (dispatch) => {  

    dispatch(saveDeviceConfigInit());
    return fetch(`${API_BASE_URL}/saveConfigs/${configTitle}`, {
                method: 'PUT',
                body: JSON.stringify(configData),
                //TO DO:  add in authorization
                headers: {
                    'content-Type': 'application/json'
                },
        }).then (res => {
            console.log('res = ', res)
            if (res.ok) {
                dispatch(saveDeviceConfigSuccess());
            }           
        }).catch( err => {
            dispatch(saveDeviceConfigError(false, err.toString()));
        })
};
