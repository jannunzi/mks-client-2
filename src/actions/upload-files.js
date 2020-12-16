import { API_BASE_URL } from '../config.js';

export const FETCH_UPLOAD_FILES_INIT = 'FETCH_UPLOAD_FILES_INIT';
export const fetchUploadFilesInit = loading => ({
    type: FETCH_UPLOAD_FILES_INIT,
    loading
});

export const FETCH_UPLOAD_FILES_SUCCESS = 'FETCH_UPLOAD_FILES_SUCCESS';
export const fetchUploadFilesSuccess = uploadResults => ({
    type: FETCH_UPLOAD_FILES_SUCCESS,
    uploadResults,
});

export const FETCH_UPLOAD_FILES_ERROR = 'FETCH_UPLOAD_FILES_ERROR';
export const fetchUploadFilesError = error => ({
    type: FETCH_UPLOAD_FILES_ERROR,
    error
});

//async method to get the upload file request
export const fetchUploadFiles = (fileList) => (dispatch) => {
    var responseClone;
    console.log('Enter fetchUploadFiles async action', fileList);
    console.log('file list stringify = ', JSON.stringify(Object.assign({}, fileList)))
    dispatch(fetchUploadFilesInit(true));
    return fetch(`${API_BASE_URL}/upload-files`, {
        method: 'PUT',
        //TO DO:  add in authorization
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(Object.assign({}, fileList))
    }).then(res => {
        console.log('res = ', res)
        if (res.ok) {
            // console.log('return res json = ', res.json())
            responseClone = res.clone()
            return res.json();
        }
    }).catch( err => {
        if(err instanceof SyntaxError) {
            return responseClone.text()
        }
    }).then (uploadResults => {
        dispatch(fetchUploadFilesSuccess(uploadResults));
    }).catch (err => {
        console.log('error = ', err)
        dispatch(fetchUploadFilesError(err))
    })
};
