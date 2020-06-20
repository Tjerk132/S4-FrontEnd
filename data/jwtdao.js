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
        }
        catch(error) {
            console.error(error);
            return error.response.status;
        }
    }

    getKey() {
        // return key to decrypt with crypto-js        
        return 't314159s';
    }
}