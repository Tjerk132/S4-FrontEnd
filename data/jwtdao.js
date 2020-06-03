import axios from '@/services/base-api.js';

async function setJwtHeader() {
    
    try {

        let res = await axios.post('/login', {
            username: 'user',
            password: 'ts321'    
        })
        
        let jwtHeader = res.headers.authorization.replace('Bearer ', '');
        
        return jwtHeader;                
    }
    catch(error) {
        console.error(error);
    }
}

export default {
    setJwtHeader
}