import { API_BASE_URL } from '../config.js';


export const FETCH_LOG_FROM_CLIENT_INIT = 'FETCH_LOG_FROM_CLIENT_INIT';
export const fetchLogFromClientInit = (loading) => ({
    type: FETCH_LOG_FROM_CLIENT_INIT,
    loading,
});

export const FETCH_LOG_FROM_CLIENT_SUCCESS = 'FETCH_LOG_FROM_CLIENT_SUCCESS';
export const fetchLogFromClientSuccess = (loading, error) => ({
    type: FETCH_LOG_FROM_CLIENT_SUCCESS,
    loading,
    error
});

export const FETCH_LOG_FROM_CLIENT_ERROR = 'FETCH_LOG_FROM_CLIENT_ERROR';
export const fetchLogFromClientError = (error) => ({
    type: FETCH_LOG_FROM_CLIENT_ERROR,
    error,
});


//async method to send the log configs changes to the server to log in a file
export const logFromClient = (logObj) => async (dispatch) => {
    var responseClone
    //Saving the schema in the init so its available for the device-config table render
    dispatch(fetchLogFromClientInit(true));
    return fetch(`${API_BASE_URL}/writeLog`, {
            method: 'PUT',
            //TO DO:  add in authorization
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(logObj)
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
            dispatch(fetchLogFromClientSuccess(false, false));
        }).catch (err => {
            console.log('error = ', err)
            dispatch(fetchLogFromClientError(err));
        })

};

