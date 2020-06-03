import axios from '@/services/base-api.js';

let basePath = '/users';

async function loginUser(username, password) {

    try {
        let url = `${basePath}/login`;

        let res = await axios.post(url, {
            username: username,
            password: password,
        });

        return res.data;
    }
    catch(err) {
        if(err.response.status == 404) {
            return 404;
        }
        console.error(err);
    }
}

async function registerUser(username, password, emailAddress) {
    
    try {                               
        let url = `${basePath}/register`;

        let res = await axios.post(url, {
            username: username,
            password: password,
            emailAddress: emailAddress
        });

        return res.data;
    }
    catch(err) {
        if(err.response.status == 400) {
            return 400;
        }
        console.error(err);
    }
}

async function getUserEmail(userId) {
    try {
        let url = `${basePath}/email`;

        let res = await axios.post(url, userId);

        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}

export default {
    loginUser,
    registerUser,
    getUserEmail,
}