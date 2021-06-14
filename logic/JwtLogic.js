import JwtDao from '@/data/JwtDao.js';

export default class JwtLogic {

    constructor() {
        this.jwtDao = new JwtDao();
    }

    async setJwtHeader(username, password) {
        return await this.jwtDao.setJwtHeader(username, password);
    }

    getKey() {
        return this.jwtDao.getKey();
    }
}