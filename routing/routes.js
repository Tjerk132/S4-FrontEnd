import Home from '../view/home/Home.vue';
import Products from '../view/products/Products.vue';
import Details from '../view/details/Details.vue';
import ProductDetails from '../view/productsdetails/ProductDetails.vue';
import ShoppingCart from '../view/ShoppingCart/ShoppingCart.vue';
import NotFound from '../view/error/NotFound.vue';

const routes = [
    { 
        path: '/',
        name: 'home',
        component: Home 
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
    },
    {
        path: '/details',
        name: 'details',
        component: Details,
        children: [
            {
                path: ':id',
                name: 'productDetails',
                component: ProductDetails,
                props(route) {
                    // cast to number
                    const props = route.params;
                    props.id = +props.id;
                    return props;
                }
            },
        ]
    },
    {
        path: '/shoppingcart',
        name: 'shopping cart',
        component: ShoppingCart
    },
    { 
        path: '*',
        name: 'error',
        component: NotFound 
    },
]

export default routes;