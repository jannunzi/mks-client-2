import { API_BASE_URL } from '../config.js';

export default class Utilities {
    static getBaseUrl = () => API_BASE_URL
}

export const arrayIncludesCaseInsensitiveString = (array, str) => {
  for(let i = 0; i < array.length; i++) {
    if(array[i].toUpperCase().indexOf(str.toUpperCase()) >= 0) {
      return true
    }
  }
  return false
}

export const arrayIncludesArray = (array1, array2) => {
  for(let i = 0; i < array2.length; i++) {
    if(arrayIncludesCaseInsensitiveString(array1, array2[i])) {
      return true
    }
  }
  return false
}
