import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productsService";
import Product from "../interfaces/Product";
import NewProductModal from "./NewProductModal";
import DeleteProductModal from "./DeleteProductModal";
import UpdateProductModal from "./UpdateProductModal";
import { addToCart, getCartById } from "../services/cartService";
import { successMsg } from "../services/feedbacksService";

interface ProductsProps {
  userInfo: any;
}

const Products: FunctionComponent<ProductsProps> = ({ userInfo }) => {
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let [openNewProductModal, setOpenNewProductModal] = useState<boolean>(false);
  let [openUpdateProductModal, setOpenUpdateProductModal] =
    useState<boolean>(false);
  let [openDeleteProductModal, setOpenDeleteProductModal] =
    useState<boolean>(false);
  let [products, SetProducts] = useState<Product[]>([]);
  let [productId, setProductId] = useState<string>("");
  let [productName, setProductName] = useState<string>("");
  useEffect(() => {
    getProducts()
      .then((res) => SetProducts(res.data))
      .catch((err) => console.log(err));
  }, [dataUpdated]);
  let render = () => setDataUpdated(!dataUpdated);
  let handleAddToCart = (product: Product
    // , quantity: number
  ) => {

    getCartById().then((res) => {
      // console.log(res.data)
      // let inCart = res.data.find((id: any) => id._id = product._id);
      // if (!inCart) {
      addToCart({
        ...product
        // , quantity: quantity 
      }).then((res) =>
        successMsg(`The product: ${productName} was added to cart`)
      )
        .catch((err) => console.log(err));
      // } else {
      //   console.log(inCart);
      //   inCart.quantity++

      //   addToCart({
      //     ...product
      //     // , quantity: quantity 
      //   }).then((res) =>
      //     successMsg(`The product: ${productName} was added to cart`)
      //   )
      //     .catch((err) => console.log(err)


    }).catch((err) => console.log((err)))




  };
  return (
    <>
      <div>
        <h1 className="display-3">Products</h1>
        <div className="text-end m-4 mb-2">
          {userInfo.isAdmin && (
            <Link
              to=""
              className="btn btn-success ms-2"
              onClick={() => setOpenNewProductModal(true)}
            >
              <i className="fa-solid fa-plus"></i> Add Product
            </Link>
          )}
        </div>
        {products.length ? (
          <div className="container">
            <div className="row">
              {products.map((product: Product) => (
                <div
                  key={product._id}
                  className="card col-md-4 mx-2 mt-3"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={product.image}
                    className="card-img-top mt-2"
                    alt={product.name}
                    style={{ width: "16.5rem", height: "16.5rem" }}
                  />
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      {product.category}
                    </h6>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text text-success">{product.price} ₪</p>
                    <Link
                      to="#"
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product
                        // , (product.quantity) as number + 1
                      )}
                    >
                      <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                    </Link>
                    {userInfo.isAdmin && (
                      <>
                        <Link
                          to=""
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            setProductId(product._id as string);
                            setProductName(product.name);
                            setOpenUpdateProductModal(true);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <Link
                          to=""
                          className="btn btn-danger"
                          onClick={() => {
                            setProductId(product._id as string);
                            setProductName(product.name);
                            setOpenDeleteProductModal(true);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No products</p>
        )}

        <NewProductModal
          show={openNewProductModal}
          onHide={() => setOpenNewProductModal(false)}
          render={render}
        />
        <DeleteProductModal
          show={openDeleteProductModal}
          onHide={() => setOpenDeleteProductModal(false)}
          render={render}
          productId={productId}
          productName={productName}
        />
        <UpdateProductModal
          show={openUpdateProductModal}
          onHide={() => setOpenUpdateProductModal(false)}
          render={render}
          productId={productId}
          productName={productName}
        />
      </div>
    </>
  );
};

export default Products;
