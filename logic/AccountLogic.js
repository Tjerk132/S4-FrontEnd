import UserDao from "@/data/UserDao.js";

export default class AccountLogic {

    constructor() {
        this.userDao = new UserDao();
    }

    validateRegister(username, email, password, repeatPassword) {
        
        if(password != repeatPassword) {
            return 'passwordsDontMatch';
        }
         
        let correctEmail = this.validateEmail(email);

        if(!correctEmail) {
            return 'emailIncorrect';
        }
        
        let valid = this.validateUser(username, password);

        if(!valid) {
            return 'oneOrMoreFieldsIncorrect';
        }
    }

    validateEmail(email) {
        
        let emailReg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

        return emailReg.test(email);
    }

    validateUser(username, password) {  

        if(this.isEmpty(username)) {
            return false;         
        }
        else if(this.isEmpty(password)) {
            return false;         
        }
        else return true;    
    }

    isEmpty(str) {
        return !str || !str.trim().length;
    }


    async registerUser(username, password, emailAddress) {

        let response = await this.userDao.registerUser(username, password, emailAddress);

        if(response == 400) {
            return false;
        }
        else return response;    
  
    }

    async loginUser(username, password) {
        return await this.userDao.loginUser(username, password);
    }

    async getUserEmail(userId) {
        return await this.userDao.getUserEmail(userId);
    }
}   