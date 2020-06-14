import ReviewDao from '@/data/ReviewDao.js';

export default class ReviewLogic {

    constructor() {
        this.reviewDao = new ReviewDao();
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
        return this.reviewDao.getAllReviewsByProduct(id);
    }

    async addReview(review) {
        return this.reviewDao.addReview(review);
    }
}  