import assert from 'assert';
import ReviewSummaryLogic from'@/logic/ReviewSummaryLogic.js';
import Review from'@/models/Review.js';

const reviewSummaryLogic = new ReviewSummaryLogic();

describe('ReviewSummaryLogic Tests', () => {

    it('should calculate reviewAvg correct', () => {

        let reviews = [
            { starRating: 5 },
            { starRating: 4 },
            { starRating: 4 }
        ];

        let reviewAvg = reviewSummaryLogic.getAvgRating(reviews)

        assert.equal(reviewAvg, 4.3);
    });

    
    it('should calculate reviewAvg percentages correct', () => {

        let reviews = [
            { starRating: 5 },
            { starRating: 5 },
            { starRating: 4 }
        ];

        let reviewSummary = reviewSummaryLogic.calculatePercentages(5, reviews, 3);

        assert.equal(reviewSummary.length, 5);
                    //first is 5 when maxRating is 5 (=index1)
        let starAvg = reviewSummary[0].percentage.toFixed(1);
        assert.equal(starAvg, 66.7);
    });

    it('should calculate reviewAvg rating percentages correct', () => {

        let reviews = [
            { starRating: 5 },
        ];

        let reviewSummary = reviewSummaryLogic.calculatePercentages(5, reviews, 1);

        assert.equal(reviewSummary.length, 5);

        let starAvg = reviewSummary[0].percentage.toFixed(1);
        assert.equal(starAvg, 100.0);
    });
});