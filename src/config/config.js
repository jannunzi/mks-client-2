export const localUrl = "http://localhost:8081"
export const remoteUrl = "http://mks-server.herokuapp.com"

export const errorMessages = {
  "TypeError: Failed to fetch": "Server communication error"
}
export const scopePresets = {
    presets: [
        {
            label: "Power Control",
            channels: [
                {label: "Channel 1", value: "Actual Setpoint"},
                {label: "Channel 2", value: "Forward Power"},
                {label: "Channel 3", value: "Reserve Power"},
                {label: "Channel 4", value: "Gamma Real"},
                {label: "Channel 5", value: "Gamma Imag"},
                {label: "Channel 6", value: "Pulse State"},
                {label: "Channel 7", value: "PA Drive Setpoint"},
                {label: "Channel 8", value: "Frequency"},
                {label: "Channel 9", value: "Rail Setpoint"},
                {label: "Channel 10", value: "Disabled"},
                {label: "Channel 11", value: "Disabled"},
                {label: "Channel 12", value: "Disabled"},
                {label: "Channel 13", value: "Disabled"},
                {label: "Channel 14", value: "Disabled"},
                {label: "Channel 15", value: "Disabled"},
                {label: "Channel 16", value: "Disabled"}
                ],
            description: [
                {label: "Samples Per Second", value: 10003},
                {label: "Number of Data Points", value: 233016},
                {label: "Pretrigger %", value: 99},
                {label: "Trigger Holdoff (ms)", value: 0},
                {label: "Channel 1", value: "Actual Setpoint"},
                {label: "Channel 2", value: "Forward Power"},
                {label: "Channel 3", value: "Reserve Power"},
                {label: "Channel 4", value: "Gamma Real"},
                {label: "Channel 5", value: "Gamma Imag"},
                {label: "Channel 6", value: "Pulse State"},
                {label: "Channel 7", value: "PA Drive Setpoint"},
                {label: "Channel 8", value: "Frequency"},
                {label: "Channel 9", value: "Rail Setpoint"},
                {label: "Channel 10", value: "Disabled"},
                {label: "Channel 11", value: "Disabled"},
                {label: "Channel 12", value: "Disabled"},
                {label: "Channel 13", value: "Disabled"},
                {label: "Channel 14", value: "Disabled"},
                {label: "Channel 15", value: "Disabled"},
                {label: "Channel 16", value: "Disabled"}
            ]},
        {
            label: "High Speed Power Control",
            description: [
                {label: "Samples Per Second", value: 139508},
                {label: "Number of Data Points", value: 262144},
                {label: "Pretrigger %", value: 99},
                {label: "Trigger Holdoff (ms)", value: 0},
                {label: "Channel 1", value: "Actual Setpoint"},
                {label: "Channel 2", value: "Forward Power"},
                {label: "Channel 3", value: "Reserve Power"},
                {label: "Channel 4", value: "Gamma Real"},
                {label: "Channel 5", value: "Gamma Imag"},
                {label: "Channel 6", value: "Pulse State"},
                {label: "Channel 7", value: "PA Drive Setpoint"},
                {label: "Channel 8", value: "Frequency"},
                {label: "Channel 9", value: "Rail Setpoint"},
                {label: "Channel 10", value: "V ADC"},
                {label: "Channel 11", value: "I ADC"},
                {label: "Channel 12", value: "ADC Index"},
                {label: "Channel 13", value: "PID Out"},
                {label: "Channel 14", value: "APT Out"},
                {label: "Channel 15", value: "ADC Bin"},
                {label: "Channel 16", value: "PRBS Power"}
            ]
        },
        {
            label: "Ultra Fast Power Control",
            description: [
                {label: "Samples Per Second", value: 10003},
                {label: "Number of Data Points", value: 2097152},
                {label: "Pretrigger %", value: 99},
                {label: "Trigger Holdoff (ms)", value: 0},
                {label: "Channel 1", value: "Disabled"},
                {label: "Channel 2", value: "Disabled"},
                {label: "Channel 3", value: "Disabled"},
                {label: "Channel 4", value: "Disabled"},
                {label: "Channel 5", value: "Disabled"},
                {label: "Channel 6", value: "Disabled"},
                {label: "Channel 7", value: "Disabled"},
                {label: "Channel 8", value: "Disabled"},
                {label: "Channel 9", value: "Disabled"},
                {label: "Channel 10", value: "Disabled"},
                {label: "Channel 11", value: "Disabled"},
                {label: "Channel 12", value: "Disabled"},
                {label: "Channel 13", value: "Disabled"},
                {label: "Channel 14", value: "Disabled"},
                {label: "Channel 15", value: "Disabled"},
                {label: "Channel 16", value: "Disabled"}
            ]
        },
        {
            label: "Frequency Tuning",
            description: [
                {label: "Samples Per Second", value: 10003},
                {label: "Number of Data Points", value: 2097152},
                {label: "Pretrigger %", value: 99},
                {label: "Trigger Holdoff (ms)", value: 0},
                {label: "Channel 1", value: "State 1 Frequency"},
                {label: "Channel 2", value: "Frequency Mode"},
                {label: "Channel 3", value: "Distortion Real"},
                {label: "Channel 4", value: "Distortion Imag"},
                {label: "Channel 5", value: "State 2 Frequency"},
                {label: "Channel 6", value: "State 3 Frequency"},
                {label: "Channel 7", value: "State 4 Frequency"},
                {label: "Channel 8", value: "C1 Position"},
                {label: "Channel 9", value: "Disabled"},
                {label: "Channel 10", value: "Disabled"},
                {label: "Channel 11", value: "Disabled"},
                {label: "Channel 12", value: "Disabled"},
                {label: "Channel 13", value: "Disabled"},
                {label: "Channel 14", value: "Disabled"},
                {label: "Channel 15", value: "Disabled"},
                {label: "Channel 16", value: "Disabled"}
            ]},
        {
            label: "Metering",
            description: [
                {label: "Samples Per Second", value: 10003},
                {label: "Number of Data Points", value: 233016},
                {label: "Pretrigger %", value: 99},
                {label: "Trigger Holdoff (ms)", value: 0},
                {label: "Channel 1", value: "PSU 1 Fan Amps"},
                {label: "Channel 2", value: "PSU 1 Mode"},
                {label: "Channel 3", value: "PA01 Current"},
                {label: "Channel 4", value: "PA Voltage"},
                {label: "Channel 5", value: "PSU 1 Temp"},
                {label: "Channel 6", value: "Soft Start Volts"},
                {label: "Channel 7", value: "Ambient Air Temp"},
                {label: "Channel 8", value: "HK Bias Voltage"},
                {label: "Channel 9", value: "Total PA Current"},
                {label: "Channel 10", value: "Disabled"},
                {label: "Channel 11", value: "Disabled"},
                {label: "Channel 12", value: "Disabled"},
                {label: "Channel 13", value: "Disabled"},
                {label: "Channel 14", value: "Disabled"},
                {label: "Channel 15", value: "Disabled"},
                {label: "Channel 16", value: "Disabled"}
            ]},
        {
            label: "Power Feedback",
            description: [
                {label: "Samples Per Second", value: -1},
                {label: "Number of Data Points", value: -1},
                {label: "Pretrigger %", value: 99},
                {label: "Trigger Holdoff (ms)", value: 0},
                {label: "Channel 1", value: "VFwd Real"},
                {label: "Channel 2", value: "VFwd Imag"},
                {label: "Channel 3", value: "IRvs Real"},
                {label: "Channel 4", value: "IRvs Imag"},
                {label: "Channel 5", value: "TDM MUX Sel"},
                {label: "Channel 6", value: "Disabled"},
                {label: "Channel 7", value: "Disabled"},
                {label: "Channel 8", value: "Disabled"},
                {label: "Channel 9", value: "Disabled"},
                {label: "Channel 10", value: "Disabled"},
                {label: "Channel 11", value: "Disabled"},
                {label: "Channel 12", value: "Disabled"},
                {label: "Channel 13", value: "Disabled"},
                {label: "Channel 14", value: "Disabled"},
                {label: "Channel 15", value: "Disabled"},
                {label: "Channel 16", value: "Disabled"}
            ]},
        {
            label: "Pulsing",
            description: [
                {label: "Samples Per Second", value: 10003},
                {label: "Number of Data Points", value: 161319},
                {label: "Pretrigger %", value: 99},
                {label: "Trigger Holdoff (ms)", value: 0},
                {label: "Channel 1", value: "Actual Setpoint"},
                {label: "Channel 2", value: "Forward Power"},
                {label: "Channel 3", value: "Reverse Power"},
                {label: "Channel 4", value: "Gamma Real"},
                {label: "Channel 5", value: "Gamma Imag"},
                {label: "Channel 6", value: "Pulse State"},
                {label: "Channel 7", value: "PA Drive Setpoint"},
                {label: "Channel 8", value: "Period"},
                {label: "Channel 9", value: "Duty Factor"},
                {label: "Channel 10", value: "Sync Period"},
                {label: "Channel 11", value: "Sync Duty Factor"},
                {label: "Channel 12", value: "Sync Valid"},
                {label: "Channel 13", value: "Pulsing Status Vector"},
                {label: "Channel 14", value: "Disabled"},
                {label: "Channel 15", value: "Disabled"},
                {label: "Channel 16", value: "Disabled"}
            ]},
        {
            label: "Fault",
            description: [
                {label: "Samples Per Second", value: 10003},
                {label: "Number of Data Points", value: 174762},
                {label: "Pretrigger %", value: 99},
                {label: "Trigger Holdoff (ms)", value: 0},
                {label: "Channel 1", value: "Actual Setpoint"},
                {label: "Channel 2", value: "Forward Power"},
                {label: "Channel 3", value: "Reverse Power"},
                {label: "Channel 4", value: "Gamma Real"},
                {label: "Channel 5", value: "Gamma Imag"},
                {label: "Channel 6", value: "Pulse State"},
                {label: "Channel 7", value: "PA Drive Setpoint"},
                {label: "Channel 8", value: "Frequency"},
                {label: "Channel 9", value: "TLC Code"},
                {label: "Channel 10", value: "PA Voltage"},
                {label: "Channel 11", value: "PA Power Dissipation"},
                {label: "Channel 12", value: "Status Vector"},
                {label: "Channel 13", value: "Disabled"},
                {label: "Channel 14", value: "Disabled"},
                {label: "Channel 15", value: "Disabled"},
                {label: "Channel 16", value: "Disabled"}
            ]}
    ]
}

