import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseOrdersAction, updatePurchaseOrderStatus } from "../../actions/purchaseOrder";
import PurchaseOrderPdf from "../../Components/PurchaseOrderPdf/PurchaseOrderPdf";
import SearchBox from "../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../Components/DropDownSelect/DropDownSelect";
import Modal from "react-bootstrap/Modal";
import { Button, TextField } from "@material-ui/core";
import { colorByStatus } from "../../helpers/piOrdersFunctions";

const PurchaseOrdersAll = () => {
  const { username } = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPurchaseOrdersAction());
  }, []);
  let purchaseOrders = useSelector((state) => state.purchaseOrders.purchaseOrders);
  const [currentPo, setCurrentPo] = useState({});
  const [isPdf, setIsPdf] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [popupClass, setPopupClass] = useState("form-popup hidden");

  /* ------------------------------- searchQuery ------------------------------ */

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    purchaseOrders = purchaseOrders.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (searchQuery.length > 0 && filter.length === 0) {
    purchaseOrders = purchaseOrders.filter((item) => item.pi_no.toString().includes(searchQuery.toLowerCase()));
  }

  const options = [
    { name: "PI Number", value: "pi_no" },
    { name: "Employee", value: "employee" },
    { name: "Buyer", value: "buyerAddress" },
    { name: "Exporter", value: "exporter" },
    { name: "Port of Discharge", value: "portOfDischarge" },
    { name: "Port of Origin", value: "portOfOrigin" },
    { name: "Status", value: "status" },
  ];

  /* -------------------------------------------------------------------------- */
  const handlePDF = (pi) => {
    setCurrentPo(pi);
    setIsPdf(true);
    console.log(isPdf);
  };
  /* -------------------------------------------------------------------------- */
  const handleApprove = (id) => {
    dispatch(
      updatePurchaseOrderStatus({
        id,
        newStatus: "Approved",
        manager: username,
      })
    );
  };

  /* ------------------------------------ . ----------------------------------- */
  const handleReject = (id) => {
    setPopupClass("form-popup showing");
    dispatch(updatePurchaseOrderStatus({ id, newStatus: "Rejected" }));
  };
  /* -------------------------------------------------------------------------- */

  const handleRejectMessage = (event) => {
    event.preventDefault();
    console.log(event.target.rej_msg.value);
    const id = currentPo._id;
    dispatch(
      updatePurchaseOrderStatus({
        id,
        newStatus: "Rejected",
        managerMessage: event.target.rej_msg.value,
        manager: username,
      })
    );
    setPopupClass("form-popup hidden");
    event.target.rej_msg.value = "";
  };

  /* ------------------------------ Delete Modal ------------------------------ */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleConfirmDelete = () => {
    setShow(false);
    // dispatch(deleteProformaInvoiceState(currentPi._id));

    // dispatch(deleteProformaInvoice(currentPi._id));
  };
  const handleShow = () => setShow(true);
  /* -------------------------------------------------------------------------- */

  if (isPdf) {
    return (
      <>
        <div className="next_div" style={{ paddingBottom: "20px" }}>
          <button
            className="ags-btn-main"
            onClick={() => {
              setIsPdf(false);
            }}
          >
            Back
          </button>
        </div>
        <PurchaseOrderPdf po={currentPo} />
      </>
    );
  } else
    return (
      <div >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete PO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete PO : </h4> <h4 style={{ color: "red", textAlign: "center" }}>{currentPo.po_no}</h4>
            <h4 style={{ color: "red" }}> from Exporter : {currentPo?.exporter?.split(".")[0]}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <div className={popupClass} id="myForm">
              <form onSubmit={handleRejectMessage} class="form-container">
                <h1>Reject with note</h1>

                <label for="rej_msg">
                  <b>Rejection message</b>
                </label>
                <input type="text" placeholder="Enter why you reject this proforma invoice" name="rej_msg" autocomplete="on" />

                <button type="submit" class="btn">
                  Send
                </button>
                <button
                  style={{ position: "absolute", right: "23px" }}
                  type="button"
                  class="btn cancel"
                  onClick={() => {
                    setPopupClass("form-popup hidden");
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </>
        <div className="search_container">
          <SearchBox onChange={handleSearchQueryChange}></SearchBox>
          <DropDownSelect onChange={handleFilterChange} options={options} />
        </div>
        <table className="pi__table table table-bordered">
          <thead className="th_style">
            <tr>
              <th scope="col">
                <div className="th_cell_div">#</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Employee</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Exporter</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Customer</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Date/Time</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Status</div>
              </th>
              <th style={{ width: "140px" }} scope="col">
                <div className="th_cell_div"> PDF</div>
              </th>
              <th style={{ width: "225px" }} scope="col">
                <div className="th_cell_div"> Handle</div>
              </th>
              <th style={{ width: "28 0px" }} scope="col">
                <div className="th_cell_div"> Manager Note</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((item, index) => (
              <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                <td scope="row">
                  {" "}
                  <div style={{ fontWeight: "bold" }} className="td_padding">
                    {item.po_no}
                  </div>
                </td>
                <td>
                  <div className="td_padding employee_cell">{item.employee}</div>
                </td>
                <td>
                  <div className="td_padding">{item?.exporter?.split(".")[0]}</div>
                </td>
                <td>
                  <div className="td_padding customer_cell">{item?.buyerAddress?.split(" ")[0]}</div>
                </td>
                <td>
                  <div className="td_padding">{new Date(item.createdAt).toLocaleDateString()}</div>
                </td>
                <td>
                  <div className={colorByStatus(item?.status)}>{item?.status}</div>
                </td>
                <td>
                  <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(item)}>
                    PDF
                  </button>
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    <button
                      type="button"
                      className="button_edit_pdf button_reject"
                      onClick={() => {
                        setCurrentPo(item);
                        handleReject(item._id);
                      }}
                    >
                      Reject
                    </button>
                    <button type="button" className="button_edit_pdf button_approve" onClick={() => handleApprove(item._id)}>
                      Approve
                    </button>
                    <button
                      type="button"
                      className="button_edit_pdf button_delete"
                      onClick={() => {
                        setCurrentPo(item);
                        handleShow();
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
                <td className={""}>{item?.managerMessage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default PurchaseOrdersAll;
