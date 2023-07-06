import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { userValidation } from "../services/usersService";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacksService";
// import { errorMsg } from "../services/feedbacksService";

interface LoginProps {
  setUserInfo: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      console.log(values);

      userValidation(values)
        .then((res) => {
          if (res.data.length) {
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                email: values.email,
                isAdmin: res.data[0].isAdmin,
              })
            );
            setUserInfo(
              JSON.parse(sessionStorage.getItem("userInfo") as string)
            );
            successMsg(`You're logged in as ${values.email}`);
            navigate("home");
          } else errorMsg("Wrong Email or Password");
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="container mt-5">
      <h3 className="display-3 mt-3">Login</h3>
      <div className="container box-shadow col-md-3 mt-5 login">
        <form onSubmit={formik.handleSubmit}>
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
              <small className="text-danger">{formik.errors.email}</small>
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
              <small className="text-danger">{formik.errors.password}</small>
            )}
          </div>
          <button
            className="btn btn-secondary w-100 mt-3"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Login
          </button>
        </form>
        <div className="mt-3">
          <p>
            New User ? <br /> <Link to={"/register"}>Register here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
