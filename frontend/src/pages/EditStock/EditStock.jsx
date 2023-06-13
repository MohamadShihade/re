import React from "react";
import "./EditStock.css";
import { useEffect } from "react";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  updateProductMoveToAvailable,
  updateProductMoveToComing,
  updateProductStock,
  updateProductWarehouseBlBookedQty,
  updateProductWarehouseBlQty,
  updateStock,
} from "../../actions/products";
import SearchBox from "../MakePo/SearchBox";
import DropDownSelect from "../../Components/DropDownSelect/DropDownSelect";
import { useState } from "react";
import { formatDate, timeAgo } from "../../helpers/timeAgo";
import useAuth from "../../hooks/useAuth";
import { dummyStock } from "./dummyStock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { warehouses } from "../../data";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";

function StockInput(props) {
  const { username } = useAuth();
  const [stock, setStock] = useState(props.stock);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setStock(e.target.value);
  };
  const handleStockChange = () => {
    dispatch(updateProductStock(props.id, { property: props.property, value: stock, employee: username }));
  };

  return (
    <>
      <input type="text" className="" value={stock || 0} onChange={handleChange} autocomplete="on" onBlur={handleStockChange}></input>
    </>
  );
}

function NewBL({ id, property, productCode, brand, capacity }) {
  const dispatch = useDispatch();
  const [showNewBl, setShowNewBl] = useState(false);
  const [qty, setQty] = useState(0);
  const [warehouse, setWarehouse] = useState(property === "coming" ? "coming" : property === "production" ? "production" : "azal");
  const [blCode, setBlCode] = useState("");
  const [blDate, setBlDate] = useState(new Date());

  const [blStatus, setBlStatus] = useState("available");
  const [bookedQty, setBlBookedQty] = useState(0);

  const clear = () => {
    setWarehouse("");
    setBlBookedQty(0);
    setBlCode("");
    setBlDate(new Date());
    setQty(0);
  };

  const handleNewBl = () => {
    dispatch(
      updateStock(id, {
        code: blCode,
        qty: qty,
        date: blDate,
        warehouse: warehouse.toLocaleLowerCase().trim(),
        status: blStatus,
        booked: bookedQty,
        productBrand: brand,
        productCapacity: capacity,
        productCode: productCode,
      })
    );
    setShowNewBl(false);
    clear();
  };
  return (
    <>
      {showNewBl ? (
        <div div className="new_bl_div">
          <div
            className="close_btn"
            onClick={() => {
              setShowNewBl(false);
            }}
          >
            close
          </div>
          <div className="column_div_1">
            <div className="container_val_x">
              <div className="header_div">Qty</div>
              <div className="value_div">
                <input
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="bl_val_input bl_qty"
                  type="number"
                  autocomplete="on"
                  step="any"
                ></input>{" "}
              </div>
            </div>

            {property !== "production" && (
              <div className="container_val_x">
                <div className="header_div">{property !== "coming" ? "Warehouse" : "Coming"}</div>
                <div className="value_div">
                  {/* <input value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="bl_val_input" type="text"></input>*/}
                  <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="bl_val_input">
                    {property !== "coming" ? (
                      <>
                        {" "}
                        <option value="" selected disabled>
                          Choose Warhouse ....
                        </option>
                        {warehouses.map((warehouse, index) => (
                          <option key={index} value={warehouse}>
                            {warehouse}
                          </option>
                        ))}
                      </>
                    ) : (
                      <>
                        <option value="" disabled>
                          Choose Destination ....
                        </option>

                        <option selected value={"coming"}>
                          Coming
                        </option>
                      </>
                    )}
                  </select>{" "}
                </div>
              </div>
            )}
          </div>{" "}
          {property !== "production" && (
            <div className="column_div">
              <div className="header_div">BL/Code</div>
              <div className="value_div">
                <input
                  value={blCode}
                  onChange={(e) => setBlCode(e.target.value)}
                  autocomplete="on"
                  className="bl_val_input"
                  type="text"
                ></input>{" "}
              </div>
            </div>
          )}{" "}
          <div className="column_div">
            <div className="header_div">
              {property === "coming" ? "Expected arrival BL/Date" : property === "production" ? "Ex/Prod Finish Date" : "BL/Date"}
            </div>
            <div className="value_div">
              <DatePicker showIcon selected={blDate} onChange={(date) => setBlDate(date)} />{" "}
            </div>
          </div>
          <div className="new_bl_add_butt" onClick={handleNewBl}>
            {property === "coming" ? "Add to Coming" : property === "production" ? "Add to Production" : "Add to stock"}
          </div>
        </div>
      ) : (
        <div className="show_add_form_butt_container">
          <div
            className="show_add_form_butt"
            onClick={() => {
              setShowNewBl(true);
            }}
          >
            +
          </div>
        </div>
      )}
    </>
  );
}
function MoveToComingForm(props) {
  const [warehouse, setWarehouse] = useState("coming");
  const dispatch = useDispatch();
  const [blDate, setBlDate] = useState(new Date());
  const [blCode, setBlCode] = useState("");
  const [showMoveToStockForm, setShowMoveToStockForm] = useState(false);

  const handeleMoveProductionToComing = () => {
    dispatch(
      updateProductMoveToComing(props.id, {
        qty: props.qty,
        code: blCode,
        warehouse: warehouse.toLocaleLowerCase(),
        date: blDate,
      })
    );
    setShowMoveToStockForm(false);
  };
  return (
    <div className="container_move">
      <div
        className="move_to_stock"
        onClick={() => {
          setShowMoveToStockForm((prevShow) => !prevShow);
        }}
      >
        Move to coming
      </div>
      {showMoveToStockForm && (
        <>
          {" "}
          <div className="column_div">
            <div className="header_div">BL/Code</div>
            <div className="value_div">
              <input
                value={blCode}
                onChange={(e) => setBlCode(e.target.value)}
                autocomplete="on"
                className="bl_val_input"
                type="text"
              ></input>{" "}
            </div>
          </div>
          <div className="column_div">
            <div className="value_div">
              <DatePicker showIcon selected={blDate} onChange={(date) => setBlDate(date)} />{" "}
            </div>
          </div>
          <div className="new_bl_add_butt" onClick={handeleMoveProductionToComing}>
            Add to Production
          </div>
        </>
      )}
    </div>
  );
}

