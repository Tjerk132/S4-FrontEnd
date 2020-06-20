import ReviewDao from '@/data/ReviewDao.js';

import CategoryLogic from '@/logic/CategoryLogic.js';

export default class ReviewLogic {

    constructor() {
        this.reviewDao = new ReviewDao();
        this.categoryLogic = new CategoryLogic();
    }

    removeItem(item, array) {

        var index = array.indexOf(item);

        //remove first occurance
        return array.splice(array.splice(index, 1));
    }

    validateProConInput(string, proconCount) {
        //input is not blank or whitespace
        if(string.trim()) {
            if(proconCount >= 4) {
                return false;
            }
            else return true;
        }
        else return false;
    }

    validateReviewSubmit(refs) {

        //validate no empty fields 
        let message; 
        refs.forEach(ref => {
            if(ref.name === 'Star Rating') {

                if(ref.value < 1 || ref.value > 5) {
                    message ='Please insert a star rating';
                }
            }
            else if(!ref.value || !ref.value.trim()) {
                message = 'Please fill in the ' + ref.name + ' field';
            }
        });
        return message;
    }

    async getAllReviewsByProduct(id) {
        let reviews = await this.reviewDao.getAllReviewsByProduct(id);

        //review author value is saved as enum object
        reviews.map(x => x.reviewAuthorValue = x.reviewAuthorValue.reviewAuthorValue);
        reviews.map(x => x.reviewAuthorValue = this.categoryLogic.toReadableCategory(x.reviewAuthorValue));

        return reviews;
    }

    async addReview(review) {
        return await this.reviewDao.addReview(review);
    }

    async likeReview(userId, reviewId) {
        return await this.reviewDao.likeReview(userId, reviewId);
    }
}  