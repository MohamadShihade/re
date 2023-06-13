export function colorByStatus(status) {
  switch (status) {
    case "Pending":
      return "table-secondary";
    case "draft":
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

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
