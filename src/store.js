import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

import thunk from 'redux-thunk';
import schemaReducer from "./reducers/schema-reducer";
import configReducer from './reducers/config-reducer';
import statusReducer from './reducers/status';
import firmwareDownloadReducer from './reducers/firmware-download';
import uploadFileReducer from './reducers/upload-files';
import userReducer from "./reducers/user-reducer";
import scopePresetsReducer from "./reducers/scope-presets-reducer";
import scopeReducer from "./reducers/scope-reducer";

//import {reducer as formReducer} from 'redux-form';
//import {loadAuthToken} from './local-storage';
//import authReducer from './reducers/auth';
//import {setAuthToken, refreshAuthToken} from './actions/auth';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    combineReducers({
            config: configReducer,
            status: statusReducer,
            schema: schemaReducer,
            firmwareDownload: firmwareDownloadReducer,
            user: userReducer,
            presets: scopePresetsReducer,
            uploadFiles: uploadFileReducer,
            scopeReducer
    }),
    composeEnhancer(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
// const authToken = loadAuthToken();
// if (authToken) {
//     const token = authToken;
//     store.dispatch(setAuthToken(token));
//     store.dispatch(refreshAuthToken());
// }

export default store;