export const deviceConfigurationMap = {
    'BFT DFT Tuner Configuration': {title: "BFT DFT Tuner Configuration", showInNav: null, merge: ['freqControllerSchema', 'bftDftTunerConfigurationSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Back Porch Port Expander Configuration': {title: "Back Porch Port Expander Configuration", showInNav: null, merge: ['backPorchPortExpanderSchema'], roles: ['deviceConfigProduct']},
    'Bin Synced Readbacks': {title: "Bin Synced Readbacks", showInNav: null, merge: ['binSyncedReadbackSchema'], roles: ['deviceConfigProduct']},
    'Broadcast Configuration': {title: "Broadcast Configuration", showInNav: null, merge: ['broadcastConfigurationSchema'], roles: ['deviceConfigCustomer']},
    'Drive Controller': {title: "Drive Controller", showInNav: null, merge: ['driveControllerSchema', 'basicDriveControllerSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Cascade Controller Schema': {title: "Cascade Configuration", showInNav: null, merge: ['cascadeControllerSchema'], roles: ['deviceConfigProduct']},
    'CEX Period Analyzer Sensor Schema': {title: "CEX Period Analyzer Sensor Schema", showInNav: null, merge: ['cexPeriodAnalyzerSensorSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Complex Voltage Sensor Schema': {title: "Complex Voltage Sensor Schema", showInNav: null, merge: ['complexVoltageSensorSchema'], roles: ['deviceConfigProduct']},
    'EtherCat Configuration Schema': {title: "EtherCAT Configuration", showInNav: null, merge: ['ethercatConfigurationSchema'], roles: ['deviceConfigProduct']},
    'Gain Scheduler Configuration': {title: "", showInNav: 'never', merge: ['gainSchedulerSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Global Configurations': {title: "Global Configurations", showInNav: null, merge:['globalConfigurationSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Hardware Manager Configuration': {title: "Hardware Configuration", showInNav: null, merge: ['hardwareConfigSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Main Controller Configuration': {title: "Main Controller", showInNav: null, merge: ['mainControllerSchema', 'gainSchedulerSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Meter Configuration': {title: "Meter Configuration", showInNav: null, merge: ['meterConfigSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Power Sensor Configuration': {title: "Power Sensor", showInNav: null, merge: ['powerSensorConfigSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'PFS Configuration': {title: "PFS Configuration", showInNav: null, merge: ['pfsConfigSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Random Tuner Configuration': {title: "Random Tuner Configuratin", showInNav: null, merge: ['randomTunerConfigSchema', 'freqControllerSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Pulsing Configuration': {title: "Pulse Controller", showInNav: null, merge: ['pulseControllerSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Rail Controller': {title: "Rail Controller", showInNav: null, merge: ['railControllerSchema', 'basicRailControllerSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'Timbers Configuration': {title: "Timbers Controller", showInNav: null, merge: ['timbersControllerSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']},
    'TLC Communication Configuration': {title: "TLC Configuration", showInNav: null, merge: ['tlcConfigSchema'], roles: ['deviceConfigCustomer', 'deviceConfigProduct']}
}

export const hideLinksWithNoCustomerConfiguration = (propsWithConfigs) => {
    if(propsWithConfigs && propsWithConfigs.role && propsWithConfigs.role.privileges) {
        const privileges = propsWithConfigs.role.privileges
        Object.keys(deviceConfigurationMap).forEach(deviceConfigKey => {
            if(deviceConfigurationMap[deviceConfigKey].showInNav === 'never')
                return
            const deviceMergeConfig = deviceConfigurationMap[deviceConfigKey].merge
            if(propsWithConfigs[deviceMergeConfig[0]].length === 0)
                return
            if(propsWithConfigs && propsWithConfigs[deviceMergeConfig[0]] &&
                propsWithConfigs[deviceMergeConfig[0]][0] &&
                propsWithConfigs[deviceMergeConfig[0]][0].properties.Customer &&
                privileges.deviceConfigCustomer) {
                deviceConfigurationMap[deviceConfigKey].showInNav = true;
            } else if(propsWithConfigs && propsWithConfigs[deviceMergeConfig[0]] &&
                propsWithConfigs[deviceMergeConfig[0]][0] &&
                propsWithConfigs[deviceMergeConfig[0]][0].properties.Product &&
                privileges.deviceConfigProduct) {
                deviceConfigurationMap[deviceConfigKey].showInNav = true;
            } else {
                deviceConfigurationMap[deviceConfigKey].showInNav = false;
            }
        })
    }
    return deviceConfigurationMap
}

export const FAILURE_MESSAGES = [
  'FAILED',
  'FAILURE',
  'COULD NOT FIND',
  'NOT A CORRECT FORMAT',
  'DID NOT DOWNLOAD PROPERLY'
]

