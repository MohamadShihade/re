import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    height: "10%",
    paddingTop: "70%",
    paddingBottom: "20%",
    marginBottom: "20",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    backgroundBlendMode: "color-dodge",
  },

  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "15px 16px 0px 16px",
    height: "90px",
    fontWeight: "bold",
    backgroundColor: "#ECF8F7",
  },
  capacity: {
    fontSize: "23px",
    backgroundColor: "#C9D5D5",
    padding: "5px 16px",
  },
  price: {
    fontSize: "23px",
    padding: "3px 0px 0px 16px",
    backgroundColor: "#ECF8F7",
    display: "inline-block",
  },
  stock: {
    padding: "3px 0px 0px 16px",
    backgroundColor: "#C9D5D5",
    display: "inline-block",
    fontSize: "23px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
});
