import {

    FETCH_DEVICE_SCHEMA_INIT,

    FETCH_DEVICE_SCHEMA_SUCCESS,

    FETCH_DEVICE_SCHEMA_ERROR,

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

} from '../actions/config';



const initialState = {

    //object used to render table component

    configData: [],

    schema: [],

    configTitle: '',



    //object used to hold schema

    driveControllerSchema: [],

    bftDftTunerConfigurationSchema: [],

    binSyncedReadbackSchema: [],

    basicDriveControllerSchema: [],

    backPorchPortExpanderSchema: [],

    broadcastConfigSchema: [],

    complexVoltageSensorSchema: [],

    cexPeriodAnalyzerSensorSchema: [],

    cascadeControllerSchema: [],
    ethercatConfigurationSchema: [],

    freqControllerSchema: [],

    gainSchedulerSchema: [],

    globalConfigurationSchema: [],

    hardwareConfigSchema: [],

    mainControllerSchema: [],

    meterConfigSchema: [],

    powerSensorConfigSchema: [],

    pfsConfigSchema: [],

    pulseControllerSchema: [],

    randomTunerConfigSchema: [],

    railControllerSchema: [],

    basicRailControllerSchema: [],

    timbersControllerSchema: [],

    tlcConfigSchema: [],



    loading: false,

    error: ''

};



