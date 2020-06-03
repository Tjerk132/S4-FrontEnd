<template>
    <div>
       <div class="reviewContent">
         
            <star-rating :rating="review.starRating" :inline="true" :read-only="true" :star-size="20" :show-rating="false"></star-rating>
      
            <strong class="reviewTitle">{{review.title}}</strong>
        
            <p> {{review.author}} | {{review.date}} </p>

            <div class="reviewProsConsDiv">
                <h5 v-text="$ml.get('prosAndCons')"/>

                <li class="reviewPros">
                    <ul v-for="pro in review.pros" :key="pro.pro">
                       ✔️ {{pro}}
                    </ul>
                </li>
                <li class="reviewCons">
                    <ul v-for="con in review.cons" :key="con.con">
                       ❌ {{con}}
                    </ul>
                </li>

            </div>

            <p>{{review.content}}</p>
        </div>

        <div class="reviewFeedBack">
            <h5 v-text="$ml.get('reviewUseful')"/>
            <button class="likeReviewBtn"></button>
            <p class="reviewLikes"> {{review.liked}} likes </p>
        </div>
    </div>
</template>

<script>
import Review from '@/models/Review.js';

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

<style scoped src='./Review.css'></style>