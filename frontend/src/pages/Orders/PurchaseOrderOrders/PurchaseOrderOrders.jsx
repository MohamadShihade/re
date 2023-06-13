import React, { useEffect, useState } from "react";
import "./PurchaseOrderOrders.css";
import SearchBox from "../../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../../Components/DropDownSelect/DropDownSelect";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeePurchaseOrdersAction } from "../../../actions/purchaseOrder";
import useAuth from "../../../hooks/useAuth";
import PurchaseOrderPdf from "../../../Components/PurchaseOrderPdf/PurchaseOrderPdf";
import { colorByStatus } from "../../../helpers/piOrdersFunctions";
const PurchaseOrderOrders = () => {
  const { username } = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeePurchaseOrdersAction(username));
  }, []);
  let purchaseOrders = useSelector((state) => state.purchaseOrders.purchaseOrders);
  const [currentPo, setCurrentPo] = useState({});
  const [isPdf, setIsPdf] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
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
          <thead>
            <tr className="th_style">
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
            {purchaseOrders?.map((item, index) => (
              <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                <td>
                  <div style={{ fontWeight: "bold" }} className="td_padding">
                    {item.po_no}
                  </div>
                </td>
                <td>
                  <div className="td_padding employee_cell">{item.employee}</div>
                </td>
                <td>
                  <div className="td_padding customer_cell">{item?.exporter?.split(".")[0]}</div>
                </td>
                <td>
                  <div className="td_padding customer_cell">{item?.buyerAddress?.split(".")[0]}</div>
                </td>
                <td>
                  <div className="td_padding">{new Date(item.createdAt).toLocaleDateString()}</div>
                </td>
                <td>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ overflow: "hidden" }}>
                      {item.status === "Approved" || item.status === "Signed" ? (
                        <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(item)}>
                          PI ( pdf )
                        </button>
                      ) : item.status === "Rejected" ? (
                        <>
                          <p >{"Rejected"}</p>
                        </>
                      ) : (
                        "Waiting for manager approval"
                      )}
                    </div>
                  </div>
                </td>
                <td>55</td>
                <td className={colorByStatus(item?.status)}>
                  <div>{purchaseOrders?.status}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default PurchaseOrderOrders;
