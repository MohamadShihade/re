import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch } from "react-redux";
//import DashHeader from './DashHeader'
//import DashFooter from './DashFooter'
import "./layout_styles.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "../../global/_global.scss";
import "../../global/_global_dashboard.scss";
import NewLayout from "../../Components/NewLayout/NewLayout";
import {
  AdminMenuItems,
  EmployeeMenuItems,
  FinancialMenuItems,
  LogisticsMenuItems,
  SalesManagerMenuItems,
} from "../../Components/Navbar/MenuItems";
import useAuth from "../../hooks/useAuth";
import { logOut } from "../../store/authSlice";
import { emptyCart } from "../../store/cartSlice";
import { clearFilters } from "../../store/filtersSlice";
const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(useAuth()?.username);
  const moveTop = () => {
    window.scrollTo(0, 0);
    let mybutton = document.getElementById("btn-back-to-top");
  };
  const { isAdmin, roles } = useAuth();
  let MenuItems = EmployeeMenuItems;
  if (isAdmin) {
    MenuItems = AdminMenuItems;
  }
  if (roles.includes("Sales Manager")) {
    MenuItems = SalesManagerMenuItems;
  }
  if (roles.includes("Financial")) {
    MenuItems = FinancialMenuItems;
  }
  if (roles.includes("Logistics")) {
    MenuItems = LogisticsMenuItems;
  }
  const logout = (r) => {
    dispatch(logOut());
    dispatch(emptyCart());
    dispatch(clearFilters());

    navigate("/");

    setUser(null);
  };
  const [currentPage, setCurrentPage] = useState("home");
  const [isOpen, setIsoOpen] = useState(false);

  return (
    <>
      <span id="btn-back-to-top" className="ags-btn-top" onClick={() => moveTop()}>
        <i class="uil uil-arrow-circle-up"></i>
      </span>
      {/* <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button">Something else here</button>
  </div>
</div> */}
      <span id="btn-back-to-top" className="ags-btn-top" onClick={() => moveTop()}>
        <i class="uil uil-arrow-circle-up"></i>
      </span>
      <div className={`snippet-body ${isOpen ? "" : ""} `}>
        <header className={`header ${isOpen ? "" : "body-pd"} `} id="header">
          <div className="header_toggle" onClick={() => setIsoOpen((prev) => !prev)}>
            <i className={`bx bx-menu ${isOpen ? "" : "bx-x"} `} id="header-toggle"></i>
          </div>
          {/* <div class="dropdown show">
            <div
              className="profile-img"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="/images/avatar.png" alt="avatar-img" />{" "}
            </div>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
              <p class="dropdown-item"  onClick={() => { navigate("/user/home"); }} >
                <i class="uil uil-user-circle"></i> {user}
              </p>
              <a class="dropdown-item" onClick={logout}>
                <i class="uil uil-sign-out-alt"></i>
                <span className="nav_name">Signout</span>
              </a>
            </div>
          </div> */}
          <div className="buttons-navbar">
            <button className="ags-btn-main-fill"> {user} </button>
            <button className="ags-btn-main" onClick={logout}>
              {" "}
              Sign out
            </button>
          </div>
        </header>
        {/* {`l-navbar  ${isOpen ? '' : 'show' } `} */}
        <div className={`l-navbar  ${isOpen ? "" : "show"} `} id="nav-bar">
          <nav className="nav">
            <div>
              {" "}
              <p
                className="nav_logo "
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/user/home");
                }}
              >
                {" "}
                <i className="bx bx-layer nav_logo-icon"></i> <span className="nav_logo-name">AGS</span>{" "}
              </p>
              <div className="nav_list">
                {isAdmin && (
                  <>
                    <button class="nav_link" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <a class="invoice">
                        <i className={`bx nav_icon  bx bx-down-arrow`}></i> <span>Invoice</span>
                      </a>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right dropdown-invoice">
                      {/* <a class="dropdown-item "> */}
                        <Link  class="dropdown-item " to="/user/makepi" className="invoice-item dropdown-item" onClick={() => {  dispatch(emptyCart()); }}  >
                          Performa Invoice
                        </Link>
                      {/* </a> */}
                      {/* <a class="dropdown-item"> */}
                        <Link
                          to="/user/makepo"
                          className="invoice-item dropdown-item"
                          onClick={() => {
                            dispatch(emptyCart());
                          }}
                        >
                          Purchase Order
                        </Link>
                      {/* </a> */}
                      {/* <a class="dropdown-item"> */}
                        <Link
                          to="/user/warranty"
                          className="invoice-item dropdown-item"
                          onClick={() => {
                            dispatch(emptyCart());
                          }}
                        >
                          Quotation
                        </Link>
                      {/* </a> */}
                      {/* <a class="dropdown-item "> */}
                        <Link
                          to="/user/packinglistmanual"
                          className="invoice-item dropdown-item"
                          onClick={() => {
                            dispatch(emptyCart());
                          }}
                        >
                          Packing List
                        </Link>
                      {/* </a> */}
                      {/* <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Separated link</a> */}
                    </div>
                  </>
                )}
                {MenuItems.map((MenuItem) => (
                  <a className="nav_link active">
                    <Link to={MenuItem.path} className="invoice-item" onClick={() => {}}>
                      <i className={`bx nav_icon ${MenuItem.icon}`}></i>
                      <span className="nav_name">{MenuItem.title}</span>
                    </Link>
                  </a>
                ))}
              </div>
            </div>
            {/* <div onClick={logout}>
            <a  className="nav_link">
              <i className="bx bx-log-out nav_icon"></i>{" "}
              <span className="nav_name">SignOut</span>{" "}
            </a>
            </div> */}
          </nav>
        </div>
        <div className={`height-100  ${isOpen ? "" : "body-pd"} `}>
          <Outlet />
        </div>
      </div>

      {/* <Navbar />
      <div style={{ display: "flex", paddingTop: "82px" }}>
        <Sidebar />
        <Outlet />
      </div> */}
    </>
  );
};
export default UserLayout;
