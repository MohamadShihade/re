export const orderStatus1 = {
  CONFIRMED: "CONFIRMED",
  DEPOSIT_PAID: "DEPOSIT_PAID",
  BOOKED: "BOOKED",
  FULL_PAYMENT: "FULL_PAYMENT",
  INVOICE_READY: "INVOICE_READY",
  PAKINGLIST_READY: "PAKINGLIST_READY",
  DONE_DEAL: "DONE_DEAL",
};

export const orderStatus = [
  { status: "CONFIRMED", stage_no: 0, stage_department: "sales" },
  { status: "DEPOSIT_PAID", stage_no: 1, stage_department: "acounting" },
  { status: "BOOKED", stage_no: 2, stage_department: "logistics" },
  { status: "FULL_PAYMENT", stage_no: 3, stage_department: "acounting" },
  { status: "INVOICE_READY", stage_no: 4, stage_department: "acounting" },
  { status: "PAKINGLIST_READY", stage_no: 5, stage_department: "logistics" },
  { status: "DONE_DEAL", stage_no: 6, stage_department: "logistics" },
];

export const orderStatusFinance = [
  { status: "DEPOSIT_PAID", stage_no: 1, stage_department: "acounting" },
  { status: "BOOKED", stage_no: 2, stage_department: "logistics" },
  { status: "FULL_PAYMENT", stage_no: 3, stage_department: "acounting" },
];
