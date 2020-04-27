<template>
    <div>
        <h4 v-text="$ml.get('Reviews')"/>
        <div class="reviews">
            <ul>
                <div v-if="reviews.length">
                    <li class="review">
                        <ReviewSummary :Reviews='Reviews'/>
                    </li>
                    <li v-for="review in reviews.slice(0, reviewShowCount)" :key="review.review" class="review">
                        <ReviewComp :Review='review'/>
                    </li>
                    <li v-if="reviews.length > reviewShowCount">
                        <button v-on:click='reviewShowCount += reviewShowMoreCount' v-text="$ml.get('showMoreReviews')" class="adjustReviewCountBtn"/>
                    </li>  
                    <li v-else>
                        <button v-on:click='reviewShowCount = 1' v-text="$ml.get('showLessReviews')" class="adjustReviewCountBtn"/>
                    </li>
                </div>
                <div v-else v-text="$ml.get('noReviewsYet')"/>
            </ul>
            <NewReview :key="newReviewKey" class="review"/>
        </div>
    </div>
  
</template>

<script>
import ReviewSummary from '../../components/ReviewSummary/ReviewSummary.vue';
import ReviewComp from '../../components/Review/Review.vue';
import NewReview from '../../components/NewReview/NewReview.vue';

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
    computed: {
        mlReviews() {            
            return new MLBuilder('reviewsFor').with('p', this.product.name);
        },
    },

}
</script>

<style src='./reviews.css'>

</style>