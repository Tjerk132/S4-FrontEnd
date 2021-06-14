import ProductDao from '@/data/ProductDao.js';
import ShoppingCartItem from'@/models/ShoppingCartitem.js';

import CategoryLogic from '@/logic/CategoryLogic.js';

export default class ProductLogic {

    constructor() {
        this.productDao = new ProductDao();
        this.categoryLogic = new CategoryLogic();
    }

    addToShoppingCart(newProduct, cartItems) {
        
        cartItems = this.checkExistingBasket(cartItems);

        cartItems = this.existsInBasket(newProduct, cartItems);

        return cartItems;
    } 

    removeFromShoppingCart(productToBeRemoved, cartItems) {
        
        cartItems = this.checkExistingBasket(cartItems);
        //remove product from shopping cart
        for(let i = 0; i < cartItems.length; i++) {
            let cartItem = cartItems[i];
            let product = cartItem.product;

            if(product.id == productToBeRemoved.id) {
                if(cartItem.quantity > 0) {
                    //lower quantity for chosen product
                    cartItem.quantity--;
                }
                if(cartItem.quantity == 0) {
                    //remove cartItem completely
                    let index = cartItems.indexOf(cartItem);
                    cartItems.splice(index, 1);
                }
            }  
        
        }
        return cartItems;
    }

    checkExistingBasket(products) {
        //create new basket if user doesn't have one  
        return products == null ? [] : products;
    }

    calculateBasketCosts(cartItems) {
        let totalCosts = 0;
        cartItems.forEach(cartItem => {
            for(let i = 0; i < cartItem.quantity; i++) {

                let product = cartItem.product;
                totalCosts += product.price;
            }
        });
        return totalCosts.toFixed(2);
    }

    getProductIds(cartItems) {

        let productIds = [];

        if(cartItems.length) {
            cartItems.forEach(cartItem => {
                
                let product = cartItem.product;
                for(let i = 0; i < cartItem.quantity; i++) {
                    //add each product individually
                    productIds.push(product.id);
                }
            });
            return productIds;
        }
        else return [];
    }

    getTotalQuantity(cartItems) {
        let totalQuantity = 0;
        cartItems.forEach(cartItem => {
            totalQuantity += cartItem.quantity;
        });
        return totalQuantity;
    }

    existsInBasket(p, cartItems) {
        let exists = false;
        cartItems.forEach(item => {
            let product = item.product;
            if(p.id == product.id) {
                item.quantity++;
                exists = true;
                return cartItems;
            }
        }); 
        //still gets triggered otherwise somehow
        if(!exists) {
            cartItems.push(new ShoppingCartItem(p, 1));
            return cartItems;
        }
        else return cartItems;
    }
    
    async getProductById(id) {
        let data = await this.productDao.getProductById(id);
        //category is saved as enum object
        let category = data.category.category;
        category = this.categoryLogic.toReadableCategory(category);

        let product = data;
        product.category = category;

        return product;   
    }

    async addProduct(product) {
        return this.productDao.addProduct(product);
    }

    async updateProduct(product) {
        return this.productDao.updateProduct(product);
    }

    async getProductCategories() {
        let data = await this.productDao.getProductCategories();

        let categories = data.map(x => x.category);

        return categories.map(x => x = this.categoryLogic.toReadableCategory(x))
    }

    async getProductsByCategory(category) {
        category = this.categoryLogic.toRestCategory(category);

        return await this.productDao.getProductsByCategory(category);
    }

    async getProductsByName(name) {
        return this.productDao.getProductsByName(name);
    }

    async removeBasketProductsFromStore(products) {
        return this.productDao.removeBasketProductsFromStore(products);
    }

    async getTopRatedProducts() {
        return this.productDao.getTopRatedProducts();
    }
}