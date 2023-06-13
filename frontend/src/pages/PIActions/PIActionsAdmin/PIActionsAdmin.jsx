import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProformaInvoice,
  getProformaInvoicesAction,
  updateProformaInvoiceStatus,
  updateSignedProformaInvoiceStatus,
} from "../../../actions/proformaInvoice";
import { changeProformaInvoiceStatus, deleteProformaInvoiceState } from "../../../store/proformaInvoicesSlice";
import { useNavigate } from "react-router-dom";
import ProformaInvoice from "../../../Components/PoformaInvoice/ProformaInvoice";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import SearchBox from "../../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../../Components/DropDownSelect/DropDownSelect";
import Modal from "react-bootstrap/Modal";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { BASE_URL } from "../../../api/index.js";

// Define a function that takes a date as an argument
// and returns a string that represents how long ago the date was
export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " seconds ago";
};

const PIActionsAdmin = () => {
  const [isPdf, setIsPdf] = useState(false);
  const [currentPi, setCurrentPi] = useState({});
  const [popupClass, setPopupClass] = useState("form-popup hidden");
  const { username, roles } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  function colorByStatus(status) {
    switch (status) {
      case "Pending":
        return "pending_status";
      case "Approved":
        return "success_status";
      case "Rejected":
        return "rejected_status";
      default:
        return "table-secondary";
    }
  }

  function iconByStatus(status) {
    switch (status) {
      case "Pending":
        return "sync";
      case "Approved":
        return "check";
      case "Rejected":
        return "times";
      default:
        return "times";
    }
  }
  function colorByUpdate(createdAt, updatedAt) {
    const status = createdAt === updatedAt;
    switch (status) {
      case true:
        return "table-secondary";
      case false:
        return "table-success";
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProformaInvoicesAction());
  }, [dispatch]);

  let proformaInvoices = useSelector((state) => state.proformaInvoices.proformaInvoices);

  /* ------------------------------- searchQuery ------------------------------ */
  console.log(filter);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    proformaInvoices = proformaInvoices.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (searchQuery.length > 0 && filter.length === 0) {
    proformaInvoices = proformaInvoices.filter((item) => item.pi_no.toString().includes(searchQuery.toLowerCase()));
  }

  const options = [
    { name: "PI Number", value: "pi_no" },
    { name: "Employee", value: "employee" },
    { name: "Customer", value: "buyer_address" },
    { name: "Status", value: "status" },
  ];

  /* -------------------------------------------------------------------------- */

  const handleApprove = (id) => {
    if (roles.includes("Financial")) {
      dispatch(
        updateProformaInvoiceStatus({
          id,
          // newStatus: "Approved",
          finally: username,
          financiaApproval: "Approved",
        })
      );
    } else {
      dispatch(
        updateProformaInvoiceStatus({
          id,
          //  newStatus: "Approved",
          manager: username,
          managerApproval: "Approved",
        })
      );
    }
    dispatch(getProformaInvoicesAction());
  };
  const handleReject = (id) => {
    console.log("rreject");
    setPopupClass("form-popup showing");
    //dispatch(updateProformaInvoiceStatus({id, newStatus : 'Rejected'}))
  };

  const handleRejectMessage = (event) => {
    event.preventDefault();
    console.log(event.target.rej_msg.value);
    const id = currentPi._id;
    if (roles.includes("Financial")) {
      dispatch(
        updateProformaInvoiceStatus({
          id,
          financeMessage: event.target.rej_msg.value,
          financiaApproval: "Rejected",
          finance: username,
        })
      );
    } else
      dispatch(
        updateProformaInvoiceStatus({
          id,
          managerMessage: event.target.rej_msg.value,
          managerApproval: "Rejected",
          manager: username,
        })
      );
    setPopupClass("form-popup hidden");
    event.target.rej_msg.value = "";
    dispatch(getProformaInvoicesAction());
  };

  const handleDelete = (id) => {};

  const handlePDF = (pi) => {
    setCurrentPi(pi);
    setIsPdf(true);
    console.log(isPdf);
  };

  /* ------------------------------ Delete Modal ------------------------------ */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleConfirmDelete = () => {
    setShow(false);
    dispatch(deleteProformaInvoiceState(currentPi._id));

    dispatch(deleteProformaInvoice(currentPi._id));
    dispatch(getProformaInvoicesAction());
  };
  const handleShow = () => {
    setShow(true);
  };
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  const handleBookClick = (id) => {
    axios
      .patch(`${BASE_URL}/stock/book/${id}`)
      .then((response) => {
        //  dispatch(updateSignedProformaInvoiceStatus({ id, status: "BOOKED" }));

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
    dispatch(getProformaInvoicesAction());
  };
  /* -------------------------------------------------------------------------- */ /* -------------------------------------------------------------------------- */
  const handleUnBookClick = (id) => {
    axios
      .patch(`${BASE_URL}/stock/unbook/${id}`)
      .then((response) => {
        dispatch(updateSignedProformaInvoiceStatus({ id, status: "CONFIRMED" }));

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
    dispatch(getProformaInvoicesAction());
  };

  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */ /* -------------------------------------------------------------------------- */

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
        <ProformaInvoice adminPi={currentPi} />
      </>
    );
  } else
    return (
      <>
        {" "}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete PI</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Are you sure you want to delete PI : <span className="required">{currentPi.pi_no}</span></h5>
            <h5> for customer : <span className="required"> {currentPi.buyer_address} </span></h5>
          </Modal.Body>
          <Modal.Footer>
            <div className="buttons-modal">
            <button className="ags-btn-main" onClick={handleClose}>
              Close
            </button>
             <button className="ags-btn-main-fill" onClick={handleConfirmDelete}>
              Delete
            </button>
            </div>
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
        <div className="pi-list">
          {/* this is seach section in all show PI  */}
          <div className="search_container">
            <div className="row">
              <div className="col-lg-6 col-md12">
                <SearchBox onChange={handleSearchQueryChange}></SearchBox>
              </div>
              <div className="col-lg-6 col-md12">
                <DropDownSelect onChange={handleFilterChange} options={options} />
              </div>
            </div>
          </div>
          {/* this is custom design only to Mobile  */}
          {proformaInvoices.map((proformaInvoice, index) => (
            <div className="item-pi">
              <div className="item-pi-tittle">
                <span>Date / Time</span>
                <span> {timeAgo(new Date(proformaInvoice.updatedAt))}</span>
              </div>
              <div className="item-pi-body">
                <div class="wrapper">
                  <div class="box a">
                    <p className="text-secondary">PI.No</p>
                    <h6>{proformaInvoice.pi_no}</h6>
                  </div>
                  <div class="box b">
                    <p className="text-secondary">Employee</p>
                    <h6>{proformaInvoice?.employee?.split("/")[0]}</h6>
                  </div>
                  <div class="box c">
                    <p className="text-secondary">Status</p>
                    <h6
                      className={`status-table-label ${colorByStatus(
                        roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval
                      )}`}
                    >
                      <i
                        className={`uil uil-${iconByStatus(
                          roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval
                        )}`}
                      ></i>
                      {roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval}
                    </h6>
                  </div>
                  <div class="box d">
                    <p className="text-secondary">PDF</p>
                    {/* <button className="ags-btn-pdf"><i class="uil uil-import"></i></button> */}
                    <button className="ags-btn-pdf" onClick={() => handlePDF(proformaInvoice)}>
                      <span>
                        {" "}
                        <i class="uil uil-import"></i>
                      </span>
                    </button>
                  </div>
                  <div class="box e">
                    <p className="text-secondary">Customer</p>
                    <h6>{proformaInvoice.buyer_address}</h6>
                  </div>
                  <div class="box f">
                    <p className="text-secondary">Note</p>
                    <h6> {proformaInvoice.managerMessage}</h6>
                  </div>
                  <div class="box g">
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
                        <i class="uil uil-check" onClick={() => handleApprove(proformaInvoice._id)}></i> Approve
                      </button>
                      {!roles.includes("Financial") && (
                        <>
                          <button
                            className="ags-btn-delete"
                            onClick={() => {
                              setCurrentPi(proformaInvoice);
                              handleShow();
                            }}
                          >
                            <i class="uil uil-trash-alt"></i>Delete
                          </button>
                        </>
                      )}
                      {roles.includes("Financial") && (
                        <>
                          <button
                            type="button"
                            disabled={proformaInvoice.stockStatus === "booked"}
                            className="ags-btn-delete"
                            onClick={() => {
                              handleBookClick(proformaInvoice._id);
                            }}
                          >
                            <span>
                              <i class="uil "></i> Book
                            </span>
                          </button>
                          <button
                            type="button"
                            disabled={proformaInvoice.stockStatus === "notBooked"}
                            className="ags-btn-delete"
                            onClick={() => {
                              handleUnBookClick(proformaInvoice._id);
                            }}
                          >
                            <span>
                              <i class="uil "></i> Unbook
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* this is custom design only to Desktop  */}
          <div className="table-pi-list">
            <table className="pi__table table table-bordered">
              <thead className="th_style">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Employee</th>
                  <th scope="col">Date/Time</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Status</th>
                  <th style={{ width: "140px" }} scope="col">
                    PDF
                  </th>
                  <th style={{ width: "225px" }} scope="col">
                    Handle
                  </th>
                  <th style={{ width: "28 0px" }} scope="col">
                    Manager Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {proformaInvoices.map((proformaInvoice, index) => (
                  <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                    <td scope="row">
                      {" "}
                      <div style={{ fontWeight: "bold" }} className="td_padding">
                        {proformaInvoice.pi_no}
                      </div>
                    </td>
                    <td>
                      <div className="employee_cell">{proformaInvoice?.employee?.split("/")[0]}</div>
                    </td>
                    <td>
                      <div className="time-update">{timeAgo(new Date(proformaInvoice.updatedAt))}</div>
                    </td>
                    <td>
                      <div className=" customer_cell">{proformaInvoice.buyer_address}</div>
                    </td>
                    <td>
                      <div
                        className={`status-table-label ${colorByStatus(
                          roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval
                        )}`}
                      >
                        <i
                          className={`uil uil-${iconByStatus(
                            roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval
                          )}`}
                        ></i>
                        {roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval}
                      </div>
                    </td>
                    <td>
                      <button type="button" className="table-btn-pdf" onClick={() => handlePDF(proformaInvoice)}>
                        <span>
                          {" "}
                          <i class="uil uil-import"></i>
                        </span>
                      </button>
                    </td>
                    {roles.includes("Financial") && proformaInvoice.managerApproval !== "Approved" ? (
                      <td>
                        <div>Waiting for Sales M Approval</div>
                      </td>
                    ) : (
                      <td>
                        <div className="buttons-pls">
                          <button
                            type="button"
                            className="btn-table-status"
                            onClick={() => {
                              setCurrentPi(proformaInvoice);
                              handleReject(proformaInvoice._id);
                            }}
                          >
                            <span>
                              {" "}
                              <i class="uil uil-times"></i>Reject
                            </span>
                          </button>
                          <button type="button" className="btn-table-status" onClick={() => handleApprove(proformaInvoice._id)}>
                            <span>
                              {" "}
                              <i class="uil uil-check"></i> Approve
                            </span>
                          </button>
                          {!roles.includes("Financial") && (
                            <button
                              type="button"
                              className="btn-table-status"
                              onClick={() => {
                                setCurrentPi(proformaInvoice);
                                handleShow();
                              }}
                            >
                              <span>
                                <i class="uil uil-trash-alt"></i> Delete
                              </span>
                            </button>
                          )}{" "}
                          {roles.includes("Financial") && (
                            <>
                              <button
                                type="button"
                                disabled={proformaInvoice.stockStatus === "booked"}
                                className="btn-table-status"
                                onClick={() => {
                                  handleBookClick(proformaInvoice._id);
                                }}
                              >
                                <span>
                                  <i class="uil "></i> Book
                                </span>
                              </button>
                              <button
                                type="button"
                                disabled={proformaInvoice.stockStatus === "notBooked"}
                                className="btn-table-status"
                                onClick={() => {
                                  handleUnBookClick(proformaInvoice._id);
                                }}
                              >
                                <span>
                                  <i class="uil "></i> Unbook
                                </span>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                    <td className={colorByUpdate(proformaInvoice.createdAt, proformaInvoice.updatedAt)}>
                      {proformaInvoice.managerMessage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default PIActionsAdmin;
