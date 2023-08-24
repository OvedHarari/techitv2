import axios from "axios";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/products`;

export function getProducts() {
  return axios.get(api, {headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string).token}});
}

export function getProductById(id: string) {
  return axios.get(`${api}/${id}`, {headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string).token}});
}

export function addNewProduct(newProduct: Product) {
  return axios.post(api, newProduct, {headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string).token}});
}
export function updateProduct(updatedPruduct: Product, _id: string) {
  return axios.put(`${api}/${_id}`, updatedPruduct, {headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string).token}});
}
export function deleteProduct(id: string) {
  return axios.delete(`${api}/${id}`, {headers: {Authorization: JSON.parse(sessionStorage.getItem("token") as string).token}});
}
