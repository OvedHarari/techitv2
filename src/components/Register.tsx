import { FunctionComponent } from "react";
import { addUser } from "../services/usersService";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMsg } from "../services/feedbacksService";

interface RegisterProps {
  setUserInfo: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ setUserInfo }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit(values) {
      addUser({ ...values, isAdmin: false })
        .then((res) => {
          navigate("/home");
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              email: res.data.email,
              isAdmin: res.data.isAdmin,
            })
          );
          setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
          successMsg(`${values.email} wes registered and logged in`);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="container col-md-5 mt-5">
      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
        <form
          className="form-floating mb-3 mt-3"
          onSubmit={formik.handleSubmit}
        >
          <p className="display-3">Register !</p>
          <div className="form-floating mb-3">
            <input
              type="name"
              className="form-control"
              id="floatingName"
              placeholder="John Doe"
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

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            ></input>
            <label htmlFor="floatingInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            ></input>
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>

          <button className="btn btn-secondary w-100 mt-3" type="submit">
            Register
          </button>
        </form>

        <label className="form-check-label" htmlFor="form2Example3">
          Already registered? <br />
          <Link to={"/"}>Click here to Login</Link>
        </label>
      </div>
    </div>
  );
};

export default Register;
