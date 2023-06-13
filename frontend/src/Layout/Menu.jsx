import React from "react";
import menus from "../menus";
function Menu() {
  return (
    <div>
      {menus.map((item) => (
        <ul>
          <li>{item.label}</li>
        </ul>
      ))}
    </div>
  );
}

export default Menu;
