import assert from 'assert';
import ReviewLogic from '@/logic/ReviewLogic.js';

const reviewLogic = new ReviewLogic();

describe('ReviewLogic Tests', () => {

    it('should remove item from pros', () => {
        
        let pros = [
            "pro1",
            "pro2",
            "pro3"
        ];

        pros = reviewLogic.removeItem("pro2", pros);

        assert.equal(pros.length, 2);
                                    //not found
        assert.equal(pros.indexOf("pro2"), -1);
        assert.equal(pros.indexOf("pro1"), 0);
    });

    it('should check for too many pros', () => {

        let accepted = reviewLogic.validateProConInput("pro2", 4);

        assert.equal(accepted, false);
    });

    it('should check incorrent input', () => {

        let accepted = reviewLogic.validateProConInput(" ", 0);

        assert.equal(accepted, false);
    });

    it('should validate review submission', () => {

        let refs = [
            { name: 'Content', value: ' ' }, 
        ];

        let message = reviewLogic.validateReviewSubmit(refs);

        assert.equal(message, 'Please fill in the Content field');
    });

});