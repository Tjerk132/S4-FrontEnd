import ReviewSummaryItem from '@/models/ReviewSummaryItem.js';

function getAvgRating(reviews) {

    let totalRating = 0;
    reviews.forEach(review => {
        totalRating += review.starRating;
    });
    return (totalRating / reviews.length).toFixed(1);
}

function calculatePercentages(maxRating, reviews, reviewCount) {
    let reviewSummary = [];
    for(let i = maxRating; i > 0; i--) {

        let count = reviews.filter(x => x.starRating == i).length;
        reviewSummary.push(new ReviewSummaryItem(i, count));
    }
    reviewSummary = calculateRatingPercentages(reviewSummary, reviewCount);
    return reviewSummary;
}

//private
function calculateRatingPercentages(reviewSummary, reviewCount) {

    reviewSummary.forEach(ReviewSummaryItem => {
        let percentage = (ReviewSummaryItem.quantity / reviewCount) * 100;
        ReviewSummaryItem.percentage = percentage;
    });
    return reviewSummary;
}

export default {
    getAvgRating,
    calculatePercentages,
}