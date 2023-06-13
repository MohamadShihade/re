import React from "react";
// import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
// import UploadPdf from "./UploadPdf";
// import DownloadPDFButton from "./DownloadPDFButton";
import SearchBox from "../../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../../Components/DropDownSelect/DropDownSelect";
import { getEmployeePackingListsAction } from "../../../actions/packingList";
import PackingListPdf from "../../../Components/PackingListPdf/PackingListPdf";

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

const PackingListOrders = () => {
  const [isPdf, setIsPdf] = useState(false);
  const [currentPkl, setCurrentPkl] = useState({});
  const [withPrice, setWithPrice] = useState(true);
  const [isFake, setIsFake] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const { username } = useAuth();

  function colorByStatus(status) {
    switch (status) {
      case "Pending":
        return "pending_status";
      case "Signed":
        return "signed_status";
      case "Approved":
        return "success_status";
      case "Rejected":
        return "rejected_status";
      default:
        return "table-secondary";
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployeePackingListsAction(username));
    // const interval = setInterval(() => dispatch(getProformaInvoicesAction()), 10 * 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [dispatch, username]);

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

  const handlePDF = (pkl, withPriceVal, isFakeVal) => {
    setWithPrice(withPriceVal);
    setIsFake(isFakeVal);
    setCurrentPkl(pkl);
    setIsPdf(true);
    console.log(isPdf);
  };
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
        <PackingListPdf pkl={currentPkl} withPrice={withPrice} fake={isFake} />
      </>
    );
  } else
    return (
      <>
        <div className="pi-list">
          <div className="page_container">
            {/* this is search section  */}
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
              <div className="item-pi" key={index}>
                <div className="item-pi-tittle">
                  <span>Date / Time</span>
                  <span>{timeAgo(new Date(pkl.createdAt))}</span>
                </div>
                <div className="item-pi-body">
                  <div class="wrapper">
                    <div class="box a">
                      <p className="text-secondary">Order.No</p>
                      <h6>{pkl.pklNo}</h6>
                    </div>
                    <div class="box b">
                      <p className="text-secondary">Employee</p>
                      <h6>{pkl.employee}</h6>
                    </div>
                    <div class="box h">
                      <p className="text-secondary">Status</p>
                      {/* <h6>S/Approved |  F/Approved</h6>   */}
                      <div className={colorByStatus(pkl?.managerApproval)}>F/{pkl?.managerApproval}</div>
                    </div>
                    {/* <div class="box d">
              <p className="text-secondary">Confirm</p>
                <button className="ags-btn-pdf-order">PI <i class="uil uil-import"></i></button>
                <div className="upload-btns">
                <label className="ags-btn-pdf-order">Choose File</label>
                <button className="ags-btn-pdf-order">Upload <i class="uil uil-upload"></i></button>
                </div>
              </div> */}
                    <div class="box e">
                      <p className="text-secondary">Customer</p>
                      <h6>{pkl.buyerAddress}</h6>
                    </div>

                    <div class="box g">
                      <p className="text-secondary">From manager</p>
                      {/* <h6>
                  
                </h6> */}
                      <div className="ags-action order-actions">
                        {/* <button className="ags-btn-reject" onClick={() => handlePDF(proformaInvoice)}><i class="uil uil-eye"></i> </button> */}
                        {/* <button className="ags-btn-approve" onClick={() => navigate(`/user/editpi/${proformaInvoice._id}`)}><i class="uil uil-edit"></i> </button> */}
                        {/* <button className="ags-btn-delete"><i class="uil uil-trash-alt"></i>Delete</button> */}
                        <div style={{ overflow: "hidden" }}>
                          {pkl.managerApproval === "Approved" ? (
                            // <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(proformaInvoice)}>
                            //   PI ( pdf )
                            // </button>
                            <>
                              <button className="ags-btn-reject" onClick={() => handlePDF(pkl, true, false)}>
                                <i class="uil uil-eye"></i>
                              </button>
                              <button className="ags-btn-reject" onClick={() => handlePDF(pkl, false, false)}>
                                Without Price<i class="uil uil-eye"></i>
                              </button>
                              <button className="ags-btn-reject" onClick={() => handlePDF(pkl, true, true)}>
                                Fake With Price<i class="uil uil-eye"></i>
                              </button>
                            </>
                          ) : pkl.managerApproval === "Rejected" ? (
                            <>
                              <button className="ags-btn-approve" onClick={() => navigate(`/user/editpi/${pkl._id}`)}>
                                <i class="uil uil-edit"></i>
                              </button>
                              <p className="warnning">
                                From {pkl.managerApproval === "Rejected"}
                                {pkl?.managerMessage}
                              </p>
                            </>
                          ) : (
                            <>
                              <p>Wating for : {pkl.managerApproval === "Pending" && "Manager approval"}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              {/* this is custom design only to desktop  */}
              <div className="table-pi-list">
                <table className="pi__table table tabel-orders">
                  <thead>
                    <tr className="th_style">
                      <th scope="col">
                        <div className="th_cell_div">#</div>
                      </th>
                      <th scope="col">
                        <div className="th_cell_div">Employee</div>
                      </th>
                      <th scope="col">
                        <div className="th_cell_div">Date/Time</div>
                      </th>
                      <th scope="col">
                        <div className="th_cell_div">Customer</div>
                      </th>

                      <th scope="col">
                        <div className="th_cell_div">From manager</div>
                      </th>

                      <th scope="col">
                        <div className="th_cell_div">Status</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {packingLists.map((pkl, index) => (
                      <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                        <td>
                          <div style={{ fontWeight: "bold" }} className="td_padding">
                            {pkl.pklNo}
                          </div>
                        </td>
                        <td>
                          <div className="td_padding employee_cell">{pkl.employee}</div>
                        </td>
                        <td>
                          <div className="td_padding">{timeAgo(new Date(pkl.createdAt))}</div>
                        </td>
                        <td>
                          <div className="td_padding customer_cell">{pkl.customer}</div>
                        </td>
                        <td>
                          <div style={{ overflow: "hidden" }}>
                            {pkl.managerApproval === "Approved" ? (
                              <div style={{ display: "flex" }}>
                                <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(pkl, true, false)}>
                                  PKL
                                </button>
                                <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(pkl, false, false)}>
                                  PKL/No
                                </button>{" "}
                                <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(pkl, false, true)}>
                                  PKL/Fake
                                </button>
                              </div>
                            ) : pkl.managerApproval === "Rejected" ? (
                              <>
                                <button
                                  type="button"
                                  className="button_edit_pdf button_edit"
                                  onClick={() => navigate(`/user/editpi/${pkl._id}`)}
                                >
                                  Edit
                                </button>
                                <p style={{ color: "red", padding: 0, margin: 0 }}>
                                  From {pkl.managerApproval === "Rejected"}
                                  {pkl?.managerMessage + "/"}
                                </p>
                              </>
                            ) : (
                              <>Wating for :&nbsp; {pkl.managerApproval === "Pending" && "manager approval"}</>
                            )}
                          </div>
                        </td>

                        <td style={{ fontSize: "12px" }}>
                          <div className={colorByStatus(pkl?.managerApproval)}>{pkl?.managerApproval}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default PackingListOrders;
