import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProformaInvoicesAction,
  getSignedEmployeeProformaInvoicesAction,
  updateProformaInvoiceStatus,
} from "../../../actions/proformaInvoice";
import { changeProformaInvoiceStatus } from "../../../store/proformaInvoicesSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getEmployeeProformaInvoicesAction } from "../../../actions/proformaInvoice";
import useAuth from "../../../hooks/useAuth";
import ProformaInvoice from "../../../Components/PoformaInvoice/ProformaInvoice";
import UploadPdf from "../ProformaInvoiceOrders/UploadPdf";
import DownloadPDFButton from "../ProformaInvoiceOrders/DownloadPDFButton";
import StatusTracker from "./StatusTracker";
import StatusSelect from "./StatusSelect";
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

const SignedProformaInvoices = () => {
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
        return "table-secondary";
      case "Signed":
        return "table-info";
      case "Approved":
        return "table-success";
      case "Rejected":
        return "table-danger";
      default:
        return "table-secondary";
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSignedEmployeeProformaInvoicesAction(username));
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
      <div className="page_container">
        <div className="search_container">
          {/* this is search section  */}
          <div className="row">
            <div className="col-lg-6 col-md12">
              <SearchBox onChange={handleSearchQueryChange}></SearchBox>
            </div>
            <div className="col-lg-6 col-md12">
              <DropDownSelect onChange={handleFilterChange} options={options} />
            </div>
          </div>
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
                <div className="th_cell_div">Approved by</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Date/Time</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Customer</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Signed by Customer</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Action</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Progress</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {proformaInvoices.map((proformaInvoice, index) => (
              <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                <td scope="row">
                  <div style={{ fontWeight: "bold" }} className="td_padding">
                    {proformaInvoice.pi_no}
                  </div>
                </td>
                <td>
                  <div className="td_padding employee_cell">{proformaInvoice.employee}</div>
                </td>
                <td>
                  {" "}
                  <div className="td_padding">{proformaInvoice.manager}</div>
                </td>
                <td>
                  {" "}
                  <div className="td_padding">{timeAgo(new Date(proformaInvoice.createdAt))}</div>
                </td>
                <td>
                  <div className="td_padding customer_cell">{proformaInvoice.buyer_address}</div>
                </td>
                <td>
                  <DownloadPDFButton
                    pi_id={proformaInvoice.pi_id}
                    pdfName={`signed_${proformaInvoice.pi_no}_${proformaInvoice.employee}_${proformaInvoice.manager}_${proformaInvoice.pi_id}`}
                  />
                </td>
                <td>
                  <StatusSelect pi={proformaInvoice} />
                </td>
                <td>
                  <StatusTracker pi={proformaInvoice} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default SignedProformaInvoices;