function MoveToAvailableForm(props) {
  const [warehouse, setWarehouse] = useState("");
  const dispatch = useDispatch();
  const [blDate, setBlDate] = useState(new Date());
  const [showMoveToStockForm, setShowMoveToStockForm] = useState(false);

  const handeleMoveComingToStock = () => {
    dispatch(
      updateProductMoveToAvailable(props.id, {
        code: props.bl.code,
        warehouse: warehouse.toLocaleLowerCase(),
        date: blDate,
      })
    );
    setShowMoveToStockForm(false);
  };
  return (
    <div className="container_move">
      <div
        className="move_to_stock"
        onClick={() => {
          setShowMoveToStockForm((prevShow) => !prevShow);
        }}
      >
        Move to stock
      </div>
      {showMoveToStockForm && (
        <>
          {" "}
          <div className="value_div">
            {/* <input value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="bl_val_input" type="text"></input>*/}
            <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="bl_val_input">
              <>
                {" "}
                <option value="" selected disabled>
                  Choose Warhouse ....
                </option>
                {warehouses.map((warehouse) => (
                  <option value={warehouse}>{warehouse}</option>
                ))}
              </>
            </select>{" "}
          </div>
          <div className="column_div">
            <div className="value_div">
              <DatePicker showIcon selected={blDate} onChange={(date) => setBlDate(date)} />{" "}
            </div>
          </div>
          <div className="new_bl_add_butt" onClick={handeleMoveComingToStock}>
            Add to stock
          </div>
        </>
      )}
    </div>
  );
}

