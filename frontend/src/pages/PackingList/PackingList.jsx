import React, { useState } from "react";
import "./PackingList.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PackingList = () => {
  const { username } = useAuth();
  console.log(username);
  const [pklInfo, setPklInfo] = useState(null);
  const [piNumber, setPiNumber] = useState(0);
  const [customer, setCustomer] = useState("");
  const [buyer, setBuyer] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState(new Date());

  const initialTruckItemsState = Array.from({ length: pklInfo?.totalTrucks }, () => ({
    truckNo: "",
    truckDriverName: "",
    truckDriverTel: "",
    truckNetWeight: 0,
    truckGrossWeight: 0,
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
      .get(`http://localhost:5000/packinglist/info/${piNumber}`)
      .then(async (response) => {
        // Handle the response data
        setPklInfo(response.data);
        console.log(pklInfo);
        let initialTruckProductItems = [];
        response.data.pklProducts.map((product) => {
          initialTruckProductItems.push({
            productId: product.productId,
            productCode: product.productCode,
            productCategory: product.productCategory,
            productCountry: product.productCountry,
            productCapacity: product.productCapacity,
            productDescription: product.description,
            productGrossWeight: product.grossWeight,
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
      exporter: "pklInfo.exporter",
      piNo: pklInfo.piNo,
      piId: pklInfo.piId,
      invoiceNo: invoiceNo,
      customer: customer,
      buyerAddress: buyer,
      truckItems,
    };
    console.log(pkl);
    await axios
      .post(`http://localhost:5000/packinglist`, pkl)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data));
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleSearchPi();
      return;
    }
  };

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
        truckProductItem.productPalletQty = 0;
      });

      updatedTruckItems.map((truck) => {
        let truckGrossWeight = 0;
        let truckNetWeight = 0;
        let truckTotalPackages = 0;
        let truckTotalAmount = 0;
        let truckTotalPallets = 0;

        truck.truckProductItems.map((truckProductItem) => {
          truckGrossWeight += truckProductItem.productTotalGrossWeight;
          truckNetWeight += truckProductItem.productTotalNetWeight;
          truckTotalPackages += truckProductItem.productQty;
          truckTotalAmount += truckProductItem.productTotalAmount;
          truckTotalPallets += truckProductItem.productPalletQty;
        });
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
        productCountry: product.productCountry,
        productCapacity: product.productCapacity,
        productDescription: product.description,
        productGrossWeight: product.grossWeight,
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
      truckTotalPackages: 0,
      truckTotalAmount: 0,
      truckTotalPallets: 0,
      truckProductItems: initialTruckProductItems,
    });
    setTruckItems(updatedTruckItems);
  };

  return (
    <>
    <div className="pkl_container">
      <div className="search_div">
        <label htmlFor="piNumber">Enter PI Number :</label>
        <input
          style={{ width: "20%" }}
          id="piNumber"
          type="text"
          value={piNumber}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setPiNumber(e.target.value);
          }}
          autocomplete="on"
        ></input>
        <button className="search_pi" onClick={handleSearchPi}>
          Search
        </button>
      </div>
      {pklInfo && (
        <>
          <div className="pkl_info">
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
          </div>
          <div>
            <div style={{ display: "flex" }}>
              {" "}
              <div className="info_row">
                <div className="label_div">Customer : </div>
                <div className="">
                  <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)}  autocomplete="on"> </input>
                </div>
              </div>
              <div className="info_row">
                <div className="label_div">Buyer Address : </div>
                <div className="">
                  <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)}  autocomplete="on"></input>
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
                    autocomplete="on"
                  ></input>
                </div>
              </div>
            </div>
            <div className="info_row">
              <div className="label_div">PKL Date : </div>
              <div className="">
                <input type="text" value={date.toLocaleDateString()} disabled onChange={() => {}}   autocomplete="on"></input>
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
              <div style={{ display: "flex" }}>
                <div className="info_row">
                  <div className="label_div">TOTAL AMOUNT : </div>
                  <div className="val_div">{pklInfo.pklTotalAmount}</div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">TOTAL GW : </div>
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
              </div>
            </div>
          </div>
          <div className="info_row">
            <div className="label_div">Truck Payload : </div>
            <div className="val_div">{pklInfo.truckPayload}</div>
          </div>
          <div className="info_row">
            <div className="label_div">Total Trucks: </div>
            <div className="val_div">{pklInfo.totalTrucks}</div>
          </div>
          <div style={{ display: "flex" }}>
            {Array.from({ length: truckItems.length }, (truck, index) => (
              <div key={index} className="truck">
                <div className="truck_no">Truck {index + 1}</div>
                <div className="info_row">
                  <div className="label_div">Truck No : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckNo}
                      onChange={(event) => handleTruckInputChange(event, index, "truckNo")}  autocomplete="on"
                    ></input> 
                  </div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">Truck Driver : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckDriverName}
                      onChange={(event) => handleTruckInputChange(event, index, "truckDriverName")}  autocomplete="on"
                    ></input>
                  </div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">Driver Mob/Tel : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckDriverTel}
                      onChange={(event) => handleTruckInputChange(event, index, "truckDriverTel")}  autocomplete="on"
                    ></input>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={handleAddTruck}>
              <i class="uil uil-plus-circle add_truck_but"></i>
            </div>
          </div>

          {/*   ...........................................................................................................................................*/}

          <div>
            <table className="pi__table table table-bordered">
              <thead>
                <tr className="th_style">
                  <th scope="col">
                    <div className="th_cell_div">#</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Description</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">QTY(PCs)</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Pallet</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Unit NW</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">NW(KGs)</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Unit GW</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">GW(KGs)</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Unite price</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Total</div>
                  </th>
                  {truckItems.map((truck, index) => (
                    <th key={index}>Truck No :{truck.truckNo}</th>
                  ))}
                  <th>
                    <div className="th_cell_div">warehouses</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pklInfo?.pklProducts?.map((product, productIndex) => (
                  <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                    <td>
                      <div style={{ fontWeight: "bold" }} className="td_padding">
                        {productIndex + 1}
                      </div>
                    </td>
                    <td>
                      <div className="td_padding employee_cell">{product.description}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.qty}</div>
                    </td>
                    <td>
                      <div className="td_padding customer_cell">{product.pallet}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.netWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.totalNetWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.grossWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.totalGrossWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.price?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.totalAmount?.toFixed(2)}</div>
                    </td>
                    {truckItems.map((truckItem, truckIndex) => (
                      <td key={truckIndex}>
                        <div className="warehouses">
                          {product.bookedWarehouses.map((warehouse, whIndex) => (
                            <div className="warehouse_bl_item" style={{ flex: 1 }} key={whIndex}>
                              <div className="warehouse_bl_item_code">
                                {warehouse.qty - getTotalProductQtyInWarehouse(product.productId, warehouse.warehouse)}
                              </div>{" "}
                              <div className="warehouse_bl_item_code">{warehouse.warehouse}</div>
                              <div className="warehouse_bl_item_qty">
                                {" "}
                                <input
                                  id={truckIndex}
                                  type="text"
                                  value={getTruckProductWarehouseItemQty(product.productId, truckIndex, warehouse.warehouse)}
                                  onChange={(e) => {
                                    const qtyVal = e.target.value;
                                    setTruckProductWarehouseItemQty(product.productId, truckIndex, warehouse.warehouse, qtyVal); 
                                  }}
                                  autocomplete="on"
                                ></input>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                    <td>
                      <div className="td_pading" style={{ display: "flex" }}>
                        {product.bookedWarehouses.map((warehouse, index) => (
                          <div style={{ flex: 1 }} key={index}>
                            <div>{warehouse.warehouse}</div>
                            <div>{warehouse.qty}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {console.log(truckItems)}
            {truckItems.map((truckItem, index) => (
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
                        <div className="th_cell_div">#</div>
                      </th>
                      <th scope="col">
                        <div className="th_cell_div">Description</div>
                      </th>
                      <th scope="col">
                        <div className="th_cell_div">QTY(PCs)</div>
                      </th>
                      <th scope="col">
                        <div className="th_cell_div">Pallet</div>
                      </th>

                      <th scope="col">
                        <div className="th_cell_div">NW(KGs)</div>
                      </th>

                      <th scope="col">
                        <div className="th_cell_div">GW(KGs)</div>
                      </th>

                      <th scope="col">
                        <div className="th_cell_div">Total</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {truckItem.truckProductItems.map((product, productIndex) => (
                      <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                        <td>
                          <div style={{ fontWeight: "bold" }} className="td_padding">
                            {productIndex + 1}
                          </div>
                        </td>
                        <td>
                          <div className="td_padding employee_cell">{product.productDescription}</div>
                        </td>
                        <td>
                          <div className="td_padding">{product.productQty}</div>
                        </td>
                        <td>
                          <div className="td_padding customer_cell">{product.productPalletQty}</div>
                        </td>

                        <td>
                          <div className="td_padding">{product.productTotalNetWeight?.toFixed(2)}</div>
                        </td>

                        <td>
                          <div className="td_padding">{product.productTotalGrossWeight?.toFixed(2)}</div>
                        </td>

                        <td>
                          <div className="td_padding">{product.productTotalAmount?.toFixed(2)}</div>
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
                      autocomplete="on"
                    ></input>
                  </div>
                </div>{" "}
              </div>
            ))}
          </div>
        </>
      )}
      <button className="btn btn-danger danger" onClick={handleNextClick}>
        Next
      </button>
    </div>
    </>
  );
};

export default PackingList;
