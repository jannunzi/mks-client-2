import {
    FETCH_UPLOAD_FILES_INIT,
    FETCH_UPLOAD_FILES_SUCCESS,
    FETCH_UPLOAD_FILES_ERROR,
} from '../actions/upload-files';


const initialState = {
    uploadResults: {missing: []},
    loading: false,
    error: false
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_UPLOAD_FILES_INIT) {
        return Object.assign( {}, state, {
            loading: action.loading,
        });
    } else if (action.type === FETCH_UPLOAD_FILES_SUCCESS) {
        return Object.assign( {} , state, {
            loading: false,
            error: false,
            uploadResults: action.uploadResults
        });
    } else if (action.type === FETCH_UPLOAD_FILES_ERROR) {
        return Object.assign( {}, state, {
            loading: false,
            error: action.error
        })
    } else {
        return state
    }
}
