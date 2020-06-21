<template>
    <div>
        <title v-text="$ml.get('login')"/>
        <div class="container">
            <h1 v-text="$ml.get('login')"/>
            <p v-text="$ml.get('loginMessage')"/>
            <hr>
            <h4 class="authenticationMessage">
                {{message}}
            </h4>
            <label for="username"><b v-text="$ml.get('username')"/></label>
            <p>
            <input v-model="user.username" type="text" name="username" required>
            </p>

            <label for="psw"><b v-text="$ml.get('password')" /></label>
            <p>
            <input v-model="user.password" type="password" name="psw" required>
            </p>

            <div class="authButtons">
                <button v-on:click='cancel()' type="button" v-text="$ml.get('cancel')" class="cancelbtn"/>
                <button v-on:click='validateLogin()' type="submit" v-text="$ml.get('login')" class="signupbtn"/>
            </div>
        </div>
    </div>
</template>

<script>
import User from "@/models/User.js";
import AccountLogic from '@/logic/AccountLogic.js';
import JwtLogic from '@/logic/JwtLogic.js';

import CryptoJS from 'crypto-js';

export default {
    data() {
        return {
            accountLogic: new AccountLogic(),
            jwtLogic: new JwtLogic(),
            user: new User,
            message: String(),
        }
    },
    mounted() {
        //no need to check for loggedIn -> parent validates
        this.$root.$on('jwt-retrieved', () => {            
            this.login();     
        }) 
    },
    methods: {
        validateLogin() {
            let user = this.user;

            let message = this.accountLogic.validateUser(user.username, user.password);
            if(!message) {
                 this.$alert(this.$ml.get('oneOrMoreFieldsIncorrect'));
                 return;
            }            
            this.$root.$emit('check-jwt', user); 
        },
        login() {
            let user = this.user;            

            this.accountLogic.loginUser(user.username, user.password)
                .then((response) => {                    
                if(Number(response)) {
                    this.message = this.$ml.with('c', response).get('loginFailed');
                }
                else {
                    this.message = this.$ml.get('loginSuccess');

                    let user = response;

                    let role = user.role;
                    user.role = CryptoJS.AES.encrypt(role, this.jwtLogic.getKey()).toString();                            

                    this.$session.start();
                    this.$session.set('user', user);         

                    this.$root.$emit('loggedInStatus', true);

                    this.$router.push({
                        name: 'products',
                        query: { category: 'All' }
                    });
                }
            });       
        },
        cancel() {
            this.$router.go(-1);
        }
    }
}
</script>

<style src="./login.css" scoped></style>
<style src="../account.css" scoped></style>