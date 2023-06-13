import React from "react";
import LayoutWrapper from "../Layout/styles/LayoutWrapper";
import Header from "./Header";
import Menu from "./Menu";
function Layout(props) {
  return (
    <LayoutWrapper>
      <Menu />
      <div className='main'>
        <Header />
        <div className='content'>{props.children}</div>
        Layout
      </div>
    </LayoutWrapper>
  );
}

export default Layout;
