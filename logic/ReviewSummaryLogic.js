import ReviewSummaryItem from '@/models/ReviewSummaryItem.js';

export default class ReviewSummaryLogic {

    getAvgRating(reviews) {

        let totalRating = 0;
        reviews.forEach(review => {
            totalRating += review.starRating;
        });
        return (totalRating / reviews.length).toFixed(1);
    }

    calculatePercentages(maxRating, reviews, reviewCount) {
        let reviewSummary = [];
        for(let i = maxRating; i > 0; i--) {

            let count = reviews.filter(x => x.starRating == i).length;
            reviewSummary.push(new ReviewSummaryItem(i, count));
        }
        reviewSummary = this.calculateRatingPercentages(reviewSummary, reviewCount);
        return reviewSummary;
    }

    calculateRatingPercentages(reviewSummary, reviewCount) {

        reviewSummary.forEach(ReviewSummaryItem => {
            let percentage = (ReviewSummaryItem.quantity / reviewCount) * 100;
            ReviewSummaryItem.percentage = percentage;
        });
        return reviewSummary;
    }

}