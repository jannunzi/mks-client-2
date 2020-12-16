import * as actions from '../actions/clientLogging';
import * as types from '../actions/clientLogging';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test Client Logging Actions', () => {
    afterEach( () => {
        fetchMock.restore()
    })
    it ('should create an action to write client log', () => {
        const loading = false;
        const error = false

        var firmwareFile = [];
        firmwareFile.push('firmware download file');
        firmwareFile.push((65824561 / (1024*1024)).toPrecision(3) + 'MB')
        firmwareFile.push('FROM IP ADDRESS: ' + window.location.href)
        var logObj = {
            heading: 'FIRMWARE DOWNLOAD',
            content: firmwareFile
        };
        
        const expectedAction = {
            type: types.FETCH_LOG_FROM_CLIENT_SUCCESS,
            loading,
            error  
        }
        expect(actions.fetchLogFromClientSuccess(loading, error)).toEqual(expectedAction)
    })
    
    it ('should execute async actions when posting client log data - SUCCESS', () => {
        var firmwareFile = [];
        firmwareFile.push('firmware download file');
        firmwareFile.push((65824561 / (1024*1024)).toPrecision(3) + 'MB')
        firmwareFile.push('FROM IP ADDRESS: ' + window.location.href)
        var logObj = {
            heading: 'FIRMWARE DOWNLOAD',
            content: firmwareFile
        };
        
        const payload = {
            heading: 'FIRMWARE DOWNLOAD',
            content: firmwareFile
            };
        const loading = true;
        const error = ''

        fetchMock.put('http://localhost:8081/writeLog', {
            status: 200,
            body: JSON.stringify(payload)
        });

        
        const expectedActions = [
            { type: types.FETCH_LOG_FROM_CLIENT_INIT, loading: true},
            { type: types.FETCH_LOG_FROM_CLIENT_SUCCESS, error: false, loading: false},
        ]
        const store = mockStore( {logObj})
        return store.dispatch(actions.logFromClient(logObj)).then(() => {
            //return async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
        
        
        
    

    })
    it ('should execute async actions when fetching generator status data - ERROR', () => {
        const loading = true
        const error = 'Something bad happened'
        const payload = {
            heading: 'FIRMWARE DOWNLOAD',
            };

        fetchMock.restore();
        fetchMock.put('http://localhost:8081/writLog', {
            status: 404,
            body: JSON.stringify(payload)
        });

        const expectedActions = [
            { type: types.FETCH_LOG_FROM_CLIENT_ERROR, error: error }
        ]
        const store = mockStore( {loading, error})
        store.dispatch(actions.fetchLogFromClientError(error));
        expect(store.getActions()).toEqual(expectedActions)
        
    })
})

