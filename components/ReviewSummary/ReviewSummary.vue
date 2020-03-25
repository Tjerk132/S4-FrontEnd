<template>
    <div>
        <div class="ReviewSummaryHeader">
            <div class="ReviewAverage">
                <h1>
                    {{avgRating}} 
                </h1>
            </div>
            <div class="ReviewAverageCount">
                <p v-text="$ml.get('ReviewCount')"/>
            </div>
        </div>

        <p class="OutOfText" v-text="$ml.get('OutOf')"/>
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

import { MLBuilder } from 'vue-multilanguage';

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
    },
    computed: {
        mlReviewCount() {            
            return new MLBuilder('numberOfReviews').with('r', this.reviewCount);
        },
        mlOutOf() {            
            return new MLBuilder('outOf').with('t', this.maxRating);
        },
    },
}
</script>

<style src='./ReviewSummary.css'></style>