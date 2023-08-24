import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  userInfo: any;
  setUserInfo: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo }) => {
  let navigate = useNavigate();
  let logout = () => {
    sessionStorage.removeItem("userInfo");
    setUserInfo({ email: false, isAdmin: false });
    navigate("/");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-md bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            TachIt
          </NavLink>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {userInfo.email && (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/carts">
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <button className="btn btn-outline-light" onClick={logout}>
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
