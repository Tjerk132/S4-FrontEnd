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
                <button type="button" v-text="$ml.get('cancel')" class="cancelbtn"/>
                <button v-on:click='login()' type="submit" v-text="$ml.get('login')" class="signupbtn"/>
            </div>
        </div>
    </div>
</template>

<script>
import User from "@/models/User.js";
import UserDao from "@/data/userdao.js";
import jwtDao from '@/data/jwtdao.js';

import CryptoJS from 'crypto-js';

export default {
    data() {
        return {
            user: User,
            message: String,
            key: String
        }
    },
    mounted() {
        this.message = '';
        // addEventListener('keypress', (event) => {            
        //     if(event.which == 13) {
        //         this.login();
        //     }
        // });
        this.key = jwtDao.getKey(CryptoJS); 
    },
    methods: {
        login() {
            let user = this.user;
            //retrieve jwt header
            jwtDao.setJwtHeader(user.username, user.password)
            .then((res) => {  
                if(Number(res)) {
                    this.$alert('Unable to retrieve authorization');
                    return;
                }               
                //retrieve userinfo
                UserDao.loginUser(user.username, user.password)
                    .then((response) => {

                    if(Number(response)) {
                        this.message = this.$ml.with('c', response).get('loginFailed');
                    }
                    else {
                        this.message = this.$ml.get('loginSuccess');

                        let user = response;

                        let role = user.role;
                        user.role = CryptoJS.AES.encrypt(role, this.key).toString();                            

                        delete user.password;
                        delete user.emailAddress;

                        this.$session.start();
                        this.$session.set('user', user);         

                        this.$root.$emit('loggedInStatus', true);

                        this.$router.push({
                            name: 'products',
                            query: { category: 'All' }
                        });
                    }
                });           
            });
        },
    }
}
</script>

<style src="./login.css"></style>