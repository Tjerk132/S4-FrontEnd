<template>
  <div id="app">
    <title>Home Page</title>

    <table class="usersTable">
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th> 
        </tr>

        <tr v-for="user in users" :key="user.firstname">
            <td>{{user.firstname}}</td>
            <td>{{user.lastname}}</td>
            <td>{{user.email}}</td>
        </tr>
    </table>
    <button @click="goToProducts">Products</button>
  </div>
</template>

<script>  
import User from '../../models/User';
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {

    console.log('in home mounted');

    this.users.push(new User("gebriuker1","achternama1", "emial@s"));
    this.users.push(new User("gebruiker2", "aachternamen2", "emai@dls"));
  },
  methods: {
    goToProducts() {
      this.$router.push('/products');
    }
  }
};
</script>

<style src="./main.css"></style>