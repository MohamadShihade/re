import logo from "./logo.svg";
import "./App.css";
// import { Container } from "@material-ui/core";
// import Home from "./pages/Home/Home";
// import ProductForm from "./pages/ProductForm/ProductForm";
// import PriceList from "./pages/PriceList/PriceList";
// import Table from "./Components/Table/Table";
// import ProformaInvoice from "./pages/ProformaInvoice/ProformaInvoice";
import { BrowserRouter } from "react-router-dom";
// import CustomerPriceList from "./pages/CustomerPriceList/CustomerPriceList";
// import MakiPi from "./pages/MakePi/MakePi";
// import PiStepper from "./pages/MakePi/PiStepper";
// import Warranty from "./pages/Warranty/Warranty";
// import WarrantyCheck from "./pages/Warranty/WarrantyCheck/WarrantyCheck";
import RoutesComponents from "./view/shared/routes/RoutesComponents";
function App() {
  return (
    <BrowserRouter>
      <RoutesComponents />
    </BrowserRouter>
  );
}

export default App;
