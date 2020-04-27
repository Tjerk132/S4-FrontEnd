module.exports = class Product {

    constructor(id, name, imageUrl, description, price, category, stockCount, reviewCount) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stockCount = stockCount;
        this.reviewCount = reviewCount;
    }
}