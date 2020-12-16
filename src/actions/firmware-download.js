import { API_BASE_URL } from '../config.js';
import { logFromClient } from "../actions/clientLogging";


export const FETCH_FIRMWARE_DOWNLOAD_INIT = 'FETCH_FIRMWARE_DOWNLOAD_INIT';
export const fetchFirmwareDownloadInit = loading => ({
    type: FETCH_FIRMWARE_DOWNLOAD_INIT,
    loading
});

export const FETCH_FIRMWARE_DOWNLOAD_SUCCESS = 'FETCH_FIRMWARE_DOWNLOAD_SUCCESS';
export const fetchFirmwareDownloadSuccess = error => ({
    type: FETCH_FIRMWARE_DOWNLOAD_SUCCESS,
    error,
});

export const FETCH_FIRMWARE_DOWNLOAD_ERROR = 'FETCH_FIRMWARE_DOWNLOAD_ERROR';
export const fetchFirmwareDownloadError = error => ({
    type: FETCH_FIRMWARE_DOWNLOAD_ERROR,
    error
});


//async method to get the device status
export const fetchFirmwareDownload = (file) => (dispatch) => {
    var firmwareFile = [];
    firmwareFile.push(file.name);
    firmwareFile.push((file.size / (1024*1024)).toPrecision(3) + 'MB')
    firmwareFile.push('FROM IP ADDRESS: ' + window.location.href)
    var firmwareObj = {
        heading: 'FIRMWARE DOWNLOAD',
        content: firmwareFile
    };
    dispatch(logFromClient(firmwareObj))
    
    var responseClone
    const formData = new FormData();
    formData.append('IronNewt.zcz', file)
    formData.append('name', 'IronNewt.zcz')
    
    console.log('formData = ', Array.from(formData.entries()))

    dispatch(fetchFirmwareDownloadInit());
    return fetch(`${API_BASE_URL}/firmware-download`, {
        method: 'POST',
        //TO DO:  add in authorization
        
        body: formData,
    })
    .then(res => {
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
    })
    .then (status => {
        console.log('status = ', status);
        dispatch(fetchFirmwareDownloadSuccess(status));
    })
    .catch (err => {
        dispatch(fetchFirmwareDownloadError(err))
    })
};
