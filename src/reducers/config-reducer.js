import {

    FETCH_SAVED_CONFIG_FILES_INIT,

    FETCH_SAVED_CONFIG_FILES_SUCCESS,

    FETCH_SAVED_CONFIG_FILES_ERROR,

    FETCH_DEVICE_CONFIG_INIT,

    FETCH_DEVICE_CONFIG_SUCCESS,

    FETCH_DEVICE_CONFIG_ERROR,

    APPLY_DEVICE_CONFIG_INIT,

    APPLY_DEVICE_CONFIG_SUCCESS,

    APPLY_DEVICE_CONFIG_ERROR,

    SAVE_DEVICE_CONFIG_INIT,

    SAVE_DEVICE_CONFIG_SUCCESS,

    SAVE_DEVICE_CONFIG_ERROR

} from '../actions/config-action';



const initialState = {

    //object used to render table component
    configData: [],
    configSchema: [],
    configTitle: '',
    loading: false,
    error: ''
};



export default function reducer(state = initialState, action) {

    if (action.type === FETCH_SAVED_CONFIG_FILES_INIT) {

        return Object.assign({}, state, {

            loading: true,

        });


    } else if (action.type === FETCH_SAVED_CONFIG_FILES_SUCCESS) {

        return Object.assign({}, state, {

            loading: false,

            error: false,

        });

        
    } else if (action.type === FETCH_SAVED_CONFIG_FILES_ERROR) {

        return Object.assign({}, state, {

            loading: false,

            error: action.error

        });

        

    } else if (action.type === FETCH_DEVICE_CONFIG_INIT) {

        return Object.assign({}, state, {

            configTitle: action.schema.title,

            configSchema: action.schema,

            loading: true,

        });



    } else if (action.type === FETCH_DEVICE_CONFIG_SUCCESS) {

        return Object.assign({}, state, {

            configData: action.config,

            loading: false,

            error: false,

        });

        

    } else if (action.type === FETCH_DEVICE_CONFIG_ERROR) {

        return Object.assign({}, state, {

            loading: false,

            error: action.error

        });

        

    } else if (action.type === APPLY_DEVICE_CONFIG_INIT) {

        return Object.assign({}, state, {

            loading: true,

            error: false,

        });



    } else if (action.type === APPLY_DEVICE_CONFIG_SUCCESS) {

        return Object.assign({}, state, {

            loading: false,

            error: false

        });



    } else if (action.type === APPLY_DEVICE_CONFIG_ERROR) {

        return Object.assign({}, state, {            

            loading: false,

            error: action.error

        });

    } else if (action.type === SAVE_DEVICE_CONFIG_INIT) {

        return Object.assign({}, state, {

            loading: true,

            error: false,

        });



    } else if (action.type === SAVE_DEVICE_CONFIG_SUCCESS) {

        return Object.assign({}, state, {

            loading: false,

            error: false

        });



    } else if (action.type === SAVE_DEVICE_CONFIG_ERROR) {

        return Object.assign({}, state, {

            loading: false,

            error: action.error

        });

    }

    else

        return state;

}

