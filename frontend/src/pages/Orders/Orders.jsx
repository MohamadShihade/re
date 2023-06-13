import React from "react";
import { useState } from "react";
import ProformaInvoiceOrders from "./ProformaInvoiceOrders/ProformaInvoiceOrders";
import SignedProformaInvoices from "./SignedProformaInvoices/SignedProformaInvoices";
import { Link } from "react-router-dom";
import "./Orders.css";
import PurchaseOrderOrders from "./PurchaseOrderOrders/PurchaseOrderOrders";
import PackingListOrders from "./PackingListOrders/PackingListOrders";

const Orders = () => {
  let pageContent = <ProformaInvoiceOrders />;
  const [page, setPage] = useState("orders");
  switch (page) {
    case "orders":
      pageContent = <ProformaInvoiceOrders />;
      break;
    case "confirmedOrders":
      pageContent = <SignedProformaInvoices />;
      break;
    case "PackingListOrders":
      pageContent = <PackingListOrders />;
      break;
    case "purchaseOrderOrders":
      pageContent = <PurchaseOrderOrders />;
      break;
    default:
      break;
  }
  return (
    <div>
      <div className="navigation_bar">
        <button className="btn_nav" onClick={() => setPage("orders")}>
          PI Orders
        </button>
        <button className="btn_nav" onClick={() => setPage("confirmedOrders")}>
          Confirmed Orders
        </button>
        <button className="btn_nav" onClick={() => setPage("purchaseOrderOrders")}>
          PurchaceOrder Orders
        </button>
        <button className="btn_nav" onClick={() => setPage("PackingListOrders")}>
          PKL Orders
        </button>
      </div>

      {pageContent}
    </div>
  );
};

export default Orders;