export default function reducer(state = initialState, action) {

    if (action.type === FETCH_DEVICE_SCHEMA_INIT) {

        return Object.assign({}, state, {

            loading: true,

        });

        

    } else if (action.type === FETCH_DEVICE_SCHEMA_SUCCESS) {

        //local vars used to hold the incoming schema

        let driveController = [];

        let binSyncedReadback = [];

        let bftDftTunerConfiguration = [];

        let basicDriveController = [];

        let backPorchPortExpander = [];

        let broadcastConfig = [];

        let complexVoltageSensor = [];

        let cexPeriodAnalyzerSensor = [];

        let cascadeController = [];
        let ethercatConfiguration = [];

        let freqController = [];

        let gainScheduler = [];

        let globalConfiguration = [];

        let hardwareConfig = [];

        let mainController = [];

        let meterConfig = [];

        let pfsConfig = [];

        let powerSensorConfig = [];

        let pulseController = [];

        let randomTunerConfig = [];

        let railController = [];

        let basicRailController = [];

        let timbersController = [];

        let tlcConfig = [];

        

        console.log('schema = ', action.schema)

        action.schema.forEach( schema => {

            switch (schema.title) {

                

                case 'Basic Drive Controller': {

                    //get the basic drive controller schema values

                    basicDriveController = action.schema.filter(s => {

                        return s.title === 'Basic Drive Controller'

                    });

                                            

                    break;

                }

                case 'Drive Controller': {

                    //get the basic drive controller schema values

                    driveController = action.schema.filter(s => {

                        return s.title === 'Drive Controller'

                    });

                   

                    break;

                }

                case 'Bin Synced Readbacks': {

                    binSyncedReadback = action.schema.filter(s => {

                        return s.title === 'Bin Synced Readbacks'

                    });

                }

                case 'Back Porch Port Expander Configuration': {

                    backPorchPortExpander = action.schema.filter( s => {

                        return s.title === 'Back Porch Port Expander Configuration'

                    });



                    break;

                }

                case 'BFT DFT Tuner Configuration': {

                    //ESC Tuner uses two schemas for its table

                    freqController = action.schema.filter(s => {

                        return s.title === 'Frequency Configuration'

                    });



                    bftDftTunerConfiguration = action.schema.filter(s => {

                        return s.title === 'BFT DFT Tuner Configuration'

                    })

                

                    break;

                } 

                case 'Cascade Configuration': {

                    cascadeController = action.schema.filter(s => {

                        return s.title === 'Cascade Configuration'

                    })



                    break;

                }

                case 'EtherCAT Configuration': {

                    ethercatConfiguration = action.schema.filter(s => {

                        return s.title === 'EtherCAT Configuration'

                    })



                    break;

                }

                case 'Random Tuner Configuration': {

                    randomTunerConfig = action.schema.filter(s => {

                        return s.title === 'Random Tuner Configuration'                       

                    });



                    freqController = action.schema.filter(s => {

                        return s.title === 'Frequency Configuration'

                    });



                    break;

                }

                case 'Broadcast Configuration': {

                    broadcastConfig = action.schema.filter(s => {

                        return s.title === 'Broadcast Configuration'

                    });



                    break;

                } 

                case 'Complex Voltage Sensor Schema': {

                    complexVoltageSensor = action.schema.filter(s => {

                        return s.title === 'Complex Voltage Sensor Schema'

                    });



                    break;

                } 

                case 'CEX Period Analyzer Sensor Schema': {

                    cexPeriodAnalyzerSensor = action.schema.filter(s => {

                        return s.title === 'CEX Period Analyzer Sensor Schema'

                    });

                    break;

                }

                case 'Global Configurations': {

                    globalConfiguration = action.schema.filter(s => {

                        return s.title === "Global Configurations"

                    });



                    break;

                }

                case 'Gain Scheduler Configuration': {

                    gainScheduler = action.schema.filter(s => {                       

                        return s.title === 'Gain Scheduler Configuration'

                    })

                    

                    break;

                } 

                case 'PFS Configuration': {

                    pfsConfig = action.schema.filter(s => {

                        return s.title === "PFS Configuration"

                    });



                    break;

                }        

                case 'Rail Controller': {

                    //Rail controller uses two schemas for its table

                    basicRailController = action.schema.filter(s => {

                        return s.title === 'Basic Rail Controller'

                    });

                                        

                    railController = action.schema.filter( s => {

                        return s.title === 'Rail Controller'

                    })

                                        

                    break;

                }

                case 'Meter Configuration': {

                  

                    meterConfig = action.schema.filter(s => {

                        return s.title === 'Meter Configuration'

                    });

                    

                    break;

                }

                case 'Timbers Configuration': {

                    timbersController = action.schema.filter(s => {

                        return s.title === 'Timbers Configuration'                    

                    });

                    

                    break;

                }                

                case 'Hardware Manager Configuration': {



                    hardwareConfig = action.schema.filter(s => {

                        return s.title === 'Hardware Manager Configuration'

                    });

                    

                    break;

                }

                case 'Pulsing Configuration': {



                    pulseController = action.schema.filter(s => {

                        return s.title === 'Pulsing Configuration'

                    });

            

                    break;

                }

                case 'Power Sensor Configuration': {



                    powerSensorConfig = action.schema.filter(s => {

                        return s.title === 'Power Sensor Configuration'

                    });                   

                    

                    break;

                }

                case 'Main Controller Configuration': {                    

                    mainController = action.schema.filter(s => {

                        return s.title === 'Main Controller Configuration'

                    });



                    break;

                }

                case 'TLC Communication Configuration': {



                    tlcConfig = action.schema.filter(s => {

                        return s.title === 'TLC Communication Configuration'

                    });

                                        

                    break;

                }



                default:

                    break;

            }

            

        }) 

        return Object.assign( {}, state, {

            driveControllerSchema: driveController,

            backPorchPortExpanderSchema: backPorchPortExpander,

            binSyncedReadbackSchema: binSyncedReadback,

            bftDftTunerConfigurationSchema: bftDftTunerConfiguration,

            broadcastConfigSchema: broadcastConfig,

            complexVoltageSensorSchema: complexVoltageSensor,

            cascadeControllerSchema: cascadeController,

            cexPeriodAnalyzerSensorSchema: cexPeriodAnalyzerSensor,
            ethercatConfigurationSchema: ethercatConfiguration,

            basicDriveControllerSchema: basicDriveController,

            gainSchedulerSchema: gainScheduler,

            freqControllerSchema: freqController,

            globalConfigurationSchema: globalConfiguration,

            hardwareConfigSchema: hardwareConfig,

            mainControllerSchema: mainController,

            meterConfigSchema: meterConfig,

            pfsConfigSchema: pfsConfig,

            powerSensorConfigSchema: powerSensorConfig,

            pulseControllerSchema: pulseController,

            randomTunerConfigSchema: randomTunerConfig,

            railControllerSchema: railController,

            basicRailControllerSchema: basicRailController,

            timbersControllerSchema: timbersController,

            tlcConfigSchema: tlcConfig,

            loading: false,

            error: false,

        })       



    } else if (action.type === FETCH_DEVICE_SCHEMA_ERROR) {

        return Object.assign({}, state, {

            loading: false,

            error: action.error

        });

     

    } else if (action.type === FETCH_SAVED_CONFIG_FILES_INIT) {

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

            configTitle: action.configTitle,

            schema: action.schema,

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

            configRequest: false,

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

