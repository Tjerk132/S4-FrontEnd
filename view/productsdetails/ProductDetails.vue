<template>
    <div class="productDetails">
        <div class="productReviews">
            <title v-text="$ml.get('Details')"/>

            <h3 v-text="$ml.get('Details')">(id:{{product.id}})</h3>

            <ReviewsComp v-if="!loadingData" :Reviews='reviews' :Product='product' />
        </div>

        <suggestions v-if="!loadingData" :Category='product.category' :ProductId='product.id' class="productSuggestions"/>
 
    </div>
</template>

<script>
import ReviewsComp from '../../components/Reviews/Reviews.vue';
import Suggestions from '../../components/Suggestions/Suggestions.vue';

import ReviewDao from '../../data/reviewdao.js';
import ProductDao from '../../data/productdao.js';

import { MLBuilder } from 'vue-multilanguage';

export default {

    components: {
        ReviewsComp,
        Suggestions
    },
    props: {    
      id: Number,    
    },
    data() {
        return {
            product: Object,
            reviews: Array,
            loadingData: 2
        }
    },
    mounted() {

        window.scrollTo(0,0);

        ProductDao.getProductById(this.id)
            .then((product) => {
                this.product = product;  
                this.loadingData -= 1;
        });

        ReviewDao.getAllReviewsByProduct(this.id)
            .then((reviews) => {
        
                this.reviews = reviews;
                this.loadingData -= 1;  
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
    },
    created() {
        //create ref for addReview to emit
        this.$root.$refs.detailsPage = this;
    }
}
</script>

<style src='./productdetails.css'></style>