function ProductWareHouseBlQty(props) {
  const [qty, setQty] = useState(props.property !== "booked" ? props.bl?.qty - props.bl?.booked : props.bl?.booked);

  useEffect(() => {
    setQty(props.property !== "booked" ? props.bl?.qty - props.bl?.booked : props.bl?.booked);
  }, [props.bl?.booked, props.bl?.qty, props.property]);
  const handleQtyChange = async () => {
    console.log(props.bl);
    await props.handleQtyChange({
      qty: qty,
      code: props.bl?.code,
      date: props.bl?.date,
      booked: props.bl?.booked,
      property: props.property,
    });
    //  setQty(props.property !== "booked" ? props.bl?.qty - props.bl?.booked : props.bl?.booked);
  };

  return (
    <div className="warehouse_bl_item">
      <div className="warehouse_bl_item_code">
        {props.warehouse === "production" ? "Under production" : props.bl?.code}
        <p className="bl_date">{formatDate(props.bl?.date)}</p>
      </div>
      <div className="warehouse_bl_item_qty">
        {" "}
        <input
          className="bl_qty"
          type="number"
          step="any"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          onBlur={handleQtyChange}
          disabled={
            (props.warehouse === "coming" && props?.td === "coming") || (props.warehouse === "production" && props?.td === "production")
          }
        />
        {props.warehouse === "coming" && props?.td === "coming" && (
          <MoveToAvailableForm id={props.id} bl={props.bl} warehouse={props.warehouse}></MoveToAvailableForm>
        )}
        {props.warehouse === "production" && props?.td === "production" && <MoveToComingForm id={props.id} qty={qty}></MoveToComingForm>}
      </div>
    </div>
  );
}

function ProductWareHouseBl(props) {
  const [warehouseQty, setWarehouseQty] = useState(0);
  const [warehouseBookedQty, setWarehouseBookedQty] = useState(0);
  const [showBls, setShowBls] = useState(false);
  useEffect(() => {
    let WHBookedQty = 0;
    let WHQty = 0;
    props.item.bl.map((i) => {
      WHQty += parseInt(i.qty);
      WHBookedQty += parseInt(i.booked);
    });
    setWarehouseQty(parseInt(WHQty));
    setWarehouseBookedQty(WHBookedQty);
  }, [props.item.bl]);

  const handleQtyChange = (value) => {
    console.log(props.item);
    console.log({ ...value, warehouse: props.item?.warehouse });
    props.handleWarhouseBlQtyChange({ ...value, warehouse: props.item?.warehouse });
  };
  return (
    <div className="warehouse_item">
      <div
        className="warehouse_name"
        onClick={() => {
          setShowBls((prev) => !prev);
        }}
      >
        {" "}
        {props.item?.warehouse} ({props.property === "booked" ? warehouseBookedQty : warehouseQty - warehouseBookedQty})
      </div>
      {showBls && (
        <>
          {props.item?.bl?.map((bl, index) => {
            return (
              <ProductWareHouseBlQty
                id={props.id}
                warehouse={props.item?.warehouse}
                property={props.property}
                td={props.td}
                key={index}
                bl={bl}
                handleQtyChange={handleQtyChange}
              ></ProductWareHouseBlQty>
            );
          })}
        </>
      )}
    </div>
  );
}

