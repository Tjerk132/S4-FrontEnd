<template>
    <div id="app">
        <title>{{product.name}} details </title>

        <h3>Details for {{product.name}} (id:{{product.id}})</h3>

        <h4>Reviews for {{product.name}}</h4>
        <div class="reviews">
            <ul>
                <li v-for="review in reviews" :key="review.review" class="review">
                    <ReviewComp :Review='review'></ReviewComp>
                </li>
            </ul>
        </div>
        <NewReview :key="newReviewKey"/>
    </div>
</template>

<script>
import Review from '../../models/Review.js';
import NewReview from '../NewReview/NewReview.vue';
import ReviewComp from '../../components/Review.vue';

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


        let r1 = new Review('Amazing quality', 'this product is very useful and practical, please buy thanks', 4.5, 34);
        r1.addPros('very nice', 'good design', 'amazing performance');
        r1.addCons('not so good', 'bad design');
        this.reviews.push(r1);

        let r2 = new Review('Good product', 'I recommend this amazing produc to everyone, It really is an amazing piece, please buy oo', 5, 21);
        r2.addPros('very nice', 'good design');
        r2.addCons('not so good', 'bad design', 'terrible experience', 'not recommenden');
        this.reviews.push(r2);

        
      this.$root.$on('addReview', (review) => {
            this.reviews.push(review);
            //destroy newReview component and create a new one
            this.newReviewKey += 1;
        })
    },
    methods: {

    }    
}
</script>

<style src='./productdetails.css'></style>