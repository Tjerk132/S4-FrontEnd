import axios from '@/services/base-api.js';

let basePath = '/users';

export default class UserDao {

    async loginUser(username, password) {

        try {
            let url = `${basePath}/login`;

            let res = await axios.post(url, {
                username: username,
                password: password,
            });

            return res.data;
        }
        catch(err) {
            console.error(err);        
            return err.response.status;   
        }
    }

    async registerUser(username, password, emailAddress) {
        
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

    async getUserEmail(userId) {
        try {
            let url = `${basePath}/email`;

            let res = await axios.post(url, userId);

            return res.data;
        }
        catch(err) {
            console.error(err);
        }
    }

}