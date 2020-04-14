<template>
    <ul>
        <h4 v-text="$ml.get('createReview')"/>
        <li>    
            <p v-text="$ml.get('reviewTitle')"/>
            <input ref="title" class="inputItem">
        </li>
        <li>
            <p v-text="$ml.get('starRating')"/>
            <input ref="starRating" :max="5" :min="0" type="number" class="inputItem">
        </li>
            <p>
                <strong v-text="$ml.get('prosAndCons')"/>
            </p> 

            <p v-text="$ml.get('ProCon')"/>

                <ul>
                <div v-if="pros.length">
                    <h5>Pros</h5>
                    <li v-for="pro in pros" :key="pro.pro">
                        {{pro}}
                        <button v-on:click="removePro(pro)" class="removeProConBtn" v-text="$ml.get('remove')"/>
                    </li>
                </div>
            </ul>
            <p v-text="$ml.get('addPro')"/>
            <input ref="pro" v-on:keyup.enter='addPro()' class="inputItem">

            <ul>
                <div v-if="cons.length">
                    <h5>Cons</h5>
                    <li v-for="con in cons" :key="con.con">
                        {{con}}
                        <button v-on:click="removeCon(con)" class="removeProConBtn" v-text="$ml.get('remove')"/>
                    </li>
                </div>
            </ul>
            <p v-text="$ml.get('addCon')"/>
            <input ref="con" v-on:keyup.enter='addCon()' class="inputItem">

        <li>
            <p v-text="$ml.get('content')"/>
            <textarea ref="content" class="reviewTextArea"></textarea>
        </li>
        <button v-on:click="submitReview()" class="submitReviewBtn" v-text="$ml.get('submit')"/>
    </ul>
</template>

<script>
import ReviewLogic from '../../logic/ReviewLogic.js';
import Review from '../../models/Review.js';
import Ref from '../../models/Ref.js';

import { MLBuilder } from 'vue-multilanguage';

export default {
    data() {
        return {
            pros: [],
            cons: [],
            author: String
        }
    },
    mounted() {
        if(this.$session.exists()) {
            this.author = this.$session.get('user').username;
        }    
        this.$root.$on('loggedInStatus', (loggedIn) => {
            if(!loggedIn) {
                this.author = '';
            }
        });
    },
    methods: {
        addPro() {
            let proInput = this.$refs.pro;
            let pro = proInput.value;            

            if(ReviewLogic.validateProConInput(pro, this.pros.length)) {                
                this.pros.push(pro);
                proInput.value = '';
            }
            else this.$alert('Please use 4 pros max');
        },
        removePro(pro) {
            this.pros = ReviewLogic.removeItem(pro, this.pros);
        },  
        addCon() {
            let conInput = this.$refs.con;
            let con = conInput.value;

            if(ReviewLogic.validateProConInput(con, this.cons.length)) {
                this.cons.push(con);
                conInput.value = '';
            }
            else this.$alert('Please use 4 cons max');
        },
        removeCon(con) {
            this.cons = ReviewLogic.removeItem(con, this.cons);
        },
        submitReview() {

            if(Object.keys(this.author).length === 0 || this.author === '{}') {
                this.$alert(this.$ml.get('notLoggedIn'));
                return;
            }
            
            let refs = this.$refs;

            let message = ReviewLogic.validateReviewSubmit(
                [
                    new Ref(refs.content.value, 'Content'),
                    new Ref(refs.starRating.value, 'StarRating'),
                    new Ref(refs.title.value, 'Title')
                ]
            );

            if(message != undefined) {
                this.$alert(message);
            }
            else if(this.author != undefined ) {

                let starRating = refs.starRating.value;
  
                let review = new Review(
                    this.author,
                    refs.title.value,
                    refs.content.value,
                    refs.starRating.value,  
                ); 
                //add elements from array individually
                review.addPros(...this.pros);
                review.addCons(...this.cons);

                this.$root.$refs.detailsPage.addReview(review);
            }      
        }
    },
    computed: {
        mlProCon() {            
            return new MLBuilder('submitProCon').with('k', 'Enter');
        },
    },
}
</script>

<style src='./NewReview.css'></style>