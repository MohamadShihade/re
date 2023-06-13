import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  AdminMenuItems,
  EmployeeMenuItems,
  FinancialMenuItems,
  SalesManagerMenuItems,
  LogisticsMenuItems,
  SyriaEmployeeMenuItems,
} from "../Navbar/MenuItems";

const Sidebar = () => {
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
  if (roles.includes("SyriaEmployee")) {
    MenuItems = SyriaEmployeeMenuItems;
  }

  return (
    <div className="side_bar">
      <div className="side_bar__items">
        {MenuItems.map((item, index) => {
          return (
            <div className="sidebar__item" key={index}>
              <NavLink
                className="side_bar__navlink"
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? "#9f1515" : "#00000078",
                })}
                onClick={() => {}}
              >
                {item.title}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
