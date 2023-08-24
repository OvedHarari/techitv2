import { FunctionComponent, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { addNewProduct } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbacksService";
import { useNavigate } from "react-router-dom";

interface AddProductProps {
  onHide: Function;
  render: Function;
}

const AddProduct: FunctionComponent<AddProductProps> = ({ onHide, render }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "/images/...",
      quantity: 0
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      price: yup.number().required().min(1),
      category: yup.string().required().min(2),
      description: yup.string().required().min(2).max(60),
      image: yup.string().required().min(2),
    }),
    onSubmit: (values: Product) => {
      addNewProduct(values)
        .then((res) => {
          render();
          onHide();
          navigate("/products");
          successMsg("The product was added succesfulley!");
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    formik.setFieldValue("price", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container ">
      <form className="form-floating mb-3 mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3 shadow">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Product Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          ></input>
          <label htmlFor="floatingName">Name</label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-floating mb-3 shadow">
          <input
            type="number"
            className="form-control"
            id="floatingPrice"
            placeholder="Product Price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.handleBlur}
          ></input>
          <label htmlFor="floatingPrice">Price</label>
          {formik.touched.price && formik.errors.price && (
            <p className="text-danger">{formik.errors.price}</p>
          )}
        </div>
        <div className="form-floating mb-3 shadow">
          <input
            type="text"
            className="form-control"
            id="floatingCategory"
            placeholder="Product Category"
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            onBlur={formik.handleBlur}
          ></input>
          <label htmlFor="floatingCategory">Category</label>
          {formik.touched.category && formik.errors.category && (
            <p className="text-danger">{formik.errors.category}</p>
          )}
        </div>
        <div className="form-floating mb-3 shadow">
          <textarea
            className="form-control mb-3"
            placeholder="Product Description"
            id="floatingDescription"
            style={{ height: "100px" }}
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          ></textarea>
          <label htmlFor="floatingDescription">Product description</label>
          {formik.touched.description && formik.errors.description && (
            <p className="text-danger">{formik.errors.description}</p>
          )}
        </div>
        <div className="form-floating mb-3 shadow">
          <input
            type="text"
            className="form-control"
            id="floatingImage"
            placeholder="Product Image"
            name="image"
            onChange={formik.handleChange}
            value={formik.values.image}
            onBlur={formik.handleBlur}
          ></input>
          <label htmlFor="floatingImage">Image URL</label>
          {formik.touched.image && formik.errors.image && (
            <p className="text-danger">{formik.errors.image}</p>
          )}
        </div>
        <button
          className="btn btn-success mt-3 w-100"
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
        >
          <i className="fa-solid fa-plus"></i> Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
