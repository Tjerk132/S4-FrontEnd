const assert = require('assert');
const ReviewSummaryLogic = require('../logic/ReviewSummaryLogic.js');
const Review = require('../models/Review.js');

describe('ReviewSummaryLogic Tests', () => {

    it('should calculate reviewAvg correct', () => {

        let reviews = [
            { starRating: 5 },
            { starRating: 4 },
            { starRating: 4 }
        ];

        let reviewAvg = ReviewSummaryLogic.getAvgRating(reviews)

        assert.equal(reviewAvg, 4.3);
    });

    
    it('should calculate reviewAvg percentages correct', () => {

        let reviews = [
            { starRating: 5 },
            { starRating: 5 },
            { starRating: 4 }
        ];

        let reviewSummary = ReviewSummaryLogic.calculatePercentages(5, reviews, 3);

        assert.equal(reviewSummary.length, 5);
                    //first is 5 when maxRating is 5 (=index1)
        let starAvg = reviewSummary[0].percentage.toFixed(1);
        assert.equal(starAvg, 66.7);
    });

    it('should calculate reviewAvg rating percentages correct', () => {

        let reviews = [
            { starRating: 5 },
        ];

        let reviewSummary = ReviewSummaryLogic.calculatePercentages(5, reviews, 1);

        assert.equal(reviewSummary.length, 5);

        let starAvg = reviewSummary[0].percentage.toFixed(1);
        assert.equal(starAvg, 100.0);
    });
});