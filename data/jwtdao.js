import axios from '@/services/base-api.js';

export default class JwtDao {

    async setJwtHeader(username, password) {
        
        try {

            let res = await axios.post('/login', {
            username: username,
            password: password
            })     
            
            let jwtHeader = res.headers.authorization.replace('Bearer ', ''); 
            localStorage.setItem('jwt-token', jwtHeader);

            let cryptoHeader = res.headers.cryptoKey;
            localStorage.setItem('crypto-key', cryptoHeader);            
        }
        catch(error) {
            console.error(error);
            return error.response.status;
        }
    }

    getKey(CryptoJS) {
        // return key to decrypt with crypto-js
        return CryptoJS.AES.decrypt(localStorage.getItem('crypto-key'), 't314159s').toString(CryptoJS.enc.Utf8);        
    }
}