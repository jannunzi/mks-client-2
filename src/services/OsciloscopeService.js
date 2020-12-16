// import utilities from "../utils/utilities";

// const API_BASE_URL = utilities.getAPI_BASE_URL();

import {API_BASE_URL} from '../config'
export default class OsciloscopeService {
    static instance = null
    static getInstance() {
        if(this.instance === null) {
            this.instance = new OsciloscopeService()
        }
        return this.instance
    }

    static pause = () =>
        fetch(`${API_BASE_URL}/api/oscilloscope/pause`, {
            method: 'post'
        }).then(response => response.json())

    static play = () =>
        fetch(`${API_BASE_URL}/api/oscilloscope/play`, {
            method: 'post'
        }).then(response => response.json())

    static updateOsciloscope = (oscilloscopeConfig) =>
        fetch(`${API_BASE_URL}/api/oscilloscope`, {
            method: 'put',
            body: JSON.stringify(oscilloscopeConfig),
            headers: {
                'content-type': 'application/json'
            }
        })
}
