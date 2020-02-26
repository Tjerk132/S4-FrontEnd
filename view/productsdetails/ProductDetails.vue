<template>
    <div id="app">
        <title>{{product.name}} details </title>

        <h3>Details for {{product.name}} (id:{{product.id}})</h3>

        <h4>Reviews for {{product.name}}</h4>
        <div class="reviews">
            <ul>
                <div v-if="reviews.length">
                    <li v-for="review in reviews" :key="review.review" class="review">
                        <ReviewComp :Review='review'/>
                    </li>
                </div>
                <div v-else>
                    No reviews for this product yet...
                </div>
                
            </ul>
        </div>
        <NewReview :key="newReviewKey"/>
    </div>
</template>

<script>
import Review from '../../models/Review.js';
import NewReview from '../NewReview/NewReview.vue';
import ReviewComp from '../../components/Review.vue';

import ReviewDao from '../../daos/reviewdao.js';
import ProductDao from '../../daos/productdao.js';

export default {

    components: {
        NewReview,
        ReviewComp
    },
    props: {    
      id: Number,    
    },
    data() {
        return {
            product: Object,
            reviews: [],
            newReviewKey: 0
        };
    },
    mounted() {
        console.log('in details mounted'); 
        
        window.scrollTo(0,0);

        ProductDao.getProductById(this.id)
                .then((product) => {
            
            this.product = product;
        });

        ReviewDao.getAllReviewsByProduct(this.id)
            .then((reviews) => {
                this.reviews = reviews;
        });
        
        this.$root.$on('addReview', (review) => {
            //destroy newReview component and create a new one
            this.newReviewKey += 1;

            //save new review
            review.setProductId(this.id);  

            //send review to server and return to convert date to timeStamp
            ReviewDao.addReview(review)
                .then(review => {
                    this.reviews.push(review);
            });
        })
    },  
}
</script>

<style src='./productdetails.css'></style>