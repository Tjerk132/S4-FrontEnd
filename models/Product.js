export default class Product {

    constructor(id, name, imageUrl, description, price, category, stockCount, reviewCount) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.stockCount = stockCount;
        this.reviewCount = reviewCount;
    }
}