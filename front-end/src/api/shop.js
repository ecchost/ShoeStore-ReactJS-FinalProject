import ProductsServices from "../services/products/services"
import _data from "./data.json"

const getProduct = (cb, timeout) => {
    return setTimeout(() => cb(fetchProducts()), timeout || TIMEOUT)
}

export const buyProducts = (payload, cb, timeout) => {
    return setTimeout(() => cb(), timeout || TIMEOUT)
}

function fetchProducts(){
    return ProductsServices.get().on("value",parseProducts);
}

function parseProducts(value){
    return value.val();
}

const TIMEOUT = 100

export default {
    getProducts: (cb, timeout) => setTimeout(() => cb(_data), timeout || TIMEOUT)
}