function ProductRow(props) {
  const [totalStock, setTotalStock] = useState(0);
  const [totalAvailableBooked, setTotalAvailableBooked] = useState(0);
  const [totalComing, setTotalComing] = useState(0);
  const [totalUnderProduction, setTotalUnderProduction] = useState(0);

  const [totalComingBooked, setTotalComingBooked] = useState(0);
  const [available, setAvailable] = useState([]);
  const [coming, setComing] = useState([]);
  const [production, setProduction] = useState([]);

  const [showStockDetails, setShowStockDetails] = useState(false);
  const [showBooked, setShowBooked] = useState(false);
  const [showComing, setShowComing] = useState(false);
  const [showUnderProd, setShowUnderProd] = useState(false);

  const selectedOptions = props.selectedOptions;

  useEffect(() => {
    let warehouses = [];

    let warehousesNames = [];
    props?.item?.bl.map((item) => {
      if (warehousesNames.indexOf(item.warehouse) === -1) warehousesNames.push(item.warehouse);
    });
    warehousesNames.map((warehouse) => {
      warehouses.push({ warehouse: warehouse, bl: [] });
    });

    warehouses.map((xitem) => {
      props?.item?.bl.map((item) => {
        if (item.warehouse === xitem.warehouse) {
          //  console.log("k");
          xitem.bl.push({ code: item.code, qty: item.qty, date: item.date, status: item.status, booked: item.booked });
        }
      });
    });

    setAvailable(warehouses.filter((item) => item.warehouse !== "coming" && item.warehouse !== "production"));
    setComing(warehouses.filter((item) => item.warehouse === "coming"));
    setProduction(warehouses.filter((item) => item.warehouse === "production"));
  }, [props?.item?.bl]);

  const handleTotalStockClick = () => {
    console.log(available);
    console.log(coming);
    setShowStockDetails((prevShow) => !prevShow);
  };
  const handleTotalBookedClick = () => {
    setShowBooked((prevShow) => !prevShow);
  };
  const handleTotalComingClick = () => {
    setShowComing((prevShow) => !prevShow);
  };
  const handleTotalUnderProdClick = () => {
    setShowUnderProd((prevShow) => !prevShow);
  };
  const dispatch = useDispatch();
  const handleProductWarhouseBlQtyChange = (value) => {
    console.log({ ...value, id: props.item._id });
    if (value.property !== "booked") {
      dispatch(updateProductWarehouseBlQty(props.item._id, value));
    } else {
      dispatch(updateProductWarehouseBlBookedQty(props.item._id, value));
    }
  };

  useEffect(() => {
    let totalStock = 0;
    let totalAvailableBooked = 0;
    let totalComing = 0;
    let totalComingBooked = 0;
    let totalUnderProduction = 0;
    available.map((item) => {
      item?.bl?.map((bl) => {
        totalStock += parseInt(bl.qty);
        totalAvailableBooked += parseInt(bl.booked);
      });
    });
    coming.map((item) => {
      item?.bl.map((bl) => {
        totalComing += parseInt(bl.qty);
        totalComingBooked += parseInt(bl.booked);
      });
    });
    production.map((item) => {
      item?.bl.map((bl) => {
        totalUnderProduction += parseInt(bl.qty);
      });
    });

    setTotalStock(totalStock);
    setTotalAvailableBooked(totalAvailableBooked);
    setTotalComing(totalComing);
    setTotalComingBooked(totalComingBooked);
    setTotalUnderProduction(totalUnderProduction);
  }, [available, coming, production, props.item.stockAll]);

  return (
    <tr className={props.index % 2 === 0 ? `tr_border` : `tr_border tr_dark`}>
      {selectedOptions.includes("image") && (
        <td scope="row">
          {" "}
          <div
            style={{
              fontWeight: "bold",
              paddingBottom: 0,
            }}
            className="td_padding"
          >
            <img className="product_image_td " src={props.item?.image[0]} alt="imager" />
          </div>
        </td>
      )}

      {selectedOptions.includes("brand") && (
        <td className="td_small">
          <div className="td_padding small_td">{props.item?.brand}</div>
        </td>
      )}
      {selectedOptions.includes("code") && (
        <td>
          <div className="td_padding customer_cell small_td">{props.item?.code}</div>
        </td>
      )}
      {selectedOptions.includes("total") && (
        <td>
          <div className="td_padding small_td_capacity">{totalStock}</div>
        </td>
      )}
      {/* ------------------------------- td Availabe ------------------------------ */}
      {selectedOptions.includes("available") && (
        <td>
          <div className={"td_padding availble_width"}>
            <>
              <div className="total_stock_div available_color" onClick={handleTotalStockClick}>
                {totalStock - totalAvailableBooked}
              </div>
              {/*            <StockInput updateKey={props.updateKey} property={"stock"} id={props.item._id} stock={props.item?.stock}></StockInput>
               */}{" "}
              <NewBL
                id={props.item._id}
                property="available"
                productCode={props.item.code}
                brand={props.item.brand}
                capacity={props.item.capacity}
              ></NewBL>
              {showStockDetails && (
                <div className="warehouses">
                  {available &&
                    available.map((item, index) => {
                      return (
                        <ProductWareHouseBl
                          key={index}
                          item={item}
                          handleWarhouseBlQtyChange={handleProductWarhouseBlQtyChange}
                        ></ProductWareHouseBl>
                      );
                    })}
                </div>
              )}
            </>
          </div>
        </td>
      )}

      {/* -------------------------------- coming td ------------------------------- */}
      {selectedOptions.includes("coming") && (
        <td>
          <div className={"td_padding coming_width"}>
            <>
              <div className="total_stock_div coming_color" onClick={handleTotalComingClick}>
                {totalComing - totalComingBooked}
              </div>
              {/*            <StockInput updateKey={props.updateKey} property={"stock"} id={props.item._id} stock={props.item?.stock}></StockInput>
               */}{" "}
              <NewBL
                id={props.item._id}
                property="coming"
                productCode={props.item.code}
                brand={props.item.brand}
                capacity={props.item.capacity}
              ></NewBL>
              {showComing && (
                <div className="warehouses">
                  {coming &&
                    coming.map((item, index) => {
                      return (
                        <ProductWareHouseBl
                          td={"coming"}
                          id={props.item._id}
                          key={index}
                          item={item}
                          handleWarhouseBlQtyChange={handleProductWarhouseBlQtyChange}
                        ></ProductWareHouseBl>
                      );
                    })}
                </div>
              )}
            </>
          </div>
        </td>
      )}
      {/* -------------------------------- coming td end ------------------------------- */}

      {/*....................................................Booked TD..................................................................  */}
      {selectedOptions.includes("booked") && (
        <td>
          <div className="td_padding booked_width">
            <>
              <div className="total_stock_div booked_color" onClick={handleTotalBookedClick}>
                <b className="available_color">{totalAvailableBooked} </b>| <b className="coming_color">{totalComingBooked}</b>
              </div>
              {/*            <StockInput updateKey={props.updateKey} property={"stock"} id={props.item._id} stock={props.item?.stock}></StockInput>
               */}{" "}
              {showBooked && (
                <div className="warehouses">
                  {available &&
                    available.map((item, index) => {
                      return (
                        <ProductWareHouseBl
                          property={"booked"}
                          key={index}
                          item={item}
                          handleWarhouseBlQtyChange={handleProductWarhouseBlQtyChange}
                        ></ProductWareHouseBl>
                      );
                    })}
                  {coming &&
                    coming.map((item, index) => {
                      return (
                        <ProductWareHouseBl
                          property={"booked"}
                          key={index}
                          item={item}
                          handleWarhouseBlQtyChange={handleProductWarhouseBlQtyChange}
                        ></ProductWareHouseBl>
                      );
                    })}
                </div>
              )}
            </>
          </div>
        </td>
      )}
      {/*.................................................................................................................................  */}
      {/* -------------------------------- Under Production td ------------------------------- */}
      {selectedOptions.includes("production") && (
        <td>
          <div className={"td_padding coming_width"}>
            <>
              <div className="total_stock_div coming_color" onClick={handleTotalUnderProdClick}>
                {totalUnderProduction}
              </div>
              {/*            <StockInput updateKey={props.updateKey} property={"stock"} id={props.item._id} stock={props.item?.stock}></StockInput>
               */}{" "}
              <NewBL
                id={props.item._id}
                property="production"
                productCode={props.item.code}
                brand={props.item.brand}
                capacity={props.item.capacity}
              ></NewBL>
              {showUnderProd && (
                <div className="warehouses">
                  {production &&
                    production.map((item, index) => {
                      return (
                        <ProductWareHouseBl
                          td={"production"}
                          id={props.item._id}
                          key={index}
                          item={item}
                          handleWarhouseBlQtyChange={handleProductWarhouseBlQtyChange}
                        ></ProductWareHouseBl>
                      );
                    })}
                </div>
              )}
            </>
          </div>
        </td>
      )}
      {/* -------------------------------- Under Production td end ------------------------------- */}
      {selectedOptions.includes("update") && (
        <td className={""}>
          {" "}
          <div className="td_padding small_td">
            {timeAgo(new Date(props.item.updatedAt))} ({props.item?.lastUpdateBy}){" "}
          </div>
        </td>
      )}
    </tr>
  );
}

