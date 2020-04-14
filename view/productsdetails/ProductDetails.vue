<template>
    <div id="app">
        <title v-text="$ml.get('Details')"/>

        <h3 v-text="$ml.get('Details')">(id:{{product.id}})</h3>

        <h4 v-text="$ml.get('Reviews')"/>
        <div class="reviews">
            <ul>
                <div v-if="reviews.length">
                    <li class="review">
                        <ReviewSummary :Reviews='reviews'/>
                    </li>
                    <li v-for="review in reviews" :key="review.review" class="review">
                        <ReviewComp :Review='review'/>
                    </li>
                </div>
                <div v-else v-text="$ml.get('noReviewsYet')"/>
            </ul>
            <NewReview :key="newReviewKey" class="review"/>
        </div>
 
    </div>
</template>

<script>
import Review from '../../models/Review.js';
import NewReview from '../../components/NewReview/NewReview.vue';
import ReviewComp from '../../components/Review/Review.vue';
import ReviewSummary from '../../components/ReviewSummary/ReviewSummary.vue';

import ReviewDao from '../../data/reviewdao.js';
import ProductDao from '../../data/productdao.js';

import { MLBuilder } from 'vue-multilanguage';

export default {

    components: {
        NewReview,
        ReviewComp,
        ReviewSummary
    },
    props: {    
      id: Number,    
    },
    data() {
        return {
            product: Object,
            reviews: [],
            newReviewKey: 0,
        };
    },
    mounted() {
        
        window.scrollTo(0,0);

        ProductDao.getProductById(this.id)
                .then((product) => {
            
            this.product = product;
        });

        ReviewDao.getAllReviewsByProduct(this.id)
            .then((reviews) => {
                this.reviews = reviews;
        });
    },  
    methods: {
        addReview(review) {
            //save new review
            review.setProductId(this.id);  
            //send review to server and return to convert date to timeStamp
            ReviewDao.addReview(review)
                .then(review => {
                    this.reviews.push(review);
            });
            //destroy newReview component and create a new one
            this.newReviewKey += 1;
        }
    },
    computed: {
        mlDetails() {            
            return new MLBuilder('detailsFor').with('p', this.product.name);
        },
        mlReviews() {            
            return new MLBuilder('reviewsFor').with('p', this.product.name);
        },
    },
    created() {
        //create ref for addReview to emit
        this.$root.$refs.detailsPage = this;
    }
}
</script>

<style src='./productdetails.css'></style>