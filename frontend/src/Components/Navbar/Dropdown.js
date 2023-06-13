import React, { useState } from "react";
import { EmployeeMenuItems, AdminMenuItems, SalesManagerMenuItems, FinancialMenuItems } from "./MenuItems";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../store/cartSlice";
import { clearFilters } from "../../store/filtersSlice";

function OptionsDropdown() {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const { isAdmin, roles } = useAuth();

  const handleClick = () => setClick(!click);
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
  return (
    <>
      <ul onClick={handleClick} className={click ? "dropdown-menu clicked" : "dropdown-menu"} style={{ display: "flow-root" }}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => {
                  setClick(false);
                  dispatch(emptyCart());
                  dispatch(clearFilters());
                }}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default OptionsDropdown;
