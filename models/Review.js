export default class Review {

    constructor(author, title, content, starRating) {

        this.author = author;
                    //send timeStamp
        this.date = Date.now();

        this.title = title;
        this.content = content;

        this.starRating = starRating;

        this.pros = [];
        this.cons = [];
    }

    setProductId(productId) {
        this.productId = productId;
    }

    addPros(...newPros) {
        this.pros.push.apply(this.pros, newPros);
    }

    addCons(...newCons) {
        this.cons.push.apply(this.cons, newCons);
    }


}