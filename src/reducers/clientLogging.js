import {
    FETCH_LOG_FROM_CLIENT_INIT,
    FETCH_LOG_FROM_CLIENT_SUCCESS,
    FETCH_LOG_FROM_CLIENT_ERROR,
} from '../actions/clientLogging';

const initialState = {
    //object used to send client log information to server
    loading: false,
    error: false
}

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_LOG_FROM_CLIENT_INIT) {
        return Object.assign({}, state, {
            loading: true,
        });
        
    } else if (action.type === FETCH_LOG_FROM_CLIENT_SUCCESS) {
        return Object.assign( {}, state, {
            loading: false,
            error: false,
        })
        
    } else if (action.type === FETCH_LOG_FROM_CLIENT_ERROR) {
        return Object.assign( {}, state, {
            loading: false,
            error: action.error
        })
    } else 
        return state


}