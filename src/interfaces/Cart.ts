import Product from "./Product";

export default interface Cart {
  userId: string;
  products: Product[];
  active: boolean;
}
