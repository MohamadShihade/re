import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLastPiNo } from "../../actions/proformaInvoice.js";

import { FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@material-ui/core";
import * as api from "../../api/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeliveryDate,
  setPaymentPercentage,
  setPiAdditions,
  setPiBankDetails,
  setPiBuyerAdress,
  setPiConsignee,
  setPICurrencyLocation,
  setPiDiscount,
  setPiExporter,
  setPiFinalDistination,
  setPiInfo,
  setPinNotifyParty,
  setPiNo,
  setPiNote,
  setPiPartyOfDischarge,
  setPiPhoneNumber,
  setPiTerms,
} from "../../store/piSlice";
import {
  bank_details,
  exporters,
  final_distination,
  notify_partys,
  party_of_discharge,
  terms_and_conditions,
  terms_and_conditions_pricelist,
  terms_collections,
} from "./data";

function InvoiceInfo() {
  const navigate = useNavigate();
  const pi = useSelector((state) => state.pi.isPi);
  const dispatch = useDispatch();
  const [piNoState, setPiNoState] = useState(0);
  const [paymentPercentageState, setPaymentPercentageState] = useState(useSelector((state) => state.pi.piInfo?.paymentPercentage));
  const [deliveryDateState, setDeliveryDateState] = useState(useSelector((state) => state.pi.piInfo?.deliveryDate));
  const invoiceNumber = useSelector((state) => state.pi.piInfo.invoiceNo);
  const currency = useSelector((state) => state.filters.currency);
  const location = useSelector((state) => state.filters.location);

  let terms_and_conditions_pi_pricelist = [];
  if (pi) {
    terms_and_conditions_pi_pricelist = terms_and_conditions;
  } else terms_and_conditions_pi_pricelist = terms_and_conditions_pricelist;
  useEffect(() => {
    dispatch(getLastPiNo());
  }, []);
  const [exporter, setExporter] = useState("");
  const [invoiceInfo, setInvoiceInfo] = useState({
    //   piProducts: [],
    invoiceNo: useSelector((state) => state.pi.piInfo.invoiceNo),
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
    exporter: useSelector((state) => state.pi.piInfo.exporter),
    buyerAdress: useSelector((state) => state.pi.piInfo.buyerAdress),
    consignee: useSelector((state) => state.pi.piInfo.consignee),
    notifyParty: useSelector((state) => state.pi.piInfo.notifyParty),
    partyOfDischarge: useSelector((state) => state.pi.piInfo.partyOfDischarge),
    finalDistination: useSelector((state) => state.pi.piInfo.finalDistination),
    discount: useSelector((state) => state.pi.piInfo.discount),
    additions: useSelector((state) => state.pi.piInfo.additions),
    phoneNumber: useSelector((state) => state.pi.piInfo.phoneNumber),
    note: useSelector((state) => state.pi.piInfo.note),
    terms: useSelector((state) => state.pi.piInfo.terms),
    bankDetails: useSelector((state) => state.pi.piInfo.bankDetails),
    location: location,
    currency: currency,
  });
  const [terms, setTerms] = useState(useSelector((state) => state?.pi.piInfo.terms));
  const [bankDetailsCollection, setBankDetailsCollection] = useState(useSelector((state) => state?.pi?.piInfo?.bankDetails));

  /* ------------------------------ data handling ------------------------------ */

  const handleChange = (event) => {
    // dispatch(getLastPiNo());
    setInvoiceInfo({ ...invoiceInfo, [event.target.name]: event.target.value });
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    switch (propertyName) {
      case "exporter":
        dispatch(setPiExporter(propertyValue));
        break;
      case "buyerAdress":
        dispatch(setPiBuyerAdress(propertyValue));
        break;
      case "phoneNumber":
        dispatch(setPiPhoneNumber(propertyValue));
        break;
      case "consignee":
        dispatch(setPiConsignee(propertyValue));
        break;
      case "notifyParty":
        dispatch(setPinNotifyParty(propertyValue));
        break;
      case "partyOfDischarge":
        dispatch(setPiPartyOfDischarge(propertyValue));
        break;
      case "finalDistination":
        dispatch(setPiFinalDistination(propertyValue));
        break;
      case "discount":
        dispatch(setPiDiscount(propertyValue));
        break;
      case "additions":
        dispatch(setPiAdditions(propertyValue));
        break;
      case "terms":
        dispatch(setPiTerms(propertyValue));
        break;
      case "note":
        dispatch(setPiNote(propertyValue));
        break;

      default:
        break;
    }
    //dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, [event.target.name]: event.target.value }));
  };
  const handelTermsChange = (e) => {
    dispatch(setPaymentPercentage(paymentPercentageState));
  };
  const handelDeliveryDateChange = (e) => {
    dispatch(setDeliveryDate(deliveryDateState));
  };
  const handelBankDetailsChange = (e) => {
    const { value, checked } = e.target;
    let newBankDetails = [...invoiceInfo.bankDetails];
    if (checked) {
      newBankDetails.push(value);
      //  setInputs(values => ({...values, bankDetails: newBankDetails}))
      setInvoiceInfo((values) => ({ ...values, bankDetails: newBankDetails }));
      dispatch(setPiBankDetails(newBankDetails));
    } else {
      //  setInputs(values => ({...values, bankDetails: inputs.bankDetails.filter((e) => e !== value)}))
      setInvoiceInfo((values) => ({ ...values, bankDetails: newBankDetails.filter((e) => e !== value) }));
      dispatch(setPiBankDetails(newBankDetails.filter((e) => e !== value)));
    }
  };

  const handleCollectionChange = (e) => {
    const { value } = e.target;
    setTerms(value);
    dispatch(setPiTerms(value));
  };
  /* ---------------------------- end data handling --------------------------- */

  // const invoiceNo = useSelector((state)=>state.pi.piInfo.invoiceNo) console.log();
  return (
    <>
      {/* new form */}
      <div className="card-add-product">
        <div className="card-add-product-tittle">{pi ? <h3> Add PI</h3> : <h3> Quotation</h3>}</div>
        <div className="card-add-product-body">
          <form autoComplete="off" noValidate onSubmit={handelTermsChange}>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label htmlFor="exporter">
                    Exporter <span className="required">*</span>{" "}
                  </label>
                  <select class="form-select " id="exporter" value={invoiceInfo.exporter} name="exporter" onChange={handleChange}>
                    <option disabled selected value="">
                      Choose Exporter{" "}
                    </option>
                    {exporters.map((exporter) => (
                      <option key={exporter.name} value={exporter.value}>
                        {exporter.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label htmlFor="buyer_address">
                    Buyer Address <span className="required">*</span>
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    name="buyerAdress"
                    value={invoiceInfo.buyerAdress}
                    onChange={handleChange}
                    autocomplete="on"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    class="form-control"
                    type="text"
                    name="phoneNumber"
                    value={invoiceInfo.phoneNumber}
                    onChange={handleChange}
                    autocomplete="on"
                  />
                </div>
              </div>
              {pi && (
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label htmlFor="consignee">
                      Consignee <span className="required">*</span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      name="consignee"
                      value={invoiceInfo.consignee}
                      onChange={handleChange}
                      autocomplete="on"
                    />
                  </div>
                </div>
              )}
              {pi && (
                <>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label htmlFor="notify_party">
                        Notify Party <span className="required">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="notify_party"
                        name="notifyParty"
                        value={invoiceInfo.notifyParty}
                        onChange={handleChange}
                      >
                        <option disabled selected value="">
                          Choose Notify Party{" "}
                        </option>
                        {notify_partys.map((notifyparty) => (
                          <option key={notifyparty.name} value={notifyparty.value}>
                            {notifyparty.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-group">
                      <label htmlFor="party_discharge">
                        Party of Discharge <span className="required">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="notify_party"
                        name="partyOfDischarge"
                        value={invoiceInfo.partyOfDischarge}
                        onChange={handleChange}
                      >
                        <option disabled selected value="">
                          Choose Party of Discharge{" "}
                        </option>
                        {party_of_discharge.map((notifyparty) => (
                          <option key={notifyparty.name} value={notifyparty.value}>
                            {notifyparty.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-group">
                      <label htmlFor="party_discharge">Party of Discharge </label>
                      {/* <input class="form-control " id="productCode" type="text"  onChange={(e) => setProductData({ ...productData, code: e.target.value })} placeholder="Enter product code"  /> */}
                      <input
                        class="form-control"
                        type="text"
                        id="party_discharge"
                        name="partyOfDischarge"
                        value={invoiceInfo.partyOfDischarge}
                        onChange={handleChange}
                        autocomplete="on"
                      />{" "}
                    </div>
                  </div>
                </>
              )}
              <div className="col-lg-3 col-md-12">
                <div className="form-group">
                  <label htmlFor="final_distenation">
                    Final Distenation <span className="required">*</span>
                  </label>
                  <select
                    class="form-select "
                    id="exporter"
                    value={invoiceInfo.finalDistination}
                    name="finalDistination"
                    onChange={handleChange}
                  >
                    <option disabled selected value="">
                      Choose Final Distenation{" "}
                    </option>
                    {final_distination.map((dest) => (
                      <option key={dest.name} value={dest.value}>
                        {dest.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="form-group">
                  <label htmlFor="final_distenation">Final Distenation</label>
                  <input
                    class="form-control"
                    type="text"
                    id="discount"
                    name="finalDistination"
                    value={invoiceInfo.finalDistination}
                    onChange={handleChange}
                    autocomplete="on"
                  />
                </div>
              </div>
              {pi && (
                <>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-group">
                      <label htmlFor="phone_number">PI Number </label>
                      <input
                        class="form-control"
                        type="text"
                        readOnly
                        name="invoiceNo"
                        value={invoiceNumber}
                        onChange={handleChange}
                        autocomplete="on"
                      />
                    </div>
                  </div>
                 <div className="col-lg-3 col-md-12">
                    <div className="form-group">
                      <label htmlFor="date">Date</label>
                      <input class="form-control" readOnly type="text" name="date" value={invoiceInfo.date} autocomplete="on" />
                    </div>
                </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-group">
                      <label htmlFor="phone_number">Discount</label>
                      <input
                        class="form-control"
                        type="text"
                        name="discount"
                        value={invoiceInfo.discount}
                        onChange={handleChange}
                        autocomplete="on"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-group">
                      <label htmlFor="phone_number">Additions</label>
                      <input
                        class="form-control"
                        type="text"
                        name="additions"
                        value={invoiceInfo.additions}
                        onChange={handleChange}
                        autocomplete="on"
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label htmlFor="note">Note</label>
                  <input name="note" className="form-control" row="1" value={invoiceInfo.note} onChange={handleChange} autocomplete="on" />
                </div>
              </div>
              {pi && (
                <>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label htmlFor="terms">
                        Terms Collections <span className="required">*</span>{" "}
                      </label>{" "}
                      <br />
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleCollectionChange}
                        value={terms}
                      >
                        <FormControlLabel value="EXWAREHOUSE" control={<Radio />} label="EXWAREHOUSE" />
                        <FormControlLabel value="FOB" control={<Radio />} label="FOB" />
                        <FormControlLabel value="CIF" control={<Radio />} label="CIF" />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label htmlFor="terms">
                        Bank Details <span className="required">*</span>{" "}
                      </label>{" "}
                      <br />
                      {/* <div class="form-check">
                <input class="form-check-input" type="radio" name="row-radio-buttons-group"  onChange={handleCollectionChange} id="flexRadioDefault1"/>
                <label class="form-check-label" for="flexRadioDefault1">
                Exwarehouse
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="row-radio-buttons-group"  onChange={handleCollectionChange} id="flexRadioDefault2" />
                <label class="form-check-label" for="flexRadioDefault2">
                FOB
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="row-radio-buttons-group"  onChange={handleCollectionChange} id="flexRadioDefault3" />
                <label class="form-check-label" for="flexRadioDefault2">
                CIF
                </label>
              </div> */}
                      {bank_details.map((item, i) => (
                        <div className="form-check " key={i}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="bank"
                            checked={invoiceInfo.bankDetails?.includes(item.collection)}
                            value={item.collection}
                            id="flexCheckDefault"
                            onChange={handelBankDetailsChange}
                            autocomplete="on"
                          />
                          <strong className="form-check-label" htmlFor="flexCheckDefault">
                            {item.collection}
                          </strong>
                        </div>
                      ))}
                    </div>
                    {/* 
                <div>
                  <div style={{ display: "flex", flexDirection: "row" }} className="col-md-12">
                    {bank_details.map((item, i) => (
                      <div className="form-check m-3" key={i}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="bank"
                          checked={invoiceInfo.bankDetails?.includes(item.collection)}
                          value={item.collection}
                          id="flexCheckDefault"
                          onChange={handelBankDetailsChange}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          {item.collection}
                        </label>
                      </div>
                    ))}
                  </div>
                </div> */}
                  </div>
                </>
              )}
              {pi && (
                <>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label htmlFor="goods">
                        Goods delivered in <span className="required">*</span>
                      </label>
                      <div class="input-group ">
                        {/* <span class="input-group-text" id="basic-addon3">Goods will be delivered with in <b>{deliveryDateState}</b> days after completion of full payment</span> */}
                        <input
                          type="text"
                          class="form-control"
                          value={deliveryDateState}
                          onBlur={handelDeliveryDateChange}
                          onChange={(e) => {
                            setDeliveryDateState(e.target.value);
                          }}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Tooltip on top"
                          autocomplete="on"
                        />
                      </div>
                      <small class="class-secondary">
                        Goods will be delivered with in <b>{deliveryDateState}</b> days after completion of full payment
                      </small>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label htmlFor="payment">
                        Advance Payment <span className="required">*</span>
                      </label>
                      {/* <input name="note" className="form-control"  value={invoiceInfo.note} onChange={handleChange} /> */}
                      <div class="input-group ">
                        {/* <span class="input-group-text" id="basic-addon3"> <b>{paymentPercentageState}%</b> Balance to be paid (time providing copy of BL/before goods dispatch)</span> */}
                        <input
                          type="text"
                          class="form-control"
                          value={paymentPercentageState}
                          onBlur={handelTermsChange}
                          onChange={(e) => {
                            setPaymentPercentageState(e.target.value);
                          }}
                          autocomplete="on"
                        />
                      </div>
                      <small class="class-secondary">
                        {" "}
                        Advance Payment <b>{paymentPercentageState}%</b> Balance to be paid (time providing copy of BL/before goods
                        dispatch)
                      </small>
                    </div>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* old form */}
      {/* <React.Fragment>
      <Grid container spacing={4}>
        <Grid style={{ paddingBottom: "30px" }} item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">EXPORTER</InputLabel>
            <Select
              name="exporter"
              value={invoiceInfo.exporter}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {exporters.map((exporter) => (
                <MenuItem key={exporter.name} value={exporter.value}>
                  {exporter.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <TextField name="buyerAdress" value={invoiceInfo.buyerAdress} onChange={handleChange} label="BUYER ADDRESS" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="phoneNumber" value={invoiceInfo.phoneNumber} onChange={handleChange} label="Phone Number" fullWidth></TextField>
        </Grid>
        {pi && (
          <Grid item xs={12} sm={6}>
            <TextField name="consignee" value={invoiceInfo.consignee} onChange={handleChange} label="CONSIGNEE" fullWidth></TextField>
          </Grid>
        )}
        {pi && (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">NOTIFY PARTY</InputLabel>
                <Select
                  name="notifyParty"
                  value={invoiceInfo.notifyParty}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {notify_partys.map((notify_party) => (
                    <MenuItem key={notify_party.name} value={notify_party.value}>
                      {notify_party.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{" "}
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">PARTY OF DISCHARGE</InputLabel>
                <Select
                  name="partyOfDischarge"
                  value={invoiceInfo.partyOfDischarge}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {party_of_discharge.map((party) => (
                    <MenuItem key={party.name} value={party.value}>
                      {party.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{" "}
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="partyOfDischarge"
                value={invoiceInfo.partyOfDischarge}
                onChange={handleChange}
                label="PARTY OF DISCHARGE"
                fullWidth
              ></TextField>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">FINAL DESTINATION</InputLabel>
            <Select
              name="finalDistination"
              value={invoiceInfo.finalDistination}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {final_distination.map((dest) => (
                <MenuItem key={dest.name} value={dest.value}>
                  {dest.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            name="finalDistination"
            value={invoiceInfo.finalDistination}
            onChange={handleChange}
            label="FINAL DESTINATION"
            fullWidth
          ></TextField>
        </Grid>
        {pi && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField name="invoiceNo" value={invoiceNumber} label="PI NUMBER" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="discount" value={invoiceInfo.discount} onChange={handleChange} label="Discount" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="additions" value={invoiceInfo.additions} onChange={handleChange} label="Additions" fullWidth></TextField>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6}>
          <TextField name="date" value={invoiceInfo.date} label="DATE MM/DD/YYYY" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="note" value={invoiceInfo.note} onChange={handleChange} label="Notes" fullWidth></TextField>
        </Grid>
        {pi && (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Terms Collections : </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleCollectionChange}
                  value={terms}
                >
                  <FormControlLabel value="EXWAREHOUSE" control={<Radio />} label="EXWAREHOUSE" />
                  <FormControlLabel value="FOB" control={<Radio />} label="FOB" />
                  <FormControlLabel value="CIF" control={<Radio />} label="CIF" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label">Bank Details : </InputLabel>
              <div>
                <div style={{ display: "flex", flexDirection: "row" }} className="col-md-12">
                  {bank_details.map((item, i) => (
                    <div className="form-check m-3" key={i}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="bank"
                        checked={invoiceInfo.bankDetails?.includes(item.collection)}
                        value={item.collection}
                        id="flexCheckDefault"
                        onChange={handelBankDetailsChange}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        {item.collection}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={12}>
          <div className="">
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Goods will be delivered with in <b>{deliveryDateState}</b> days after completion of full payment
            </label>
            <input
              value={deliveryDateState}
              onChange={(e) => {
                setDeliveryDateState(e.target.value);
              }}
              type="text"
              onBlur={handelDeliveryDateChange}
              style={{ border: "solid", padding: "10px", width: "75px", marginLeft: "20px" }}
            ></input>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className="">
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Advance Payment <b>{paymentPercentageState}%</b> Balance to be paid (time providing copy of BL/before goods dispatch)
            </label>
            <input
              value={paymentPercentageState}
              onChange={(e) => {
                setPaymentPercentageState(e.target.value);
              }}
              type="text"
              onBlur={handelTermsChange}
              style={{ border: "solid", padding: "10px", width: "75px", marginLeft: "20px" }}
            ></input>
          </div>
        </Grid>
      </Grid>
    </React.Fragment> */}
    </>
  );
}

export default InvoiceInfo;
