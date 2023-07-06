import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productsService";
import Product from "../interfaces/Product";
import NewProductModal from "./NewProductModal";

interface ProductsProps {
  userInfo: any;
}

const Products: FunctionComponent<ProductsProps> = ({ userInfo }) => {
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let [openNewProductModal, setOpenNewProductModal] = useState<boolean>(false);
  let [products, SetProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts()
      .then((res) => {
        SetProducts(res.data);
        console.log(dataUpdated);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [dataUpdated]);
  let render = () => setDataUpdated(!dataUpdated);

  return (
    <>
      <div>
        <h1 className="display-3">Products</h1>
        <div className="text-start mb-2">
          {userInfo.isAdmin && (
            <Link
              to=""
              className="btn btn-success ms-2"
              onClick={() => setOpenNewProductModal(true)}
            >
              <i className="fa-solid fa-plus"></i> Add Product
            </Link>
            // <Link to="/add-product" className="btn btn-success ms-2">
            //   <i className="fa-solid fa-plus"></i> Add Product
            // </Link>
          )}
        </div>
        {products.length ? (
          <div className="container">
            <div className="row">
              {products.map((product: Product) => (
                <div
                  key={product.id}
                  className="card col-md-4 mx-2 mt-2"
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
                    <Link to="#" className="btn btn-primary">
                      <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                    </Link>
                    {userInfo.isAdmin && (
                      <>
                        <Link to="" className="btn btn-warning mx-2">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <Link to="" className="btn btn-danger">
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
      </div>
    </>
  );
};

export default Products;
