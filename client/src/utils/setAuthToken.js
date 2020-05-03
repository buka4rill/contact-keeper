// Check to see if Token is passed in
// Set it to the defaul header
// else delete from the default header

import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.header.common['x-auth-token']; 
    }
}

export default setAuthToken;