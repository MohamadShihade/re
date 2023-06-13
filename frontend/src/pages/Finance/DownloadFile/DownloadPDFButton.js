import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/index";

function DownloadPDFButton({ paymentId, pdfName }) {
  const [loading, setLoading] = useState(false);
  /* ------------------------- handle pdf button click ------------------------ */
  const handleClick = () => {
    setLoading(true);
    axios({
      url: `${BASE_URL}/pi/downloadpayment/${paymentId}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${pdfName}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  /* -------------------------------------------------------------------------- */
  return (
    <button
      className="btn btn-primary"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Downloading..." : "PDF"}
    </button>
  );
}

export default DownloadPDFButton;
