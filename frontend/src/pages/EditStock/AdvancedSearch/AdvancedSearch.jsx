import React from "react";

import "./AdvancedSearch.css";
import Modal from "react-modal";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useEffect } from "react";

function AdvancedSearch({ closeModal, modalIsOpen, products, setFilteredProducts }) {
  // const [filteredProducts, setFilteredProducts] = useState(products);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {}, [startDate, endDate]);

  const applyDateRangeFilter = (products) => {
    if (startDate && endDate) {
      let filteredProducts = products.filter((item) =>
        item.bl.some((bl) => new Date(bl.date) >= new Date(startDate) && new Date(bl.date) <= new Date(endDate))
      );
      setFilteredProducts(filteredProducts);
    } else if (startDate) {
      let filteredProducts = products.filter((item) => item.bl.some((bl) => new Date(bl.date) >= new Date(startDate)));
      setFilteredProducts(filteredProducts);
      console.log(filteredProducts);
    } else if (endDate) {
      let filteredProducts = products.filter((item) => item.bl.some((bl) => new Date(bl.date) <= new Date(endDate)));
      setFilteredProducts(filteredProducts);
    }
    closeModal();
  };

  let subtitle;
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="new_Modal"
      overlayClassName="new_Overlay"
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {" "}
      <button class="btn-close close__button" onClick={closeModal}></button>
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Advanced Search</h2>
      <div className="date_filter">
        <div className="label_div">Date : </div>
        <div className="label_div">From : </div> <ReactDatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />{" "}
        <div className="label_div"> To : </div>
        <ReactDatePicker className="date_picker_style" showIcon selected={endDate} onChange={(date) => setEndDate(date)} />{" "}
      </div>
      <input type="text" className="new_task_text" placeholder="add new Project here"  autocomplete="on" onChange={(e) => console.log(e.target.value)}/>
      <div className="add_proj" onClick={() => applyDateRangeFilter(products)}>
        Show Results{" "}
      </div>
    </Modal>
  );
}

export default AdvancedSearch;
