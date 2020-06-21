<template>
    <div>
       <div class="review-content">
         
            <star-rating :rating="review.starRating" :inline="true" :read-only="true" :star-size="20" :show-rating="false"></star-rating>
      
            <strong class="review-title">{{review.title}}</strong> 

            <p> <img v-if="verifiedAuthor" class="review-author-value" :src="'images/verified.png'"/> {{review.author}} | {{review.date}} </p>

            <div class="review-pros-cons-div">
                <h5 v-text="$ml.get('prosAndCons')"/>

                <li class="review-pros">
                    <ul v-for="pro in review.pros" :key="pro.pro">
                       ✔️ {{pro}}
                    </ul>
                </li>
                <li class="review-cons">
                    <ul v-for="con in review.cons" :key="con.con">
                       ❌ {{con}}
                    </ul>
                </li>

            </div>

            <p>{{review.content}}</p>
        </div>

        <div class="review-feedback">
            <h5 v-text="$ml.get('reviewUseful')"/>
            <button v-on:click="likeReview()" class="like-review-btn"></button>
            <p class="review-likes"> {{review.liked}} likes </p>
        </div>
    </div>
</template>

<script>
import Review from '@/models/Review.js';

import ReviewLogic from '@/logic/ReviewLogic.js';

export default {
    props: {    
      Review: Object
    },
    data() {
        return {
            reviewLogic: new ReviewLogic(),
            review: Object,
            verifiedAuthor: {
                type: Boolean,
                default: false
            }
        }  
    },
    mounted() {
        console.log('creating a review');        
        this.review = this.Review;        
        this.verifiedAuthor = this.review.reviewAuthorValue === 'Valued reviewer';
    },
    methods: {
        likeReview() {
            let userId = this.$session.get('user').id;
            this.reviewLogic.likeReview(userId, this.review.id)
                .then(review => {
                    let liked = review.liked;
                    if(this.review.liked == liked) {
                        this.$alert(this.$ml.get('alreadyLiked'));
                    }
                    else this.review.liked = liked;
                })
        }
    }
}
</script>

<style scoped src='./review.css'></style>