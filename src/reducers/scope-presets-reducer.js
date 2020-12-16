const initialState = {
    presets: [],
    description: []
}
const scopePresetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FIND_ALL_PRESETS":
            return {
                presets: action.presets,
                description: []
            }
        case "FIND_DESCRIPTION":
            return {
                presets: action.presets,
                description: action.description
            }
        default:
            return state
    }
}

export default scopePresetsReducer
