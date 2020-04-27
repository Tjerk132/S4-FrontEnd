<template>
  <div id="app">
    <title v-text="$ml.get('homePage')"/>
    <h3>
      Home
    </h3>
    <h4>
      <h2 v-text="$ml.with(username).get('homeTitle')" />
    </h4>
    <h4 v-text="$ml.get('homeGreeting')">
    </h4>
    <router-view></router-view>
  </div>
</template> 


<script> 

export default {
  data() {
    return {
      username: String,
    };
  },
  mounted() {
    let user = this.$session.get('user');

    if(user != undefined) {
      this.username = user.username;
    }    
    else this.username = 'Guest';     
  },
};
</script>

<style src="./main.css"></style>