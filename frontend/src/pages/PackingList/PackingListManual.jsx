import React, { useState } from "react";
import "./PackingList.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { BASE_URL } from "../../api/index.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../../helpers/toaster";
const PackingListManual = () => {
  const navigate = useNavigate();

  const { username } = useAuth();
  console.log(username);
  const [pklInfo, setPklInfo] = useState(null);
  const [piNumber, setPiNumber] = useState();
  const [customer, setCustomer] = useState("");
  const [buyer, setBuyer] = useState("");
  const [showFake, setShowFake] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState(new Date());
  const [decreaseRate, setDecreaseRate] = useState(1);

  const initialTruckItemsState = Array.from({ length: pklInfo?.totalTrucks }, () => ({
    truckNo: "",
    truckDriverName: "",
    truckDriverTel: "",
    truckNetWeight: 0,
    truckGrossWeight: 0,
    /* -------------------------------------------------------------------------- */
    truckGrossWeightFake: 0,
    truckNetWeightFake: 0,

    /* -------------------------------------------------------------------------- */
    truckTotalPackages: 0,
    truckTotalAmount: 0,
    truckTotalPallets: 0,
    truckProductItems: [],
    truckBls: "",
  }));

  const [truckItems, setTruckItems] = useState(initialTruckItemsState);
  const handleTruckInputChange = (event, truckIndex, field) => {
    const updatedTruckItems = [...truckItems];
    updatedTruckItems[truckIndex] = {
      ...updatedTruckItems[truckIndex],
      [field]: event.target.value,
    };
    setTruckItems(updatedTruckItems);
  };

  const handleSearchPi = async () => {
    // Send the POST request
    await axios
      .get(`${BASE_URL}/packinglist/infomanual/${piNumber}`)
      .then(async (response) => {
        // Handle the response data
        setPklInfo(response.data);
        console.log(response.data);
        /* -------------------------------------------------------------------------- */
        let truckLoad = 26000;
        let possibleTruckOverWeight = 1000;
        let truckLoadwithOverWeigh = truckLoad + possibleTruckOverWeight;
        let pklTotalGrossWeight = response.data.pklTotalGrossWeight;
        let numberOfTrucks = Math.ceil(pklTotalGrossWeight / truckLoadwithOverWeigh);
        let overWeight = pklTotalGrossWeight - numberOfTrucks * truckLoad;
        let decreaseRate1 = (numberOfTrucks * truckLoad) / pklTotalGrossWeight;
        setDecreaseRate(decreaseRate1);
        console.log(decreaseRate, "|", numberOfTrucks, "|", pklTotalGrossWeight);
        console.log(pklInfo);
        let totalW = 0;
        response.data.pklProducts.map((product) => {
          totalW += product.grossWeight * product.qty * 0.980984;
        });
        /* -------------------------------------------------------------------------- */
        let initialTruckProductItems = [];
        response.data.pklProducts.map((product) => {
          initialTruckProductItems.push({
            productId: product.productId,
            productCode: product.productCode,
            productCategory: product.productCategory,
            productBrand: product.productBrand,
            productCountry: product.productCountry,
            productCapacity: product.productCapacity,
            productDescription: product.description,
            productGrossWeight: product.grossWeight,
            /* -------------------------------------------------------------------------- */
            productGrossWeightFake: product.grossWeight * decreaseRate,
            productTotalGrossWeightFake: 0,
            productNetWeightFake: product.netWeight * decreaseRate,
            productTotalNetWeightFake: 0,
            /* -------------------------------------------------------------------------- */
            productNetWeight: product.netWeight,
            productPrice: product.price,
            productQty: 0,
            productPalletQty: 0,
            productTotalNetWeight: 0,
            productTotalGrossWeight: 0,
            productTotalAmount: 0,
            productBl: [],
            productWarehouses: [],
          });
        });

        setTruckItems(
          Array.from({ length: response.data.totalTrucks }, () => ({
            truckNo: "",
            truckDriverName: "",
            truckDriverTel: "",
            truckNetWeight: 0,
            truckGrossWeight: 0,
            /* -------------------------------------------------------------------------- */
            truckGrossWeightFake: 0,
            truckNetWeightFake: 0,
            /* -------------------------------------------------------------------------- */
            truckTotalPackages: 0,
            truckTotalAmount: 0,
            truckTotalPallets: 0,
            truckBls: "",

            truckProductItems: initialTruckProductItems,
          }))
        );

        // You can access the response status, headers, etc. using response.status, response.headers, etc.
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  };

  const handleNextClick = async () => {
    const pkl = {
      employee: username,
      date: new Date(Date.now()),
      exporter: pklInfo.exporter,
      piNo: pklInfo.piNo,
      piId: pklInfo.piId,
      piCurrency: pklInfo.piCurrency,
      invoiceNo: invoiceNo,
      customer: customer,
      buyerAddress: buyer,
      truckItems,
    };
    console.log(pkl);
    await axios
      .post(`${BASE_URL}/packinglist`, pkl)
      .then((response) => {
        console.log(response.data);
        showToastMessage("PKL Added Succesfully", "success");

        setTimeout(() => {
          navigate("/user/orders");
        }, 2000);
      })
      .catch((error) => {
        showToastMessage("Please fill all required fields");
        console.log(error.response.data);
      });
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleSearchPi();
      return;
    }
  };

  useEffect(() => {
    const updateTruckItems = () => {
      let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
      console.log(updatedTruckItems);
      updatedTruckItems.map((truckItem) => {
        truckItem.truckGrossWeightFake = truckItem.truckGrossWeight * decreaseRate;
        truckItem.truckNetWeightFake = truckItem.truckNetWeight * decreaseRate;

        truckItem.truckProductItems.map((item) => {
          item.productGrossWeightFake = item.productGrossWeight * decreaseRate;
          item.productTotalGrossWeightFake = item.productTotalGrossWeight * decreaseRate;
          item.productNetWeightFake = item.productNetWeight * decreaseRate;
          item.productTotalNetWeightFake = item.productTotalNetWeight * decreaseRate;
        });
      });
      console.log(updatedTruckItems);
      setTruckItems(updatedTruckItems);
    };
    updateTruckItems();
  }, [decreaseRate]);

  const getTruckProductWarehouseItemQty = (productId, truckIndex, warehouse) => {
    const productIndex = truckItems[truckIndex].truckProductItems.findIndex((obj) => obj.productId === productId);
    if (productIndex !== -1) {
      const warehouseIndex = truckItems[truckIndex].truckProductItems[productIndex].productWarehouses.findIndex(
        (obj) => obj.warehouse === warehouse
      );
      if (warehouseIndex !== -1) {
        return truckItems[truckIndex]?.truckProductItems[productIndex]?.productWarehouses[warehouseIndex]?.qty;
      } else {
        return 0;
      }
    } else {
      return null;
    }
  };

  const getTotalProductQtyInWarehouse = (productId, warehouse) => {
    let totalQty = 0;

    for (const truck of truckItems) {
      const productIndex = truck.truckProductItems.findIndex((obj) => obj.productId === productId);

      if (productIndex !== -1) {
        const warehouseIndex = truck.truckProductItems[productIndex].productWarehouses.findIndex((obj) => obj.warehouse === warehouse);

        if (warehouseIndex !== -1) {
          totalQty += parseInt(truck.truckProductItems[productIndex].productWarehouses[warehouseIndex].qty);
        }
      }
    }
    return totalQty;
  };

  const setTruckProductWarehouseItemQty = (productId, truckIndex, warehouse, qtyVal) => {
    const productIndex = truckItems[truckIndex].truckProductItems.findIndex((obj) => obj.productId === productId);
    if (productIndex !== -1) {
      let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
      //updatedTruckItems[truckIndex].truckProductItems[productIndex].productQty = qtyVal;
      const warehouseIndex = updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses.findIndex(
        (obj) => obj.warehouse === warehouse
      );
      if (warehouseIndex === -1) {
        updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses.push({ warehouse: warehouse, qty: qtyVal });
      } else {
        updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses[warehouseIndex].qty = parseInt(qtyVal);
      }

      updatedTruckItems[truckIndex].truckProductItems.map((truckProductItem) => {
        let productQty = 0;
        let productTotalAmount = 0;
        let productPalletQty = 0;
        let productTotalGrossWeight = 0;
        let productTotalNetWeight = 0;

        truckProductItem.productWarehouses.map((productWarehouse) => {
          productQty += parseInt(productWarehouse.qty);
        });
        truckProductItem.productQty = productQty;
        truckProductItem.productTotalAmount = productQty * truckProductItem.productPrice;
        truckProductItem.productTotalNetWeight = productQty * truckProductItem.productNetWeight;
        truckProductItem.productTotalGrossWeight = productQty * truckProductItem.productGrossWeight;
        /* -------------------------------------------------------------------------- */
        truckProductItem.productTotalGrossWeightFake = productQty * truckProductItem.productGrossWeightFake;
        truckProductItem.productTotalNetWeightFake = productQty * truckProductItem.productNetWeightFake;

        /* -------------------------------------------------------------------------- */
        truckProductItem.productPalletQty = 0;
      });

      updatedTruckItems.map((truck) => {
        let truckGrossWeight = 0;
        /* -------------------------------------------------------------------------- */
        let truckGrossWeightFake = 0;
        let truckNetWeightFake = 0;

        /* -------------------------------------------------------------------------- */
        let truckNetWeight = 0;
        let truckTotalPackages = 0;
        let truckTotalAmount = 0;
        let truckTotalPallets = 0;

        truck.truckProductItems.map((truckProductItem) => {
          truckGrossWeight += truckProductItem.productTotalGrossWeight;
          /* -------------------------------------------------------------------------- */
          truckGrossWeightFake += truckProductItem.productTotalGrossWeightFake;
          truckNetWeightFake += truckProductItem.productTotalNetWeightFake;

          /* -------------------------------------------------------------------------- */
          truckNetWeight += truckProductItem.productTotalNetWeight;
          truckTotalPackages += truckProductItem.productQty;
          truckTotalAmount += truckProductItem.productTotalAmount;
          truckTotalPallets += truckProductItem.productPalletQty;
        });
        /* -------------------------------------------------------------------------- */
        truck.truckGrossWeightFake = truckGrossWeightFake;
        truck.truckNetWeightFake = truckNetWeightFake;

        /* -------------------------------------------------------------------------- */

        truck.truckGrossWeight = truckGrossWeight;
        truck.truckNetWeight = truckNetWeight;
        truck.truckTotalPackages = truckTotalPackages;
        truck.truckTotalAmount = truckTotalAmount;
        truck.truckTotalPallets = truckTotalPallets;
      });

      setTruckItems(updatedTruckItems);
    } else {
      return null;
    }
  };

  const handleTruckItemBlsChange = (truckIndex, val) => {
    let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
    updatedTruckItems[truckIndex].va = val;
  };

  const handleAddTruck = () => {
    let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
    let initialTruckProductItems = [];
    pklInfo.pklProducts.map((product) => {
      initialTruckProductItems.push({
        productId: product.productId,
        productCode: product.productCode,
        productCategory: product.productCategory,
        productBrand: product.productBrand,
        productCountry: product.productCountry,
        productCapacity: product.productCapacity,
        productDescription: product.description,
        productGrossWeight: product.grossWeight,
        /* -------------------------------------------------------------------------- */
        productGrossWeightFake: product.grossWeightFake,
        productTotalGrossWeightFake: 0,
        productNetWeightFake: product.netWeightFake,
        productTotalNetWeightFake: 0,
        /* -------------------------------------------------------------------------- */
        productNetWeight: product.netWeight,
        productPrice: product.price,
        productQty: 0,
        productPalletQty: 0,
        productTotalNetWeight: 0,
        productTotalGrossWeight: 0,
        productTotalAmount: 0,
        productBl: [],
        productWarehouses: [],
      });
    });
    updatedTruckItems.push({
      truckNo: "",
      truckDriverName: "",
      truckDriverTel: "",
      truckNetWeight: 0,
      truckGrossWeight: 0,
      /* -------------------------------------------------------------------------- */
      truckGrossWeightFake: 0,
      truckNetWeightFake: 0,

      /* -------------------------------------------------------------------------- */
      truckTotalPackages: 0,
      truckTotalAmount: 0,
      truckTotalPallets: 0,
      truckProductItems: initialTruckProductItems,
    });
    setTruckItems(updatedTruckItems);
  };

  const handleRemoveTruck = () => {
    let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
    updatedTruckItems.pop();
    setTruckItems(updatedTruckItems);
  };
  return (
    <>
      <ToastContainer />
      {console.log(truckItems)}
      <div className="card-custom ">
        <div className="card-custom-tittle justify-content-center">
          <h6>Packing List</h6>
        </div>
        <div className="card-custom-body">
          {/* <div className="pkl_container"> */}
          <div className="search_section">
            <div className="from-group">
              {/* <label htmlFor="piNumber">Enter PI Number :</label> */}
              <input
                id="piNumber"
                type="text"
                value={piNumber}
                placeholder="Enter PI Number"
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setPiNumber(e.target.value);
                }}
                autocomplete="on"
              ></input>
            </div>
            <button type="button" className="ags-btn-main" onClick={handleSearchPi}>
              {" "}
              Search{" "}
            </button>
          </div>
          {pklInfo && (
            <>
              {/* inforamtion PI */}
              <div className="table-infroamtion">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>PI Number: </strong> {pklInfo.piNo}{" "}
                      </td>
                      <td>
                        <strong>PI Custmer: </strong> {pklInfo.piCustomer}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <strong>PI Date: </strong> {new Date(pklInfo?.piDate)?.toLocaleDateString()}
                      </td>
                      <td>
                        <strong>Issued by: </strong> {pklInfo.piEmployee}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total Amount: </strong> {pklInfo.pklTotalAmount}
                      </td>
                      <td>
                        {" "}
                        <strong>Total GW: </strong>
                        {pklInfo.pklTotalGrossWeight}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total NW: </strong> {pklInfo.pklTotalNetWeight}
                      </td>
                      <td>
                        <strong>Total Packages: </strong> {pklInfo.pklTotalPackages}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Truck Payload: </strong> {pklInfo.truckPayload}
                      </td>
                      <td>
                        <strong>Total Trucks: </strong> {pklInfo.totalTrucks}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Inputs PI Info */}

              {/* <div className="pkl_info">
            <div className="info_row">
              <div className="label_div">PI Number : </div>
              <div className="val_div">{pklInfo.piNo}</div>
            </div>
            <div className="info_row">
              <div className="label_div">PI Custmer : </div>
              <div className="val_div">{pklInfo.piCustomer}</div>
            </div>
            <div className="info_row">
              <div className="label_div">PI Date : </div>
              <div className="val_div">{new Date(pklInfo?.piDate)?.toLocaleDateString()}</div>
            </div>
            <div className="info_row">
              <div className="label_div">Issued by : </div>
              <div className="val_div">{pklInfo.piEmployee}</div>
            </div>
          </div> */}
              {/* <div style={{ display: "flex" }}>
                <div className="info_row">
                  <div className="label_div">Total Amount : </div>
                  <div className="val_div">{pklInfo.pklTotalAmount}</div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">Total GW : </div>
                  <div className="val_div">{pklInfo.pklTotalGrossWeight}</div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">TOTAL NW : </div>
                  <div className="val_div">{pklInfo.pklTotalNetWeight}</div>
                </div>
                <div className="info_row">
                  <div className="label_div">TOTAL Packages : </div>
                  <div className="val_div"> {pklInfo.pklTotalPackages}</div>
                </div>
          </div> */}

              {/* start  Inputs Inofrmation  */}
              <div className="row inputs-pkl">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="customer">
                      Customer <span className="required">*</span>
                    </label>
                    <textarea type="text" rows="2" value={customer} className="form-control" onChange={(e) => setCustomer(e.target.value)}>
                      {" "}
                    </textarea>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="customer">
                      Buyer Address <span className="required">*</span>
                    </label>
                    <textarea type="text" rows="2" className="form-control" value={buyer} onChange={(e) => setBuyer(e.target.value)}>
                      {" "}
                    </textarea>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="customer">
                      Invoice No <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      value={invoiceNo}
                      onChange={(e) => {
                        setInvoiceNo(e.target.value);
                      }}
                      autocomplete="on"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="customer">PKL Date </label>
                    <input type="text" value={date.toLocaleDateString()} disabled onChange={() => {}} autocomplete="on"></input>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <button className="ags-btn-main-fill btn-fake" onClick={() => setShowFake((prev) => !prev)}>
                      <span>{!showFake ? "Show" : "Hide"}</span> Fake
                    </button>
                  </div>
                </div>
                {showFake && (
                  <div className="col-12">
                    <div className="form-group mb-2">
                      <label htmlFor="customer">Decrease Rate </label>
                      <input
                        type="number"
                        className="form-control"
                        value={decreaseRate}
                        onChange={(e) => {
                          setDecreaseRate(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                )}
                {/* <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="customer">Warhouse / BL </label>
                    <div>
                      {pklInfo.allBooked.map((product) => (
                        <>
                          <div>
                            <div>{product.product}</div>
                            <div>
                              {product.bookedWarehouses.map((warehouse) => (
                                <div>
                                  <div>{warehouse.warehouse}</div>
                                  <div>
                                    {warehouse.bl.map((item) => (
                                      <div>
                                        BL :{item.bl} / QTY : {item.qty}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div> */}
                <div className="col-12 wharehouse">
                  <div className="wh-info">
                    {pklInfo.allBooked.map((product) => (
                      <div className="wh-item">
                        <details>
                          <summary>{product.product}</summary>
                          <ul>
                            {product.bookedWarehouses.map((warehouse) => (
                              <li>
                                <details>
                                  <summary>{warehouse.warehouse}</summary>
                                  <ul>
                                    {warehouse.bl.map((item) => (
                                      <li>
                                        <div className="grid-bl">
                                          <span>BL :{item.bl} </span>
                                          <span>QTY : {item.qty}</span>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </details>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* End Inputs Information */}

              <div>
                {/* <div style={{ display: "flex" }}>
              {" "}
              <div className="info_row">
                <div className="label_div">Customer : </div>
                <div className="">
                  <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)}></input>
                </div>
              </div>
              <div className="info_row">
                <div className="label_div">Buyer Address : </div>
                <div className="">
                  <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)}></input>
                </div>
              </div>{" "}
              <div className="info_row">
                <div className="label_div">Invoice No : </div>
                <div className="">
                  <input
                    type="text"
                    value={invoiceNo}
                    onChange={(e) => {
                      setInvoiceNo(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div> */}
                {/* <div className="info_row">
              <div className="label_div">PKL Date : </div>
              <div className="">
                <input type="text" value={date.toLocaleDateString()} disabled onChange={() => {}}></input>
              </div>
            </div>
            <div>
              <div className="info_row">
                <div className="label_div">Warehouses : </div>
                <div className="val_div">{pklInfo.pklWarehouses?.join(" | ")}</div>
              </div>
              <div className="info_row">
                <div className="label_div">BL : </div>
                <div className="val_div">{pklInfo.pklBls?.join(" | ")}</div>
              </div>{" "}
            </div> */}
              </div>
              {/* <div className="info_row">
            <div className="label_div">Truck Payload : </div>
            <div className="val_div">{pklInfo.truckPayload}</div>
          </div>
          <div className="info_row">
            <div className="label_div">Total Trucks: </div>
            <div className="val_div">{pklInfo.totalTrucks}</div>
          </div> */}

              {/* New design trucks  */}
              <div className="trucks-list">
                <div className="trucks-tittle">
                  <h6>
                    <i class="uil uil-truck"></i>
                    {/* <i className="bx  bx bxs-truck nav_logo-icon"></i> */}
                    Trucks
                  </h6>
                  <span>
                    {" "}
                    {truckItems.length > 1 && <i onClick={handleRemoveTruck} class="uil uil-minus-circle add_truck_but"></i>}
                    <i onClick={handleAddTruck} class="uil uil-plus-circle"></i>
                  </span>
                </div>
                <div className="trucks-body">
                  <div className="truck-item">
                    <div className="truck-item-body">
                      <div className="row">
                        {Array.from({ length: truckItems.length }, (truck, index) => (
                          <div className="col-lg-4 col-sm-12">
                            <div className="item" key={index}>
                              <div className="item-tittle">
                                <span>
                                  {" "}
                                  <i class="uil uil-truck"></i> Truck {index + 1}
                                </span>
                              </div>
                              <div className="item-body">
                                <div className="form-group">
                                  <label htmlFor="truck_no">Truck No</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={truckItems[index].truckNo}
                                    onChange={(event) => handleTruckInputChange(event, index, "truckNo")}
                                    autocomplete="on"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="truck_no">Truck Driver</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={truckItems[index].truckDriverName}
                                    onChange={(event) => handleTruckInputChange(event, index, "truckDriverName")}
                                    autocomplete="on"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="truck_no">Driver Mobile</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={truckItems[index].truckDriverTel}
                                    onChange={(event) => handleTruckInputChange(event, index, "truckDriverTel")}
                                    autocomplete="on"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Old design trucks  */}
              {/* <div style={{ display: "flex" }}>
            {Array.from({ length: truckItems.length }, (truck, index) => (
              <div key={index} className="truck">
                <div className="truck_no">Truck {index + 1}</div>
                <div className="info_row">
                  <div className="label_div">Truck No : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckNo}
                      onChange={(event) => handleTruckInputChange(event, index, "truckNo")}
                    ></input>
                  </div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">Truck Driver : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckDriverName}
                      onChange={(event) => handleTruckInputChange(event, index, "truckDriverName")}
                    ></input>
                  </div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">Driver Mob/Tel : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckDriverTel}
                      onChange={(event) => handleTruckInputChange(event, index, "truckDriverTel")}
                    ></input>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={handleAddTruck}>
              <i class="uil uil-plus-circle add_truck_but"></i>
            </div>

            
         
          </div> */}
              {/*   ...........................................................................................................................................*/}

              {/* first tabel for desktop  */}
              <div className="desktop-table">
                <table className="pi__table table table-bordered pkl-table">
                  <thead>
                    <tr className="th_style">
                      {/* <th scope="col">
                    <div >#</div>
                  </th> */}
                      <th scope="col">
                        <div>Description</div>
                      </th>
                      <th scope="col">
                        <div>Pallet</div>
                      </th>
                      {/* <th scope="col">
                    <div >Unit NW</div>
                  </th>
                  <th scope="col">
                    <div >NW(KGs)</div>
                  </th> */}
                      <th scope="col">
                        <div>Unit GW</div>
                      </th>
                      <th scope="col">
                        <div>GW(KGs)</div>
                      </th>
                      <th scope="col">
                        <div>Unite price</div>
                      </th>
                      {/* <th scope="col">
                    <div >Total</div>
                  </th> */}
                      {truckItems.map((truck, index) => (
                        <th key={index}>Truck No {truck.truckNo}</th>
                      ))}
                      <th scope="col">
                        <div>QTY(PCs)</div>
                      </th>
                      <th scope="col">
                        <div>Remaining</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pklInfo?.pklProducts?.map((product, productIndex) => (
                      <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                        {/* <td>
                      <div style={{ fontWeight: "bold" }} c>
                        {productIndex + 1}
                      </div>
                    </td> */}
                        <td>
                          <div>{product.description}</div>
                        </td>

                        <td>
                          <div>{product.pallet}</div>
                        </td>
                        {/* <td>
                      <div c>{product.netWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div c>{product.totalNetWeight?.toFixed(2)}</div>
                    </td> */}
                        <td>
                          <div c>{product.grossWeight?.toFixed(2)}</div>
                        </td>
                        <td>
                          <div c>{product.totalGrossWeight?.toFixed(2)}</div>
                        </td>
                        <td>
                          <div c>{product.price?.toFixed(2)}</div>
                        </td>
                        {/* <td>
                      <div c>{product.totalAmount?.toFixed(2)}</div>
                    </td> */}
                        {truckItems.map((truckItem, truckIndex) => (
                          <td key={truckIndex}>
                            <div className="">
                              <input
                                id={truckIndex}
                                type="text"
                                value={getTruckProductWarehouseItemQty(product.productId, truckIndex, "all")}
                                onChange={(e) => {
                                  const qtyVal = e.target.value;
                                  setTruckProductWarehouseItemQty(product.productId, truckIndex, "all", qtyVal);
                                }}
                                autocomplete="on"
                              />
                              {/* <div className="warehouse_bl_item" style={{ flex: 1 }}>
                            <div className="warehouse_bl_item_qty">
                              {" "}
                              <input
                                id={truckIndex}
                                type="text"
                                value={getTruckProductWarehouseItemQty(product.productId, truckIndex, "all")}
                                onChange={(e) => {
                                  const qtyVal = e.target.value;
                                  setTruckProductWarehouseItemQty(product.productId, truckIndex, "all", qtyVal);
                                }}
                              />
                            </div>
                          </div> */}
                            </div>
                          </td>
                        ))}
                        <td>
                          <div c>{product.qty}</div>
                        </td>
                        <td>
                          <div c>{product.qty - getTotalProductQtyInWarehouse(product.productId, "all")}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* first table for mobile  */}
              <div>
                <div className="truck-table-mobile">
                  {pklInfo?.pklProducts?.map((product, productIndex) => (
                    <div className="wrapper-truck" key={productIndex}>
                      <div className="wrapper-tittle">
                        <h6>Product</h6>
                        <span>{productIndex + 1}</span>
                      </div>
                      <div className="wrapper">
                        <div className="box">
                          <h6>Description</h6>
                          <span>{product.description}</span>
                        </div>
                        <div className="box">
                          <h6>Pallet</h6>
                          <span>{product.pallet}</span>
                        </div>
                        <div className="box">
                          <h6>Unit GW</h6>
                          <span>{product.grossWeight?.toFixed(2)}</span>
                        </div>
                        <div className="box">
                          <h6>GW(KGs)</h6>
                          <span>{product.totalGrossWeight?.toFixed(2)}</span>
                        </div>
                        <div className="box">
                          <h6>Unite price</h6>
                          <span>{product.price?.toFixed(2)}</span>
                        </div>
                        {truckItems.map((truckItem, truckIndex) => (
                          <div className="box" key={truckIndex}>
                            <h6>Truck No {truckItem.truckNo}</h6>
                            <input
                              id={truckIndex}
                              type="text"
                              value={getTruckProductWarehouseItemQty(product.productId, truckIndex, "all")}
                              onChange={(e) => {
                                const qtyVal = e.target.value;
                                setTruckProductWarehouseItemQty(product.productId, truckIndex, "all", qtyVal);
                              }}
                              autocomplete="on"
                            />
                          </div>
                        ))}
                        <div className="box">
                          <h6>QTY(PCs)</h6>
                          <span>{product.qty}</span>
                        </div>
                        <div className="box">
                          <h6>Remaining</h6>
                          <span>{product.qty - getTotalProductQtyInWarehouse(product.productId, "all")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Truck lists from desktop  */}
              <div className="desktop-table">
                {truckItems.map((truckItem, index) => (
                  <>
                    {truckItem.truckNo !== "" && (
                      <div className="truck-item-desktop " key={index}>
                        <div className="tuck-item-tittle-desktop">
                          <div>
                            <label>
                              {" "}
                              <i class="uil uil-truck"></i> Truck No:
                            </label>
                            <span>{truckItem.truckNo}</span>
                          </div>
                          <div>
                            <label>Truck Driver:</label>
                            <span>{truckItem.truckDriverName}</span>
                          </div>
                        </div>
                        <div className="tuck-item-body-desktop">
                          <table className="pi__table table table-bordered">
                            <thead>
                              <tr className="th_style">
                                <th scope="col">
                                  <div>#</div>
                                </th>
                                <th scope="col">
                                  <div>Description</div>
                                </th>
                                <th scope="col">
                                  <div>QTY(PCs)</div>
                                </th>
                                <th scope="col">
                                  <div>Pallet</div>
                                </th>
                                <th scope="col">
                                  <div>NW(KGs)</div>
                                </th>
                                <th scope="col">
                                  <div>GW(KGs)</div>
                                </th>
                                {showFake && (
                                  <th scope="col">
                                    <div>GW(KGs)(F)</div>
                                  </th>
                                )}
                                <th scope="col">
                                  <div>Total</div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {truckItem.truckProductItems.map((product, productIndex) => (
                                <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                                  <td>
                                    <div style={{ fontWeight: "bold" }} c>
                                      {productIndex + 1}
                                    </div>
                                  </td>
                                  <td>
                                    <div>{product.productDescription}</div>
                                  </td>
                                  <td>
                                    <div c>{product.productQty}</div>
                                  </td>
                                  <td>
                                    <div>{product.productPalletQty}</div>
                                  </td>

                                  <td>
                                    <div c>{product.productTotalNetWeight?.toFixed(2)}</div>
                                  </td>

                                  <td>
                                    <div c>{product.productTotalGrossWeight?.toFixed(2)}</div>
                                  </td>
                                  {showFake && (
                                    <td>
                                      <div c>{product.productTotalGrossWeightFake?.toFixed(2)}</div>
                                    </td>
                                  )}

                                  <td>
                                    <div c>{product.productTotalAmount?.toFixed(2)}</div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="row-bl">
                            <div>
                              <label>BL</label>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={truckItems[index].truckBls}
                                onChange={(event) => handleTruckInputChange(event, index, "truckBls")}
                                autocomplete="on"
                              />
                            </div>
                          </div>
                          {/* <div className="truck" key={index}>
                <div>
                  <div className="pkl_info">
                    <div className="info_row">
                      <div className="label_div">Truck No : </div>
                      <div className="val_div">{truckItem.truckNo}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">Truck Driver : </div>
                      <div className="val_div">{truckItem.truckDriverName}</div>
                    </div>
                  </div>
                </div>
              
                <div>
                  <div className="pkl_info">
                    <div className="info_row">
                      <div className="label_div">NetWeight : </div>
                      <div className="val_div">{truckItem.truckNetWeight}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">GrossWeight: </div>
                      <div className="val_div">{truckItem.truckGrossWeight}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">Packages : </div>
                      <div className="val_div">{truckItem.truckTotalPackages}</div>
                    </div>
                  </div>
                </div>
            
              </div> */}
                        </div>
                        <div className="tuck-item-footer-desktop">
                          <div>
                            <label>Net Weight:</label>
                            <span>{truckItem.truckNetWeight.toFixed(2)}</span>
                          </div>
                          <div>
                            <label>Gross Weight:</label>
                            <span>{truckItem.truckGrossWeight.toFixed(2)}</span>
                          </div>
                          {showFake && (
                            <div>
                              <label>Gross Weight Fake:</label>
                              <span>{truckItem.truckGrossWeightFake.toFixed(2)}</span>
                            </div>
                          )}
                          <div>
                            <label> Packages:</label>
                            <span>{truckItem.truckTotalPackages}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
                {/* {truckItems.map((truckItem, index) => (
              <div className="truck" key={index}>
                <div>
                  <div className="pkl_info">
                    <div className="info_row">
                      <div className="label_div">Truck No : </div>
                      <div className="val_div">{truckItem.truckNo}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">Truck Driver : </div>
                      <div className="val_div">{truckItem.truckDriverName}</div>
                    </div>
                  </div>
                </div>
                <table className="pi__table table table-bordered">
                  <thead>
                    <tr className="th_style">
                      <th scope="col">
                        <div >#</div>
                      </th>
                      <th scope="col">
                        <div >Description</div>
                      </th>
                      <th scope="col">
                        <div >QTY(PCs)</div>
                      </th>
                      <th scope="col">
                        <div >Pallet</div>
                      </th>
                      <th scope="col">
                        <div >NW(KGs)</div>
                      </th>
                      <th scope="col">
                        <div >GW(KGs)</div>
                      </th>
                      <th scope="col">
                        <div >Total</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {truckItem.truckProductItems.map((product, productIndex) => (
                      <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                        <td>
                          <div style={{ fontWeight: "bold" }} c>
                            {productIndex + 1}
                          </div>
                        </td>
                        <td>
                          <div >{product.productDescription}</div>
                        </td>
                        <td>
                          <div c>{product.productQty}</div>
                        </td> 
                        <td>
                          <div >{product.productPalletQty}</div>
                        </td>

                        <td>
                          <div c>{product.productTotalNetWeight?.toFixed(2)}</div>
                        </td>

                        <td>
                          <div c>{product.productTotalGrossWeight?.toFixed(2)}</div>
                        </td>

                        <td>
                          <div c>{product.productTotalAmount?.toFixed(2)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <div className="pkl_info">
                    <div className="info_row">
                      <div className="label_div">NetWeight : </div>
                      <div className="val_div">{truckItem.truckNetWeight}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">GrossWeight: </div>
                      <div className="val_div">{truckItem.truckGrossWeight}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">Packages : </div>
                      <div className="val_div">{truckItem.truckTotalPackages}</div>
                    </div>
                  </div>
                </div>
                <div className="info_row">
                  <div className="label_div">BL : </div>
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      value={truckItems[index].truckBls}
                      onChange={(event) => handleTruckInputChange(event, index, "truckBls")}
                    ></input>
                  </div>
                </div>
              </div>
            ))} */}
              </div>

              {/* trucks list for mobile  */}
              <div>
                {truckItems.map((truckItem, index) => (
                  <>
                    {truckItem.truckNo !== "" && (
                      <div className="truck-item-table-mobile" key={index}>
                        <div className="wrapper-truck">
                          <div className="wrapper-tittle">
                            <h6> {truckItem.truckNo}</h6>
                            <span>{truckItem.truckDriverName}</span>
                          </div>
                          {truckItem.truckProductItems.map((product, productIndex) => (
                            <div className="wrapper" key={productIndex}>
                              <div className="box">
                                <h6>Description</h6>
                                <span>{product.productDescription}</span>
                              </div>
                              <div className="box">
                                <h6>QTY(PCs)</h6>
                                <span>{product.productQty}</span>
                              </div>
                              <div className="box">
                                <h6>Pallet</h6>
                                <span>{product.productPalletQty}</span>
                              </div>
                              <div className="box">
                                <h6>NW(KGs)</h6>
                                <span>{product.productTotalNetWeight?.toFixed(2)}</span>
                              </div>
                              <div className="box">
                                <h6>GW(KGs)</h6>
                                <span>{product.productTotalGrossWeight?.toFixed(2)}</span>
                              </div>
                              <div className="box">
                                <h6>GW(KGs)</h6>
                                <span>{product.productTotalGrossWeightFake?.toFixed(2)}</span>
                              </div>
                              <div className="box">
                                <h6>Total </h6>
                                <span>{product.productTotalAmount?.toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                          <div className="wrapper-footer">
                            <div className="box">
                              <h6>NetWeight</h6>
                              <span>{truckItem.truckNetWeight}</span>
                            </div>
                            <div className="box">
                              <h6>GrossWeight</h6>
                              <span>{truckItem.truckGrossWeight}</span>
                            </div>{" "}
                            {showFake && (
                              <div className="box">
                                <h6>GrossWeight Fake</h6>
                                <span>{truckItem.truckGrossWeightFake}</span>
                              </div>
                            )}
                            <div className="box">
                              <h6>Packages</h6>
                              <span>{truckItem.truckTotalPackages}</span>
                            </div>
                            <div className="box">
                              <h6>BL</h6>
                              <input
                                type="text"
                                value={truckItems[index].truckBls}
                                onChange={(event) => handleTruckInputChange(event, index, "truckBls")}
                                autocomplete="on"
                              />
                            </div>
                            {/* <div className="wrapper-tittle">
                 <div>
                 <div className="pkl_info">
                   <div className="info_row">
                     <div className="label_div">NetWeight : </div>
                     <div className="val_div">{truckItem.truckNetWeight}</div>
                   </div>
                   <div className="info_row">
                     <div className="label_div">GrossWeight: </div>
                     <div className="val_div">{truckItem.truckGrossWeight}</div>
                   </div>
                   <div className="info_row">
                     <div className="label_div">Packages : </div>
                     <div className="val_div">{truckItem.truckTotalPackages}</div>
                   </div>
                 </div>
               </div>
               <div className="info_row">
                 <div className="label_div">BL : </div>
                 <div style={{ width: "100%" }}>
                   <input
                     type="text"
                     value={truckItems[index].truckBls}
                     onChange={(event) => handleTruckInputChange(event, index, "truckBls")}
                   ></input>
                 </div>
               </div>
               </div> */}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>

              <div className="item"></div>
            </>
          )}
          {pklInfo && (
            <div className="text-right">
              <button className="btn btn-danger danger" onClick={handleNextClick}>
                Next
              </button>
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default PackingListManual;