const EditStock = () => {
  const today = new Date();
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("brand");
  const [dateFilter, setDateFilter] = useState(today);
  const [updateKey, setupdateKey] = useState(0);
  const [showBookedColumn, setShowBookedColumn] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());

    // const interval = setInterval(() => dispatch(getProducts()), 30 * 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [dispatch]);

  let products = useSelector((state) => state.products.products);

  /* ------------------------------- searchQuery ------------------------------ */

  const handleSearchQueryChange = (e) => {
    setupdateKey(Math.random());
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (filter.length > 0 && searchQuery.length > 0) {
    if (filter === "bl-code") {
      products = products.filter((item) => item.bl.some((bl) => bl.code.includes(searchQuery.toLowerCase())));
      console.log(products);
    } else if (filter === "warehouse") {
      products = products.filter((item) => item.bl.some((bl) => bl.warehouse.includes(searchQuery.toLowerCase())));
    } else {
      products = products.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
    }
  }

  const options = [
    { name: "Brand", value: "brand" },
    { name: "Country", value: "country" },
    { name: "Product Code", value: "code" },
    { name: "Capacity", value: "capacity" },
    { name: "Categoty", value: "category" },
    { name: "BL/Code", value: "bl-code" },
    { name: "Warehouse", value: "warehouse" },
  ];

  /* -------------------------------------------------------------------------- */

  const cols = ["image", "brand", "code", "total", "available", "coming", "booked", "production", "update"];
  const [selectedOptions, setSelectedOptions] = useState(cols);
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  /* ---------------------------------- Modal --------------------------------- */

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  /* -------------------------------- End Modal ------------------------------- */
  let subtitle;

  const handleSetFilteredProducts = (prods) => {
    setShowFiltered(true);
    setFilteredProducts(prods);
    console.log(prods);
  };

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <div className="search_container">
        <SearchBox onChange={handleSearchQueryChange}></SearchBox>
        <DropDownSelect onChange={handleFilterChange} options={options} />
        <div onClick={() => openModal()}>Advanced Search</div>
        <AdvancedSearch
          products={products}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setFilteredProducts={handleSetFilteredProducts}
        />
        <div className="choose_cols">
          {cols.map((colName) => (
            <label>
              <input type="checkbox" value={colName} checked={selectedOptions.includes(colName)} onChange={handleCheckboxChange} />
              {colName}
            </label>
          ))}
        </div>
      </div>
      <table className="pi__table table table-bordered">
        <thead className="th_style">
          <tr>
            {selectedOptions.includes("image") && (
              <th className="th_medium th_fixed" scope="col">
                <div className="th_cell_div">Image</div>
              </th>
            )}

            {selectedOptions.includes("brand") && (
              <th className="th_small th_fixed" scope="col">
                <div className="th_cell_div">Brand</div>
              </th>
            )}
            {selectedOptions.includes("code") && (
              <th className="th_small th_fixed" scope="col">
                <div className="th_cell_div">Code</div>
              </th>
            )}

            {selectedOptions.includes("total") && (
              <th className="th_small th_fixed" scope="col">
                <div className="th_cell_div">Total</div>
              </th>
            )}
            {selectedOptions.includes("available") && (
              <th className="th_large th_fixed " scope="col">
                <div className="th_cell_div">Available</div>
              </th>
            )}

            {selectedOptions.includes("coming") && (
              <th className="th_large th_fixed" style={{ width: "175px" }} scope="col">
                <div className="th_cell_div"> Coming</div>
              </th>
            )}
            {selectedOptions.includes("booked") && (
              <th className="th_large th_fixed" scope="col">
                <div className="th_cell_div">Booked</div>
              </th>
            )}
            {selectedOptions.includes("production") && (
              <th className="th_large th_fixed" style={{ width: "175px" }} scope="col">
                <div className="th_cell_div"> Under Production</div>
              </th>
            )}
            {selectedOptions.includes("update") && (
              <th className="th_small th_fixed" scope="col">
                <div className="th_cell_div"> Last Upadte(by)</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {!showFiltered
            ? products.map((item, index) => (
                <ProductRow selectedOptions={selectedOptions} key={index} updateKey={updateKey} item={item} index={index}></ProductRow>
              ))
            : filteredProducts.map((item, index) => (
                <ProductRow selectedOptions={selectedOptions} key={index} updateKey={updateKey} item={item} index={index}></ProductRow>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditStock;
