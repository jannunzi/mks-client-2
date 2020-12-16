import {
    LOGIN,
    LOGOUT,
    CURRENT_ROLE,
    INIT,
    ERROR
} from "../actions/user-action";

const initialState = {
    role: {
        role: 'ANONYMOUS',
        privileges: { 
            deviceStatus: true,
            dashboard: true,
            uploadDataEncryptedSbf: false,
            uploadDataUnencryptedSbf: false,
            uploadData: true,
            deviceConfigCustomer: false,
            deviceConfigProduct: false,
            firmwareUpload: false,
            scopeData: false 
        },
    },
    loading: false,
    error: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
        case LOGOUT:
        case CURRENT_ROLE:
            return Object.assign( {}, state, {
                role: Object.assign( {}, state, {
                    role: action.role.role,
                    privileges: Object.assign( {}, {
                        deviceStatus: action.role.privileges.deviceStatus,
                        dashboard: action.role.privileges.dashboard,
                        uploadDataEncryptedSbf: action.role.privileges.uploadDataEncryptedSbf,
                        uploadDataUnencryptedSbf: action.role.privileges.uploadDataUnencryptedSbf,
                        uploadData: action.role.privileges.uploadData,
                        deviceConfigCustomer: action.role.privileges.deviceConfigCustomer,
                        deviceConfigProduct: action.role.privileges.deviceConfigProduct,
                        firmwareUpload: action.role.privileges.firmwareUpload,
                        scopeData: action.role.privileges.scopeData,
                    }),
                }),
                loading: false,
                error: false
            })
        case INIT: 
            return Object.assign( {}, state, {
                loading: true,
            })
        case ERROR:
            return Object.assign( {}, state, {
                loading: false,
                error: action.error
            })
        default:
            return state
    }
}


