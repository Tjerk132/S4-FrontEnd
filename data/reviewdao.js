let host = require('./host.js').host;

let baseUrl = 'http://' + host.ip + ":" + host.port + '/reviews/';

async function getAllReviewsByProduct(id) {

    try {
        let url = baseUrl + "product/" + id;

        let res = await axios.get(url);

        return res.data;
    }
    catch (err) {
        console.error(err);
    }
}

async function addReview(review) {

    try {

        let url = baseUrl + "add";

        //send review in json format
        let res = await axios.post(url, {
            // id: 0,
            productId: review.productId,
            author: review.author,
            date: review.date,
            title: review.title,
            content: review.content,
            starRating: review.starRating,
            // liked: 0,
            pros: review.pros,
            cons: review.cons

        });

        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}

export default {
    
    getAllReviewsByProduct,
    addReview,
}

