<template>
    <div>
        <div class="ReviewSummaryHeader">
            <div class="ReviewAverage">
                <h1>
                    {{avgRating}} 
                </h1>
            </div>
            <div class="ReviewAverageCount">
                <p>
                    Number of reviews: 
                    <strong>
                        {{reviewCount}}
                    </strong>
                </p>
            </div>
        </div>

        <p class="OutOfText">out of 5</p>
        <div class="RatingStars">
            <div v-for="average in reviewAverages" :key="average.average">
                <span v-for="star in average.starRating" :key="star.star">
                    ★
                </span>
                    <progress v-bind:value="average.percentage" max="100">
                        {{average.percentage}}%
                    </progress>
                    {{average.quantity}}
            </div>
        </div>
    </div>
</template>

<script>
import ReviewSummaryLogic from '../../logic/ReviewSummaryLogic.js';
import ReviewSummaryItem from '../../models/ReviewSummaryItem.js';

export default {

    props: {    
      Reviews: Array
    },
    data() {
        return {
            reviewCount: Number,
            reviewAverages: Array,
            avgRating: Number,
            maxRating: 5
        }  
    },
    mounted() {
        console.log('creating a review summary');
        let reviews = this.Reviews;

        this.reviewCount = reviews.length;
        this.avgRating = ReviewSummaryLogic.getAvgRating(reviews);
        this.reviewAverages = ReviewSummaryLogic.calculatePercentages(this.maxRating, reviews, reviews.length);
    }
}
</script>

<style src='./ReviewSummary.css'></style>