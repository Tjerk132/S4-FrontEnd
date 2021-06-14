<template>
  <div id="app">
    <title v-text="$ml.get('homePage')"/>
    <h3>
      Home
    </h3>
    <h4>
      <h2 v-text="$ml.with(username).get('homeTitle')" />
    </h4>
    <marquee direction="right">
      <h4 v-text="$ml.get('homeGreeting')" class="home-greeting" />
    </marquee>

    <div>  
      <img :src="'S4-FrontEnd/images/warehouse.png'" class="warehouse-img">
      <top-rated-suggestions/>

      <div class="payment-options">
        <h3 v-text="$ml.get('ourPaymentOptions')" class="payment-options-header"/>

        <a href="https://www.paypal.com/en/home">
          <img src="https://pluspng.com/img-png/paypal-logotype-png-paypal-logo-logotype-emblem-5000.png"/>
        </a>
        <a href="https://www.icscards.nl/">
          <img src="https://menafn.com/updates/pr/2020-03/30/TNA_d057397e-1image_story.jpg"/>
        </a>
        <a href="https://www.mastercard.com/global.html">
          <img src="https://www.top-casino.nl/runtime/images/338/800x600/Mastercard_betaalmogelijkheid_in_casino.png"/>
        </a>
        <a href="https://www.multisafepay.com/solutions/payment-methods/maestro/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Maestro_2016.svg/1200px-Maestro_2016.svg.png"/>
        </a>
        <a href="https://www.ideal.nl/en/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/IDEAL_Logo.png"/>
        </a>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template> 


<script> 
import { MLBuilder } from 'vue-multilanguage';
import TopRatedSuggestions from '@/components/TopRatedSuggestions/TopRatedSuggestions.vue';


export default {

  components: {
      TopRatedSuggestions
  },
  data() {
    return {
      username: {
        type: String,
        default: 'Guest'
      }
    }
  },
  mounted() {
    this.username = 'Guest';
    let user = this.$session.get('user');

    if(user != undefined) {
      this.username = user.username;
    }         
  },
};
</script>
<style src="./home.css" scoped>
</style>