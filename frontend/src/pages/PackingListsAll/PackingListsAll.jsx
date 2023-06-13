import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PackingListPdf from "../../Components/PackingListPdf/PackingListPdf";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, TextField } from "@material-ui/core";
import useAuth from "../../hooks/useAuth";
import SearchBox from "../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../Components/DropDownSelect/DropDownSelect";
import { deletePackingList, getPackingListsAction, updatePackingListStatus } from "../../actions/packingList";
import { deletePackingListState } from "../../store/Data/packingListSlice";
import axios from "axios";
import { BASE_URL } from "../../api/index.js";

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

const PackingListsAll = () => {
  const [isPdf, setIsPdf] = useState(false);
  const [currentPkl, setCurrentPkl] = useState({});
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
    dispatch(getPackingListsAction());
  }, [dispatch]);

  let packingLists = useSelector((state) => state.packingLists.packingLists);

  /* ------------------------------- searchQuery ------------------------------ */
  console.log(filter);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    packingLists = packingLists.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (searchQuery.length > 0 && filter.length === 0) {
    packingLists = packingLists.filter((item) => item.pklNo.toString().includes(searchQuery.toLowerCase()));
  }

  const options = [
    { name: "PKL Number", value: "pklNo" },
    { name: "Employee", value: "employee" },
    { name: "Customer", value: "buyerAddress" },
    { name: "Status", value: "status" },
  ];

  /* -------------------------------------------------------------------------- */

  const handleApprove = (id) => {
    dispatch(
      updatePackingListStatus({
        id,
        newStatus: "Approved",
        manager: username,
        managerApproval: "Approved",
      })
    );
  };
  const handleReject = (id) => {
    console.log("rreject");
    setPopupClass("form-popup showing");
    //dispatch(updateProformaInvoiceStatus({id, newStatus : 'Rejected'}))
  };

  const handleRejectMessage = (event) => {
    event.preventDefault();
    console.log(event.target.rej_msg.value);
    const id = currentPkl._id;

    dispatch(
      updatePackingListStatus({
        id,
        newStatus: "Rejected",
        managerMessage: event.target.rej_msg.value,
        managerApproval: "Rejected",
        manager: username,
      })
    );

    setPopupClass("form-popup hidden");
    event.target.rej_msg.value = "";
  };

  const handleDelete = (id) => {};

  const handlePDF = (pkl) => {
    setCurrentPkl(pkl);
    setIsPdf(true);
    console.log(isPdf);
  };

  /* ------------------------------ Delete Modal ------------------------------ */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleConfirmDelete = () => {
    setShow(false);
    dispatch(deletePackingListState(currentPkl._id));

    dispatch(deletePackingList(currentPkl._id));
  };
  const handleShow = () => {
    setShow(true);
  };
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */ /* -------------------------------------------------------------------------- */
  const handleDepartClick = (id) => {
    axios
      .patch(`${BASE_URL}/stock/depart/${id}`)
      .then((response) => {
        //  dispatch(updateSignedProformaInvoiceStatus({ id, status: "CONFIRMED" }));

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
  };

  /* -------------------------------------------------------------------------- */

  if (isPdf) {
    return (
      <>
        <div className="next_div" style={{ paddingBottom: "20px" }}>
          <button
            className="btn_next success_prev"
            onClick={() => {
              setIsPdf(false);
            }}
          >
            PREVIOUS
          </button>
        </div>
        <PackingListPdf pkl={currentPkl} withPrice={true} fake={false} />
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
            <h4>Are you sure you want to delete PI : <span className="required">{currentPkl.pklNo}</span></h4>
            <h4 style={{ color: "red" }}> for Customer : {currentPkl.buyerAddress}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button className="ags-btn-main" onClick={handleClose}>
              Close
            </Button>
            <Button className="ags-btn-main-fill" onClick={handleConfirmDelete}>
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
          {packingLists.map((pkl, index) => (
            <div className="item-pi">
              <div className="item-pi-tittle">
                <span>Date / Time</span>
                <span> {timeAgo(new Date(pkl.updatedAt))}</span>
              </div>
              <div className="item-pi-body">
                <div class="wrapper">
                  <div class="box a">
                    <p className="text-secondary">PI.No</p>
                    <h6>{pkl.pklNo}</h6>
                  </div>
                  <div class="box b">
                    <p className="text-secondary">Employee</p>
                    <h6>{pkl?.employee?.split("/")[0]}</h6>
                  </div>
                  <div class="box c">
                    <p className="text-secondary">Status</p>
                    <h6 className={`status-table-label ${colorByStatus(pkl?.managerApproval)}`}>
                      <i className={`uil uil-${iconByStatus(pkl.managerApproval)}`}></i>
                      {pkl?.managerApproval}
                    </h6>
                  </div>
                  <div class="box d">
                    <p className="text-secondary">PDF</p>
                    {/* <button className="ags-btn-pdf"><i class="uil uil-import"></i></button> */}
                    <button className="ags-btn-pdf" onClick={() => handlePDF(pkl)}>
                      <span>
                        {" "}
                        <i class="uil uil-import"></i>
                      </span>
                    </button>
                  </div>
                  <div class="box e">
                    <p className="text-secondary">Customer</p>
                    <h6>{pkl.buyerAddress}</h6>
                  </div>
                  <div class="box f">
                    <p className="text-secondary">Note</p>
                    <h6> {pkl.financeMessage}</h6>
                  </div>
                  <div class="box g">
                    <p className="text-secondary">Actions</p>
                    <div className="ags-action">
                      <button
                        type="button"
                        className="ags-btn-reject"
                        onClick={() => {
                          setCurrentPkl(pkl);
                          handleReject(pkl._id);
                        }}
                      >
                        <i class="uil uil-times"></i> Reject
                      </button>
                      <button className="ags-btn-approve">
                        <i class="uil uil-check" onClick={() => handleApprove(pkl._id)}></i> Approve
                      </button>
                      {
                        <button
                          className="ags-btn-delete"
                          onClick={() => {
                            setCurrentPkl(pkl);
                            handleShow();
                          }}
                        >
                          <i class="uil uil-trash-alt"></i>Delete
                        </button>
                      }
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
                {packingLists.map((pkl, index) => (
                  <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                    <td scope="row">
                      {" "}
                      <div style={{ fontWeight: "bold" }} className="td_padding">
                        {pkl.pklNo}
                      </div>
                    </td>
                    <td>
                      <div className="employee_cell">{pkl?.employee?.split("/")[0]}</div>
                    </td>
                    <td>
                      <div className="time-update">{timeAgo(new Date(pkl.updatedAt))}</div>
                    </td>
                    <td>
                      <div className=" customer_cell">{pkl.buyerAddress}</div>
                    </td>
                    <td>
                      <div className={`status-table-label ${colorByStatus(pkl?.managerApproval)}`}>
                        <i className={`uil uil-${iconByStatus(pkl?.managerApproval)}`}></i>
                        {pkl?.managerApproval}
                      </div>
                    </td>
                    <td>
                      <button type="button" className="table-btn-pdf" onClick={() => handlePDF(pkl)}>
                        <span>
                          {" "}
                          <i class="uil uil-import"></i>
                        </span>
                      </button>
                    </td>

                    <td>
                      <div className="buttons-pls">
                        <button
                          disabled={pkl.managerApproval === "Rejected"}
                          type="button"
                          className="btn-table-status"
                          onClick={() => {
                            setCurrentPkl(pkl);
                            handleReject(pkl._id);
                          }}
                        >
                          <span>
                            {" "}
                            <i class="uil uil-times"></i>Reject
                          </span>
                        </button>
                        <button
                          disabled={pkl.managerApproval === "Approved"}
                          type="button"
                          className="btn-table-status"
                          onClick={() => handleApprove(pkl._id)}
                        >
                          <span>
                            {" "}
                            <i class="uil uil-check"></i> Approve
                          </span>
                        </button>
                        <button
                          type="button"
                          className="btn-table-status"
                          onClick={() => {
                            setCurrentPkl(pkl);
                            handleShow();
                          }}
                        >
                          <span>
                            <i class="uil uil-trash-alt"></i> Delete
                          </span>
                        </button>
                        {roles.includes("Financial") && (
                          <button
                            type="button"
                            disabled={pkl.pklStatus === "departed"}
                            className="btn-table-status"
                            onClick={() => {
                              handleDepartClick(pkl.piId);
                            }}
                          >
                            <span>
                              <i class="uil uil-trash-alt"></i> Depart
                            </span>
                          </button>
                        )}
                      </div>
                    </td>

                    <td className={colorByUpdate(pkl.createdAt, pkl.updatedAt)}>{pkl.managerMessage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default PackingListsAll;
