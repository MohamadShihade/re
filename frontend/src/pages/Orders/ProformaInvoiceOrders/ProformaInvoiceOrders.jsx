import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProformaInvoicesAction, updateProformaInvoiceStatus } from "../../../actions/proformaInvoice";
import { changeProformaInvoiceStatus } from "../../../store/proformaInvoicesSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getEmployeeProformaInvoicesAction } from "../../../actions/proformaInvoice";
import useAuth from "../../../hooks/useAuth";
import ProformaInvoice from "../../../Components/PoformaInvoice/ProformaInvoice";
import UploadPdf from "./UploadPdf";
import DownloadPDFButton from "./DownloadPDFButton";
import SearchBox from "../../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../../Components/DropDownSelect/DropDownSelect";

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

const ProformaInvoiceOrders = () => {
  const [isPdf, setIsPdf] = useState(false);
  const [currentPi, setCurrentPi] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const handleLoading = (isLoading) => {
    setIsLoading(isLoading);
  };

  const { username, phone } = useAuth();

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
    dispatch(getEmployeeProformaInvoicesAction(username));
    // const interval = setInterval(() => dispatch(getProformaInvoicesAction()), 10 * 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [dispatch, username]);

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
    dispatch(updateProformaInvoiceStatus({ id, newStatus: "Approved" }));
  };
  const handleReject = (id) => {
    dispatch(updateProformaInvoiceStatus({ id, newStatus: "Rejected" }));
  };
  const handleDelete = (id) => {};
  const handlePDF = (pi) => {
    setCurrentPi(pi);
    setIsPdf(true);
    console.log(isPdf);
  };
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
            {proformaInvoices.map((proformaInvoice, index) => (
              <div className="item-pi">
                <div className="item-pi-tittle">
                  <span>Date / Time</span>
                  <span>{timeAgo(new Date(proformaInvoice.createdAt))}</span>
                </div>
                <div className="item-pi-body">
                  <div class="wrapper">
                    <div class="box a">
                      <p className="text-secondary">Order.No</p>
                      <h6>{proformaInvoice.pi_no}</h6>
                    </div>
                    <div class="box b">
                      <p className="text-secondary">Employee</p>
                      <h6>{proformaInvoice.employee}</h6>
                    </div>
                    <div class="box h">
                      <p className="text-secondary">Status</p>
                      {/* <h6>S/Approved |  F/Approved</h6>   */}
                      <div className={colorByStatus(proformaInvoice?.managerApproval)}>S/{proformaInvoice?.managerApproval}</div>
                      <div className={colorByStatus(proformaInvoice?.financiaApproval)}>F/{proformaInvoice?.financiaApproval}</div>
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
                      <h6>{proformaInvoice.buyer_address}</h6>
                    </div>
                    <div class="box f">
                      <p className="text-secondary">Confirm</p>
                      {/* <button className="ags-btn-pdf-order">Confirmed PI <i class="uil uil-import"></i></button> */}
                      <div className="upload-btns">
                        {/* <label className="ags-btn-pdf-order">Choose File</label>
                <button className="ags-btn-pdf-order">Upload <i class="uil uil-upload"></i></button> */}
                      </div>
                      {proformaInvoice.status === "Signed" ? (
                        <DownloadPDFButton
                          pi_id={proformaInvoice._id}
                          pdfName={`signed_${proformaInvoice.pi_no}_${proformaInvoice.employee}_${proformaInvoice.manager}_${proformaInvoice._id}`}
                        />
                      ) : proformaInvoice.managerApproval === "Approved" && proformaInvoice.financiaApproval === "Approved" ? (
                        <UploadPdf pi={proformaInvoice} setLoading={handleLoading} />
                      ) : (
                        <p>Pending</p>
                      )}
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
                          {proformaInvoice.managerApproval === "Approved" && proformaInvoice.financiaApproval === "Approved" ? (
                            // <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(proformaInvoice)}>
                            //   PI ( pdf )
                            // </button>
                            <button className="ags-btn-reject" onClick={() => handlePDF(proformaInvoice)}>
                              <i class="uil uil-eye"></i>{" "}
                            </button>
                          ) : proformaInvoice.managerApproval === "Rejected" || proformaInvoice.financiaApproval === "Rejected" ? (
                            <>
                              <button className="ags-btn-approve" onClick={() => navigate(`/user/editpi/${proformaInvoice._id}`)}>
                                <i class="uil uil-edit"></i>{" "}
                              </button>
                              <p className="warnning">
                                From {proformaInvoice.financiaApproval === "Rejected" && "Finance :"}
                                {proformaInvoice?.financeMessage + "/"}
                                {proformaInvoice.managerApproval === "Rejected" && "Sales Manger :"}
                                {proformaInvoice?.managerMessage}
                              </p>
                            </>
                          ) : (
                            <>
                              <p>
                                Wating for :{proformaInvoice.managerApproval === "Pending" && " manager approval"} &&nbsp;
                                {proformaInvoice.financiaApproval === "Pending" && "finance approval"}
                              </p>
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
                        <div className="th_cell_div">Signed by Customer</div>
                      </th>
                      <th scope="col">
                        <div className="th_cell_div">Status</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {proformaInvoices.map((proformaInvoice, index) => (
                      <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                        <td>
                          <div style={{ fontWeight: "bold" }} className="td_padding">
                            {proformaInvoice.pi_no}
                          </div>
                        </td>
                        <td>
                          <div className="td_padding employee_cell">{proformaInvoice.employee}</div>
                        </td>
                        <td>
                          <div className="td_padding">{timeAgo(new Date(proformaInvoice.createdAt))}</div>
                        </td>
                        <td>
                          <div className="td_padding customer_cell">{proformaInvoice.buyer_address}</div>
                        </td>
                        <td>
                          <div className="edit-pi-column">
                            {proformaInvoice.managerApproval === "Approved" && proformaInvoice.financiaApproval === "Approved" ? (
                              <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(proformaInvoice)}>
                                PI ( pdf )
                              </button>
                            ) : proformaInvoice.managerApproval === "Rejected" || proformaInvoice.financiaApproval === "Rejected" ? (
                              <>
                                <p style={{ color: "red", padding: 0, margin: 0 }}>
                                  From {proformaInvoice.financiaApproval === "Rejected" && "Finance :"}
                                  {proformaInvoice?.financeMessage + "/"}
                                  {proformaInvoice.managerApproval === "Rejected" && "Sales Manger :"}
                                  {proformaInvoice?.managerMessage}
                                </p>
                                <span onClick={() => navigate(`/user/editpi/${proformaInvoice._id}`)}>
                                  Edit <i class="uil uil-edit"></i>
                                </span>
                              </>
                            ) : (
                              <>
                                Wating for :{proformaInvoice.managerApproval === "Pending" && " manager approval"} &&nbsp;
                                {proformaInvoice.financiaApproval === "Pending" && "finance approval"}
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          {proformaInvoice.status === "Signed" ? (
                            <DownloadPDFButton
                              pi_id={proformaInvoice._id}
                              pdfName={`signed_${proformaInvoice.pi_no}_${proformaInvoice.employee}_${proformaInvoice.manager}_${proformaInvoice._id}`}
                            />
                          ) : proformaInvoice.managerApproval === "Approved" && proformaInvoice.financiaApproval === "Approved" ? (
                            <UploadPdf pi={proformaInvoice} setLoading={handleLoading} />
                          ) : (
                            ""
                          )}
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          <div className={colorByStatus(proformaInvoice?.managerApproval)}>S/{proformaInvoice?.managerApproval}</div>
                          <div className={colorByStatus(proformaInvoice?.financiaApproval)}>F/{proformaInvoice?.financiaApproval}</div>
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

export default ProformaInvoiceOrders;
