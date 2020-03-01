<template>
    <div>
       <div class="reviewContent">
            <span v-for="star in review.starRating" :key="star.star">
                 ★
            </span> 
            <strong>{{review.title}}</strong>
            <p> {{review.author}} | {{review.date}} </p>

            <div class="reviewProsConsDiv">
                <h5>Pros and cons</h5>

                <li class="reviewPros">
                    <ul v-for="pro in review.pros" :key="pro.pro">
                        (+) {{pro}}
                    </ul>
                </li>
                <li class="reviewCons">
                    <ul v-for="con in review.cons" :key="con.con">
                        (-) {{con}}
                    </ul>
                </li>

            </div>

            <p>{{review.content}}</p>
        </div>

        <div class="reviewFeedBack">
            <h5>Was this review useful?</h5>
            <button class="likeReviewBtn"></button>
            <p class="reviewLikes"> {{review.liked}} likes </p>
        </div>
    </div>
</template>

<script>
import Review from '../../models/Review.js';

export default {
     props: {    
      Review: Object
    },
    data() {
        return {
            review: Object
        }  
    },
    mounted() {
        console.log('creating a review');
        this.review = this.Review;
    }
}
</script>

<style src='./Review.css'></style>