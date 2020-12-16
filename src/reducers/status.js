import {
    FETCH_DEVICE_STATUS_INIT,
    FETCH_DEVICE_STATUS_SUCCESS,
    FETCH_DEVICE_STATUS_ERROR,
    FETCH_PRODUCT_NAME_INIT,
    FETCH_PRODUCT_NAME_SUCCESS,
    FETCH_PRODUCT_NAME_ERROR
} from '../actions/status';


const initialState = {
    model: '',
    serial: '',
    firmware: '',
    hostname: '',
    configWithIP: '',
    configWithNoIP: '',
    uptime: '',
    missing: [],
    product: '',
    loading: false,
    error: ''
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_DEVICE_STATUS_INIT) {
        return Object.assign( {}, state, {
            loading: action.loading,
        });
    } else if (action.type === FETCH_DEVICE_STATUS_SUCCESS) {
        var status = action.deviceStatus
        var model = '';
        var serial = '';
        let hostnameStr = '';
        let uptimeMinutes = 0;
        let configWithIP = '';
        let configWithNoIP = '';
        let revMajor = '';
        let revMinor = '';
        let revTag = '';
        let revEdit = '';
        let missing = {
                configIds: 'SUCCESS',
                hostname: 'SUCCESS',
                serial: 'SUCCESS',
                model: 'SUCCESS',
                uptime: 'SUCCESS',
                firmwareVersion: 'SUCCESS'
            }

        missing = Object.assign({}, status.missing, {
            configIds: status.missing.configIds,
            hostname: status.missing.hostname,
            serial: status.missing.serial,
            model: status.missing.model,
            uptime: status.missing.uptime,
            firmwareVersion: status.missing.firmwareVersion
        })
        if(missing.configIds === 'SUCCESS') {
            configWithIP = status.deviceStatus[0].deviceStatus.configIDs.ConfigIDIncludingIPConfig.Value._text;
            configWithNoIP = status.deviceStatus[0].deviceStatus.configIDs.ConfigIDExcludingIPConfig.Value._text;    
        }
        if(missing.hostname === 'SUCCESS')
            hostnameStr = status.hostname[0].hostname;
        if(missing.serial ==='SUCCESS')
            serial = status.hostname[1].serial;
        if(missing.model === 'SUCCESS')
            model = status.hostname[2].model;
        if(missing.uptime === 'SUCCESS')
            uptimeMinutes = Math.round(status.uptime[0].UptimeSeconds/60);

        if(missing.firmwareVersion === 'SUCCESS') {
            revTag = status.firmwareVersion.revisionTag.split(/[ \ ]/);
            revTag = revTag[2].split(/[ " ]/)
            revTag = revTag[1];
            revTag = revTag.concat('_');

            revMajor = status.firmwareVersion.revisionMajor.split(/[ \ ]/);
            revMajor = revMajor[2].split(/[ " ]/)
            revMajor = revTag.concat(parseInt(revMajor[1]));
            revMajor = revMajor.concat('.')

            revMinor = status.firmwareVersion.revisionMinor.split(/[ \ ]/);
            revMinor = revMinor[2].split(/[ " ]/)
            revMinor = revMajor.concat(parseInt(revMinor[1]));
            revMinor = revMinor.concat('.')

            revEdit = status.firmwareVersion.revisionEdit.split(/[ \ ]/);
            revEdit = revEdit[2].split(/[ " ]/)
            revEdit = revMinor.concat(parseInt(revEdit[1]));
        }

        return Object.assign( {}, state, {
            model: model,
            serial: serial,
            firmware: revEdit,
            hostname: hostnameStr,
            configWithIP: configWithIP,
            configWithNoIP: configWithNoIP,
            uptime: uptimeMinutes,
            missing: missing,
            loading: false,
            error: false
        });
    } else if (action.type === FETCH_DEVICE_STATUS_ERROR) {
        return Object.assign( {}, state, {
            loading: false,
            error: action.error
        });
    } else if (action.type === FETCH_PRODUCT_NAME_INIT) {
        return Object.assign( {}, state, {
            loading: true,
        });
    } else if (action.type === FETCH_PRODUCT_NAME_SUCCESS) {
        return Object.assign( {}, state, {
            product: action.product,
            loading: false,
            error: false
        });
    } else if (action.type === FETCH_PRODUCT_NAME_ERROR) {
        return Object.assign( {}, state, {
            loading: false,
            error: true
        });
    } else
        return state;
}

