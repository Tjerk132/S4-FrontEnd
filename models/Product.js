export default class Product {

    constructor(id, name, imageUrl, description, price, stockCount, commentCount) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.stockCount = stockCount;
        this.commentCount = commentCount;
    }
}