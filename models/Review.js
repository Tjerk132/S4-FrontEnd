export default class Review {

    constructor(title, content, starRating, liked) {
        this.title = title;
        this.content = content;

        this.starRating = starRating;
        this.liked = liked;
        this.pros = [];
        this.cons = [];
    }

    addPros(...newPros) {
        this.pros.push.apply(this.pros, newPros);
    }

    addCons(...newCons) {
        this.cons.push.apply(this.cons, newCons);
    }


}