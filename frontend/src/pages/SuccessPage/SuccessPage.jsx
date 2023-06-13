import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { setPiEmployee, setPiProudcts } from "../../store/piSlice";
import "./styles.css";

const SuccessPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const { username, status, phone } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPiProudcts(cart));
    dispatch(setPiEmployee({ employeeName: username, employeePhone: phone }));
  }, []);

  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const piInfo = useSelector((state) => state.pi.piInfo);
  const products = useSelector((state) => state.cart.cart);

  const res = Object.entries(piInfo).map(([name, obj]) => ({ name, ...obj }));
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
  let total = 0;

  function calcTotal() {
    products?.map((product) => {
      total += calcPrice(product) * product.qty;
    });
  }
  calcTotal();

  function colorByStatus(val) {
    if (val) {
      return "success-item";
    } else return "emtpy-item";
  }
  function colorByStatusArray(val) {
    if (val.length > 0) {
      return "table-success";
    } else return "table-danger";
  }

  return (
    <>
      <span className="ags-btn-review" data-toggle="modal" data-target="#exampleModal">
        <i class="uil uil-eye"></i>
      </span>
      <div className="card-add-product d-block">
        <div className="card-add-product-tittle">
          <h3> Summary</h3>
        </div>
        <div className="card-add-product-body">
          <div>
            <div className="sucess_container"></div>
            <div>
              <div className="summary-info">
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Exporter</strong>
                      <p className={colorByStatus(piInfo.exporter)}>{piInfo.exporter.split(" ", 5)}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Notify Party. </strong>
                      <p className={colorByStatus(piInfo.notifyParty)}>{piInfo.notifyParty.split(" ", 5)}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Buyer</strong>
                      <p className={colorByStatus(piInfo.buyerAdress)}>{piInfo.buyerAdress}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Consignee</strong>
                      <p className={colorByStatus(piInfo.consignee)}>{piInfo.consignee}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Party of Discharge </strong>
                      <p className={colorByStatus(piInfo.partyOfDischarge)}>{piInfo.partyOfDischarge}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Final Destination </strong>
                      <p className={colorByStatus(piInfo.finalDistination)}>{piInfo.finalDistination}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Phone Number </strong>
                      <p className={colorByStatus(piInfo.phoneNumber)}>{piInfo.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Discount </strong>
                      <p className={colorByStatus(piInfo.discount)}>{piInfo.discount}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Additions</strong>
                      <p className={colorByStatus(piInfo.additions)}>{piInfo.additions}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Date </strong>
                      <p className={colorByStatus(piInfo.date)}>{piInfo.date}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Notes </strong>
                      <p className={colorByStatus(piInfo.note)}>{piInfo.note}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Terms </strong>
                      <p className={colorByStatus(piInfo.terms)}>{piInfo.terms}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="summary-item">
                      <strong>Bank Details </strong>
                      <p className={colorByStatus(piInfo.bankDetails)}>{piInfo.bankDetails}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* design for desktop */}
              {/* <table style={{ border: 1 }} className="table border-summary-1">
        <tbody>
          <tr>
            <td className="property table-secondary">Exporter</td>
            <td className={colorByStatus(piInfo.exporter)}>{piInfo.exporter}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Buyer</td>
            <td className={colorByStatus(piInfo.buyerAdress)}>{piInfo.buyerAdress}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Consignee</td>
            <td className={colorByStatus(piInfo.consignee)}>{piInfo.consignee}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Notify Party</td>
            <td className={colorByStatus(piInfo.notifyParty)}>{piInfo.notifyParty}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Party of Discharge</td>
            <td className={colorByStatus(piInfo.partyOfDischarge)}>{piInfo.partyOfDischarge}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Final Destination</td>
            <td className={colorByStatus(piInfo.finalDistination)}>{piInfo.finalDistination}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Phone Number</td>
            <td className={colorByStatus(piInfo.phoneNumber)}>{piInfo.phoneNumber}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Discount</td>
            <td className="table-success">{piInfo.discount}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Additions</td>
            <td className="table-success">{piInfo.additions}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Date</td>
            <td className={colorByStatus(piInfo.date)}>{piInfo.date}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Notes</td>
            <td className="table-success">{piInfo.note}</td>
          </tr>
          <tr>
            <td className="property table-secondary">Terms</td>
            <td className={colorByStatus(piInfo.terms)}>
              {piInfo.terms}
            </td>
          </tr>
          <tr>
            <td className="property table-secondary">Bank Details</td>
            <td className={colorByStatusArray(piInfo.bankDetails)}>{piInfo.bankDetails.join(' | ')}</td>
          </tr>
        </tbody>
      </table> */}
              <div className="table-pi-list">
                <table style={{ border: 1 }} className="table pi__table table-responsive-sm border-summary-2">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Prodct</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {product.brand}
                            {product.code}&nbsp;
                            {product.capacity}
                          </td>
                          <td className={product.qty <= 0 && "table-danger"}>{product.qty}</td>
                          <td>{calcPrice(product).toFixed(3)}</td>
                          <td>{(calcPrice(product) * product.qty).toFixed(3)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={4}>
                        Total
                      </td>

                      <td>{total.toFixed(3)}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={4}>
                        Discount
                      </td>
                      <td>{piInfo.discount}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={4}>
                        Additions
                      </td>
                      <td>{piInfo.additions}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={4}>
                        Final
                      </td>
                      <td>{total.toFixed(3) - -piInfo.additions - piInfo.discount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* design for mobile  */}
              <div className="pi-list">
                {products.map((product, index) => (
                  <div className="item-pi">
                    <div className="item-pi-tittle">
                      <span>Item.No</span>
                      <span> 34</span>
                    </div>
                    <div className="item-pi-body pt-0">
                      <div class="wrapper">
                        {/* <div class="box a">
                    <p className="text-secondary">PI.No</p>
                    <h6>{proformaInvoice.pi_no}</h6>
                  </div> */}
                        {/* <div class="box b">
                    <p className="text-secondary">Employee</p>
                    <h6>{proformaInvoice?.employee?.split("/")[0]}</h6>
                  </div> */}
                        <div class="box c">
                          <p className="text-secondary">Qty</p>
                          <h6>34</h6>
                        </div>
                        <div class="box d">
                          <p className="text-secondary">Unit Price </p>
                          {/* <button className="ags-btn-pdf"><i class="uil uil-import"></i></button> */}
                          <h6>4545$</h6>
                        </div>
                        <div class="box e">
                          <p className="text-secondary">Item Name</p>
                          <h6>asdfasdfasdfasdfasdfasdf</h6>
                        </div>
                        <div class="box f">
                          <p className="text-secondary">Total</p>
                          <h6> 343434 </h6>
                        </div>
                        {/* <div class="box g">
                    <p className="text-secondary">Actions</p>
                    <div className="ags-action">
                      <button
                        type="button"
                        className="ags-btn-reject"
                        onClick={() => {
                          setCurrentPi(proformaInvoice);
                          handleReject(proformaInvoice._id);
                        }}
                      >
                        <i class="uil uil-times"></i> Reject
                      </button>
                      <button className="ags-btn-approve">
                        <i
                          class="uil uil-check"
                          onClick={() => handleApprove(proformaInvoice._id)}
                        ></i>{" "}
                        Approve
                      </button>
                      {!roles.includes("Financial") && (
                        <button
                          className="ags-btn-delete"
                          onClick={() => {
                            setCurrentPi(proformaInvoice);
                            handleShow();
                          }}
                        >
                          <i class="uil uil-trash-alt"></i>Delete
                        </button>
                      )}
                    </div>
                  </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
              <div>
                <div className="form-group">
                  <strong>Total : </strong>
                  <span>{total.toFixed(3)}</span>
                </div>
                <div className="form-group">
                  <strong>Discount : </strong>
                  <span> {piInfo.discount}</span>
                </div>
                <div className="form-group">
                  <strong>Additions : </strong>
                  <span> {piInfo.additions}</span>
                </div>
                <div className="form-group">
                  <strong>Final : </strong>
                  <span>{total.toFixed(3) - -piInfo.additions - piInfo.discount}</span>
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
};

export default SuccessPage;
