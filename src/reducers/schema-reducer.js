import {
    FETCH_DEVICE_SCHEMA_INIT,
    FETCH_DEVICE_SCHEMA_SUCCESS,
    FETCH_DEVICE_SCHEMA_ERROR
} from '../actions/schema-action';

const initialState = {
    schemas: [],
    loading: false,
    error: '',
}

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_DEVICE_SCHEMA_INIT) {
        return Object.assign({}, state, {
            loading: true,
        });
        
    } else if (action.type === FETCH_DEVICE_SCHEMA_SUCCESS) {  
        return Object.assign( {}, state, {
            schemas: action.schema,
            loading: false,
            error: false,
        })

    } else if (action.type === FETCH_DEVICE_SCHEMA_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });

    } else 
        return state;
}
