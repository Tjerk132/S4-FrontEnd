<template>
    <ul>
        <h4 v-text="$ml.get('createReview')"/>
        <li>    
            <p v-text="$ml.get('reviewTitle')"/>
            <input v-model="review.title" class="inputItem">
        </li>
        <li>
            <p v-text="$ml.get('starRating')"/>
              <star-rating v-model="review.starRating" @rating-selected="setStarRating" :show-rating="false" :star-size="30"></star-rating>
        </li>
            <p>
                <strong v-text="$ml.get('prosAndCons')"/>
            </p> 

            <p v-text="$ml.get('ProCon')"/>

                <ul>
                <div v-if="review.pros.length">
                    <h5>Pros</h5>
                    <li v-for="pro in review.pros" :key="pro.pro">
                        {{pro}}
                        <button v-on:click="removePro(pro)" class="removeProConBtn" v-text="$ml.get('remove')"/>
                    </li>
                </div>
            </ul>
            <p v-text="$ml.get('addPro')"/>
            <input ref="pro" v-on:keyup.enter='addPro()' class="inputItem">

            <ul>
                <div v-if="review.cons.length">
                    <h5>Cons</h5>
                    <li v-for="con in review.cons" :key="con.con">
                        {{con}}
                        <button v-on:click="removeCon(con)" class="removeProConBtn" v-text="$ml.get('remove')"/>
                    </li>
                </div>
            </ul>
            <p v-text="$ml.get('addCon')"/>
            <input ref="con" v-on:keyup.enter='addCon()' class="inputItem">

        <li>
            <p v-text="$ml.get('content')"/>
            <textarea v-model="review.content" class="reviewTextArea"></textarea>
        </li>
        <button v-on:click="submitReview()" class="submitReviewBtn" v-text="$ml.get('submit')"/>
    </ul>
</template>

<script>
import ReviewLogic from '@/logic/ReviewLogic.js';
import Review from '@/models/Review.js';
import Ref from '@/models/Ref.js';

import { MLBuilder } from 'vue-multilanguage';

export default {
    data() {
        return {
            reviewLogic: new ReviewLogic(),
            review: new Review()             
        }
    },
    mounted() {
        if(this.$session.exists()) {
            this.review.author = this.$session.get('user').username;
        }
        this.$root.$on('loggedInStatus', (loggedIn) => {
            if(!loggedIn) {
                this.review.author = '';
            }
        });
    },
    methods: {
        setStarRating(rating) {
            this.review.starRating = rating;
            
        },
        addPro() {
            let proInput = this.$refs.pro;
            let pro = proInput.value;            

            if(this.reviewLogic.validateProConInput(pro, this.review.pros.length)) {                
                this.review.pros.push(pro);
                proInput.value = '';
            }
            else this.$alert('Please use 4 pros max');
        },
        removePro(pro) {
            this.review.pros = this.reviewLogic.removeItem(pro, this.review.pros);
        },  
        addCon() {
            let conInput = this.$refs.con;
            let con = conInput.value;

            if(this.reviewLogic.validateProConInput(con, this.review.cons.length)) {
                this.review.cons.push(con);
                conInput.value = '';
            }
            else this.$alert('Please use 4 cons max');
        },
        removeCon(con) {
            this.review.cons = this.reviewLogic.removeItem(con, this.review.cons);
        },
        submitReview() {

            let review = this.review;

            if(review.author === undefined || review.author === '{}') {
                this.$alert(this.$ml.get('notLoggedIn'));
                return;
            }

            let message = this.reviewLogic.validateReviewSubmit(
                [
                    new Ref(review.content, 'Content'),
                    new Ref(review.starRating, 'Star Rating'),
                    new Ref(review.title, 'Title')
                ]
            );

            if(message != undefined) {
                this.$alert(message);
                return;
            }
            else if(review.author != undefined) {
                this.$root.$refs.reviewsComp.addReview(review);
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

<style src='./NewReview.css' scoped></style>