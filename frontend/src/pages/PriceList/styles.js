import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    position: "relative",
    alignItems: "center",
    marginBottom: "15px",
  },
  buttons: {
    display: "flex",
    alignItems: "space-between",
  },
  button: {
    flex: 1,
    width: "20%",
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));
