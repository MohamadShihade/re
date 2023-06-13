import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletProductformCart,
  setProductQty,
  modifyProductPrice,
  modifyProductPriceFreezone,
  modifyProductPriceLocal,
  modifyProductPriceFreezoneAED,
  modifyProductPriceLocalAED,
} from "../../store/cartSlice";
import { setPICurrencyLocation } from "../../store/piSlice";
import "./styles.css";
import { contents } from "./test";
const TablePage = () => {
  const pi = useSelector((state) => state.pi.isPi);
  function calcPrice(item) {
    let price = 0;
    if (location === "freezone" && currency === "AED") {
      price = item.freezonePriceAED;
    }
    if (location === "local" && currency === "AED") {
      price = item.LocalPriceAED;
    }
    if (location === "freezone" && currency === "USD") {
      price = item.freezonePrice;
    }
    if (location === "local" && currency === "USD") {
      price = item.LocalPrice;
    }

    return price;
  }
  const dispatch = useDispatch();

  let totalAmount = 0;
  let totalWeight = 0;
  const selectedProducts = useSelector((state) => state.cart.cart);
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  useEffect(() => {
    dispatch(setPICurrencyLocation({ currency, location }));
  }, []);

  const [qty, setQty] = useState("");

  const [newPrice, setNewPrice] = useState(selectedProducts.map((product) => calcPrice(product)));
  const [quantities, setQuantities] = useState(selectedProducts.map((item) => item.qty));
  const handleQuantityChange = (index, event) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(event.target.value);
    setQuantities(newQuantities);
  };

  let UAERATE = 1;
  if (currency === "AED") UAERATE = usdToAedRate;

  function calcTotal() {
    selectedProducts.map((item) => {
      if (location === "freezone" && currency === "AED") {
        totalAmount += item.freezonePriceAED * item.qty;
      }
      if (location === "local" && currency === "AED") {
        totalAmount += item.LocalPriceAED * item.qty;
      }
      if (location === "freezone" && currency === "USD") {
        totalAmount += item.freezonePrice * item.qty;
      }
      if (location === "local" && currency === "USD") {
        totalAmount += item.LocalPrice * item.qty;
      }
      totalWeight += item?.grossWeight * item?.qty;
    });
  }
  calcTotal();

  const handleNewPriceChange = (event, id, index) => {
    if (location === "freezone" && currency === "AED") {
      dispatch(modifyProductPriceFreezoneAED({ id: id, price: parseFloat(event.target.value) }));
    }
    if (location === "local" && currency === "AED") {
      dispatch(modifyProductPriceLocalAED({ id: id, price: parseFloat(event.target.value) }));
    }
    if (location === "freezone" && currency === "USD") {
      dispatch(modifyProductPriceFreezone({ id: id, price: parseFloat(event.target.value) }));
    }
    if (location === "local" && currency === "USD") {
      dispatch(modifyProductPriceLocal({ id: id, price: parseFloat(event.target.value) }));
    }
  };
  if (selectedProducts.length > 0) {
    return (
      <>
        <span className="ags-btn-review" data-toggle="modal" data-target="#exampleModal">
          <i class="uil uil-eye"></i>
        </span>
        {selectedProducts.map((item, index) => (
          <div className="pi-list">
            <div className="item-pi">
              <div className="item-pi-tittle">
                <span>Item.No</span>
                <span> {index + 1}</span>
              </div>
              <div className="item-pi-body">
                <div class="wrapper">
                  <div class="box a">
                    <p className="text-secondary">Unit Price</p>
                    <h6>
                      {currency === "USD" ? " $ " : " AED "}
                      {calcPrice(item)?.toFixed(3)}
                    </h6>
                  </div>
                  <div class="box b">
                    <p className="text-secondary">New Price</p>
                    <input
                      id="new_price"
                      placeholder={calcPrice(item)?.toFixed(3)}
                      type="text"
                      className="form-control w-75"
                      value={newPrice[index]?.toFixed(3)}
                      autocomplete="on"
                      onChange={(e) => {
                        let newPriceArray = [...newPrice];
                        newPriceArray[index] = e.target.value;
                        setNewPrice(parseFloat(newPriceArray));
                      }}
                      onBlur={(e) => {
                        handleNewPriceChange(e, item._id);
                      }}
                    />
                  </div>
                  <div class="box c">
                    <p className="text-secondary">Total ({currency === "USD" ? " $ " : " AED "})</p>
                    <h6>
                      {" "}
                      {currency === "USD" ? " $ " : " AED "}
                      {item.qty > 0 ? (calcPrice(item) * item.qty)?.toFixed(3) : 0}
                    </h6>
                  </div>
                  <div class="box d">
                    <p className="text-secondary">Qty</p>
                    <input
                      type="number"
                      className="form-control w-75"
                      value={quantities[index]}
                      autocomplete="on"
                      onBlur={() => {
                        dispatch(setProductQty({ id: item._id, qty: quantities[index] }));
                      }}
                      onChange={(e) => {
                        handleQuantityChange(index, e);
                        setQty(e.target.value);
                      }}
                    />
                  </div>
                  <div class="box e">
                    <p className="text-secondary">Item Name</p>
                    <h6>
                      {" "}
                      {item.brand}&nbsp;{item.code}&nbsp;({item.capacity})
                    </h6>
                  </div>
                  <div class="box f weight">
                    <p className="text-secondary">Weight </p>
                    <h6> {item.grossWeight}</h6>
                  </div>
                  <div class="box  total-weight">
                    <p className="text-secondary">Total/ W </p>
                    <h6> {item.grossWeight * item.qty}</h6>
                  </div>
                  <div class="box g">
                    <p className="text-secondary">Actions</p>
                    <div className="ags-action">
                      <button className="ags-btn-delete">
                        <i class="uil uil-trash-alt"></i>Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="table-pi-list mx-auto">
          <table className="w-full pi__table whitespace-nowrap">
            <thead>
              <tr className="h-16  text-sm leading-none text-gray-800">
                <th>Item NO</th>
                <th>Item Name</th>
                {/* {pi && <th className="font-normal ">QTY(PCS)/(WATTS)</th>} */}
                <th>Unit Price({currency})</th>
                <th>New Price</th>
                {pi && <th>Unit Weight</th>}
                {pi && <th> Total Weight</th>} {pi && <th>Total({currency})</th>}
                {pi && <th>Qty</th>}
                {pi && <th>Actions</th>}
              </tr>
            </thead>
            <tbody className="">
              {selectedProducts.map((item, index) => (
                <tr
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  key={index}
                >
                  <td className="pl-4 cursor-pointer">
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {item.brand}&nbsp;{item.code}&nbsp;({item.capacity})
                    </p>
                  </td>
                  {/* {pi && (
                    <td   >
                      <p className="font-medium">{item.qty}</p>
                    </td>
                  )} */}
                  <td>
                    <p className="font-medium">
                      {calcPrice(item)?.toFixed(3)}
                      {currency === "USD" ? " $ " : " AED "}
                    </p>
                  </td>
                  <td>
                    <input
                      id="new_price"
                      placeholder={calcPrice(item)?.toFixed(3)}
                      type="text"
                      className="form-control w-75"
                      value={newPrice[index]?.toFixed(3)}
                      autocomplete="on"
                      onChange={(e) => {
                        let newPriceArray = [...newPrice];
                        newPriceArray[index] = e.target.value;
                        setNewPrice(parseFloat(newPriceArray));
                      }}
                      onBlur={(e) => {
                        handleNewPriceChange(e, item._id);
                      }}
                    />
                  </td>

                  {pi && (
                    <td>
                      <p className="font-medium">{item.grossWeight}</p>
                    </td>
                  )}
                  {pi && (
                    <td>
                      <p className="font-medium">{item.grossWeight * item.qty}</p>
                    </td>
                  )}
                  {pi && (
                    <td>
                      <p className="font-medium">
                        {item.qty > 0 ? (calcPrice(item) * item.qty)?.toFixed(3) : 0}
                        {currency === "USD" ? " $ " : " AED "}
                      </p>
                    </td>
                  )}
                  {pi && (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control w-75"
                          value={quantities[index]}
                          autocomplete="on"
                          onBlur={() => {
                            dispatch(setProductQty({ id: item._id, qty: quantities[index] }));
                          }}
                          onChange={(e) => {
                            handleQuantityChange(index, e);
                            setQty(e.target.value);
                          }}
                        />
                        {/* <TextField
                          variant="outlined"
                          onChange={(e) => { handleQuantityChange(index, e);setQty(e.target.value);}}
                          value={quantities[index]}
                          onBlur={() => { dispatch(setProductQty({ id: item._id, qty: quantities[index] }));}}
                          style={{ width: "70px", marginRight: "20px" }}
                        /> */}
                      </td>
                      <td>
                        {/* <Button
                          onClick={() => {dispatch(deletProductformCart(item));}}
                          variant="contained"
                          style={{ backgroundColor: "red" }}
                        >
                          DELETE
                        </Button> */}
                        <span
                          className="ags-btn-main"
                          onClick={() => {
                            dispatch(deletProductformCart(item));
                          }}
                        >
                          Delete
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {pi && (
                <>
                  <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                    <td></td>
                    <td>{/* <p className="text-sm font-medium leading-none text-gray-800"></p> */}</td>
                    <td>{/* <p className="text-sm font-medium leading-none text-gray-800"></p> */}</td>
                    <td>{/* <p className="text-sm font-medium leading-none text-gray-800"></p> */}</td>
                    <td>{/* <p className="text-sm font-medium leading-none text-gray-800"></p> */}</td>
                    <td>
                      {/* <p className="text-sm font-medium leading-none text-gray-800">Total :</p> */}
                      <p className="text-sm font-medium leading-none text-gray-800">{totalWeight?.toFixed(3)} Kg</p>
                    </td>
                    <td>
                      {/* <p className="text-sm font-medium leading-none text-gray-800">{totalWeight?.toFixed(3)} Kg</p> */}
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {totalAmount?.toFixed(3)} {pi.currency} {currency === "USD" ? " $ " : " AED "}
                      </p>
                    </td>{" "}
                    <td>{/* <p className="text-sm font-medium leading-none text-gray-800">Total Invoice :</p> */}</td>
                    <td>
                      {/* <p className="text-sm font-medium leading-none text-gray-800">
                        {totalAmount?.toFixed(3)} {pi.currency}
                      </p> */}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div class="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Summary
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="modal-data-summary">
                  <div className="form-group">
                    <strong>Total Weight : </strong>
                    <span> {totalWeight?.toFixed(3)} Kg</span>
                  </div>
                  <div className="form-group">
                    <strong>Total Invoice : </strong>
                    <span>
                      {" "}
                      {totalAmount?.toFixed(3)} {pi.currency}
                    </span>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="text-center">
        <h5>No Items Added Yet!</h5>
      </div>
    );
  }
};

export default TablePage;
