import {
    FETCH_FIRMWARE_DOWNLOAD_INIT,
    FETCH_FIRMWARE_DOWNLOAD_SUCCESS,
    FETCH_FIRMWARE_DOWNLOAD_ERROR,
} from '../actions/firmware-download';

const initialState = {
    loading: false,
    error: ''
};

export default function reducer(state = initialState, action) {
    console.log('action = ', action.type);
    if (action.type === FETCH_FIRMWARE_DOWNLOAD_INIT) {
        console.log('Enter reducer: FETCH_FIRMWARE_DOWNLOAD_INIT');
        return Object.assign( {}, state, {
            loading: true,
        });
    } else if (action.type === FETCH_FIRMWARE_DOWNLOAD_SUCCESS) {
        console.log('action = ', action)
        
        return Object.assign( {}, state, {            
            loading: false,
            error: action.error
        });
    } else if (action.type === FETCH_FIRMWARE_DOWNLOAD_ERROR) {
        return Object.assign( {}, state, {
            loading: false,
            error: action.error
        });
    } else
        return state;
}

