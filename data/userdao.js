let host = require('./host.js').host;

let baseUrl = 'http://' + host.ip + ":" + host.port + '/users/';

async function loginUser(username, password) {

    try {
        let url = baseUrl + 'login';

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
        let url = baseUrl + 'register';

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
        let url = baseUrl + 'email';        

        let res = await axios.post(url, userId);

        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = {
    loginUser,
    registerUser,
    getUserEmail,
}