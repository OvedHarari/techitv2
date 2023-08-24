import axios from "axios";
import Product from "../interfaces/Product";
import _ from "lodash";

let api: string = `${process.env.REACT_APP_API}/carts`;

//  getCartById
export function getCartById() {
  return axios.get(`${api}`, {headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string).token}});
}



// add to cart / update cart
export function addToCart(productToAdd: Product) {
    return axios.post(`${api}`,(_.pick(productToAdd, ["_id", "name", "category", "description", "price", "image"]) ), {headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string).token}});
}


