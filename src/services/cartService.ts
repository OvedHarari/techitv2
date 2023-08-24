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

// // add to cart / update cart
// export async function addToCart(userId: string, productToAdd: Product) {
//   try {
//     // 1. search for the exising cart products
//     let res = await getCartById();

//     // 2. add the new product to the products array
//     res.data[0].products.push({ ...productToAdd, quantity: 1 });
//     // 3. update the cart - put or patch
//     return axios.patch(`${api}/${res.data[0].id}`, {
//       products: res.data[0].products,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

