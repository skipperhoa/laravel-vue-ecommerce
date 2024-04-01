import { baseUrl } from '../_constants';
import products from '../data/products'
import axios from "axios";

export const productService={
    getProducts: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(products);
            }, 500);
        });
    },
    getAllProducts:(query)=>{
        let request =  axios.get(baseUrl+"/products",{
            params:query
        })
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(request);
            }, 100);
        });
    },
    products: (action, productId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (action === "add") {

                }
                resolve(productId);
            }, 100);
        });
    },
    getProductsWithId: async (action, productId) => {
        try {
            let id = parseInt(productId);
            let res = await axios.get(baseUrl + `/products/${id}`);
            let detail = res.data;
            // Format attribute images
            detail.data.images = JSON.parse(detail.data.images);
            return detail.data;
        } catch (error) {
            // Handle errors
            console.error('Error fetching product details:', error);
            throw error; // Re-throw the error to propagate it further if needed
        }
    }
}
