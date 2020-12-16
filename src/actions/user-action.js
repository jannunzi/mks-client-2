import { bindActionCreators } from 'redux';
import { API_BASE_URL } from '../config.js';

export const INIT = 'INIT';
export const init = () => ({
    type: INIT,
    loading: true
})

export const ERROR = 'ERROR';
export const error = (error) => ({
    type: ERROR,
    loading: true,
    error: error
})

export const LOGIN = 'LOGIN';
export const loginUser = (role) => ({
    type: LOGIN,
    error: false,
    loading: false,
    role: role
})

export const login = (password) => async (dispatch) => {
    console.log('user action login = ', password)
    let user = {
        'password': password
    }
    var responseClone
    dispatch(init())
    return fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            //TO DO:  add in authorization
            headers: {
                'content-Type': 'application/json'
            }
        }).then( res => {
            if (res.ok) {
                responseClone = res.clone()
                return res.json();
            }           
        }).catch( err => {
            if(err instanceof SyntaxError) {
                return responseClone.text()
            }
        }).then( json => {
            dispatch(loginUser(json));
        }).catch (err => {
            dispatch(error(err));
        })
    }

export const LOGOUT = 'LOGOUT';
export const logoutUser = (role) => ({
    type: LOGOUT,
    role: role
})


export const logout = () => async (dispatch) => {
    var responseClone
    dispatch(init())
    return fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            //TO DO:  add in authorization
            headers: {
                'content-Type': 'application/json'
            }
        }).then( res => {
            if (res.ok) {
                responseClone = res.clone()
                return res.json();
            }           
        }).catch( err => {
            if(err instanceof SyntaxError) {
                return responseClone.text()
            }
        }).then( json => {
            dispatch(logoutUser(json));
        }).catch (err => {
            dispatch(error(err));
        })
    }


export const CURRENT_ROLE = 'CURRENT_ROLE';
export const currentUserRole = (role) => ({
    type: CURRENT_ROLE,
    role: role
})

export const currentRole = () => async (dispatch) => {
    var responseClone
    dispatch(init())
    return fetch(`${API_BASE_URL}/currentRole`, {
            method: 'POST',
            //TO DO:  add in authorization
            headers: {
                'content-Type': 'application/json'
            }
        }).then( res => {
            if (res.ok) {
                responseClone = res.clone()
                return res.json();
            }           
        }).catch( err => {
            if(err instanceof SyntaxError) {
                return responseClone.text()
            }
        }).then( json => {
            dispatch(currentUserRole(json));
        }).catch (err => {
            dispatch(error(err));
        })
    }


