import ProductDao from '@/data/ProductDao.js';
import ShoppingCartItem from'@/models/ShoppingCartitem.js';

export default class ProductLogic {

    constructor() {
        this.productDao = new ProductDao();
    }

    addToShoppingCart(newProduct, cartItems) {
        
        cartItems = checkExistingBasket(cartItems);

        cartItems = existsInBasket(newProduct, cartItems);

        return cartItems;
    } 

    removeFromShoppingCart(productToBeRemoved, cartItems) {
        
        cartItems = checkExistingBasket(cartItems);
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

    async getAllProducts() {        
        return this.productDao.getAllProducts();
    }

    async getProductById(id) {
        return this.productDao.getProductById(id);
    }

    async addProduct(product) {
        return this.productDao.addProduct(product);
    }

    async updateProduct(product) {
        return this.productDao.updateProduct(product);
    }

    async getProductCategories() {
        return this.productDao.getProductCategories();
    }

    async getProductsByCategory(category) {
        return this.productDao.getProductsByCategory(category);
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