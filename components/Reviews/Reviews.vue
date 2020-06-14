<template>
    <div>
        <div class="reviews">
            <h4 v-text="$ml.get('Reviews')" class="reviews-title"/>
            <ul>
                <div v-if="reviews.length">
                    <li class="review">
                        <ReviewSummary :Reviews='Reviews'/>
                    </li>
                    <li v-for="review in reviews.slice(0, reviewShowCount)" :key="review.review" class="review">
                        <ReviewComp :Review='review'/>
                    </li>
                    <li v-if="reviews.length > reviewShowCount">
                        <button v-on:click='reviewShowCount += reviewShowMoreCount' v-text="$ml.get('showMoreReviews')" class="adjust-review-count-btn"/>
                    </li>  
                    <li v-else-if="reviews.length < reviewShowCount">
                        <button v-on:click='reviewShowCount = 1' v-text="$ml.get('showLessReviews')" class="adjust-review-count-btn"/>
                    </li>
                </div>
                <div v-else v-text="$ml.get('noReviewsYet')" class="review" />
            </ul>
            <NewReview :key="newReviewKey" class="review"/>
        </div>
    </div>
  
</template>

<script>
import ReviewSummary from '@/components/ReviewSummary/ReviewSummary.vue';
import ReviewComp from '@/components/Review/Review.vue';
import NewReview from '@/components/NewReview/NewReview.vue';

import ReviewLogic from '@/logic/ReviewLogic.js';

import { MLBuilder } from 'vue-multilanguage';

export default {

    components: {
        ReviewSummary,
        ReviewComp,
        NewReview
    },
    props :{
        Reviews: Array,
        Product: Object
    },
    data() {
        return {
            reviewLogic: new ReviewLogic(),
            reviews: Array,
            product: Object,
            newReviewKey: 0,
            //amount of reviews to show in the start
            reviewShowCount: 1,
            //amount of new reviews to display when clicked show more
            reviewShowMoreCount: 5,
        }
    },
    mounted() {        
        this.reviews = this.Reviews;
        this.product = this.Product;
    },
    methods: {
        addReview(review) {
            //save new review
            review.setProductId(this.product.id);  
            //send review to server and return to convert date to timeStamp
            this.reviewLogic.addReview(review)
            .then(review => {
                this.reviews.push(review);
            });
            //destroy newReview component and create a new one
            this.newReviewKey++;
        },
    },
    computed: {
        mlReviews() {            
            return new MLBuilder('reviewsFor').with('p', this.product.name);
        },
        
    },
    created() {
        //create ref for addReview to emit
        this.$root.$refs.reviewsComp = this;
    }

}
</script>

<style src='./reviews.css'>

</style>