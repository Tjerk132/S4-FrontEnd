import axios from '@/services/base-api.js';

async function setJwtHeader(username, password) {
    
    try {

        let res = await axios.post('/login', {
           u: username,
           p: password
        })     
        
        let jwtHeader = res.headers.authorization.replace('Bearer ', ''); 
        localStorage.setItem('jwt-token', jwtHeader);

        console.log(res.headers);
        
        let cryptoHeader = res.headers.cryptokey;
        localStorage.setItem('crypto-key', cryptoHeader);            
    }
    catch(error) {
        console.error(error);
        return error.response.status;
    }
}

function getKey(CryptoJS) {
    return CryptoJS.AES.decrypt(localStorage.getItem('crypto-key'), `${String.fromCharCode(84)}${Math.PI.toFixed(5).replace('.','')}${String.fromCharCode(83)}`).toString(CryptoJS.enc.Utf8);        
}

export default {
    setJwtHeader,
    getKey
}