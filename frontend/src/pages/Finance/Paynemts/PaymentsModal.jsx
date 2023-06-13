import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./PaymentsModal.css";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { colorByStatus, formatDate } from "../../../helpers/piOrdersFunctions";
import DownloadPDFButton from "../DownloadFile/DownloadPDFButton";
import FileUploadForm from "./FileUploadForm";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../../../helpers/toaster";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",

    transform: "translate(-50%, -50%)",
  },
};

function PaymentsTable(props) {
  return (
    <table className="payments_table table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date/Time</th>
          <th scope="col">Amount</th>
          <th scope="col">PDF file</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((payment, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{formatDate(payment.createdAt)}</td>
            <td>{parseFloat(payment.amount)?.toFixed(2)}</td>
            <td>
              <DownloadPDFButton
                paymentId={payment._id}
                pdfName={`inovice_${index + 1}_${props.pi_no}_${formatDate(payment.createdAt)}_${payment.customer}`}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total Paid</td>
          <td>{props.total?.toFixed(2)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}

const PaymentsModal = ({ pi }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);

  let total = 0;
  data.forEach((item, i) => {
    total += parseFloat(item.amount);
  });

  function openModal() {
    setIsOpen(true);
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/pi/payment/${pi.pi_id}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <ToastContainer />
      <div className="buttons-finance">
        <button className="ags-btn-sucess-fill" onClick={openModal}>
          Payments
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {" "}
        <button class="btn-close close__button" onClick={closeModal}></button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>All payments for pi number {pi.pi_no}</h2>
        {!isLoading ? <PaymentsTable data={data} total={total} pi_no={pi.pi_no}></PaymentsTable> : <h1>LOADING</h1>}
        <div>
          <button
            className="new_payment"
            onClick={() => {
              setShowAddPaymentForm((currentState) => !currentState);
            }}
          >
            {!showAddPaymentForm ? "Add Payment" : "Close"}{" "}
          </button>
        </div>
        {showAddPaymentForm && (
          <FileUploadForm
            pi={pi}
            setShowNewPaymentForm={setShowAddPaymentForm}
            toastWithMessage={() => {
              showToastMessage();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default PaymentsModal;
