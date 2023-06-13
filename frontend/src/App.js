import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import ProductForm from "./pages/ProductForm/ProductForm";
import PriceList from "./pages/PriceList/PriceList";
import Table from "./Components/Table/Table";
//import ProformaInvoice from "./pages/ProformaInvoice/ProformaInvoice";
import ProformaInvoice from "./Components/PoformaInvoice/ProformaInvoice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerPriceList from "./pages/CustomerPriceList/CustomerPriceList";
import MakiPi from "./pages/MakePi/MakePi";
import PiStepper from "./pages/MakePi/PiStepper";
import Warranty from "./pages/Warranty/Warranty";
import WarrantyCheck from "./pages/Warranty/WarrantyCheck/WarrantyCheck";
import CheckCustomer from "./pages/Invoice/CheckCustomer";
import AdminPage from "./pages/Admin/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./pages/Layout/Layout";
import UserLayout from "./pages/Layout/UserLayout";
import useAuth from "./hooks/useAuth";
import { ROLES } from "./config/roles";
import RequireAuth from "./actions/RequireAuth";
import Employees from "./pages/Employees/Employees";
import NewUser from "./pages/NewUser/NewUser";
import PriceListInfo from "./pages/Warranty/PriceListInfo/PriceListInfo";
import PriceListPDF from "./Components/PriceListPDF/PriceListPDF";
import PIActionsAdmin from "./pages/PIActions/PIActionsAdmin/PIActionsAdmin";
import ProformaInvoiceOrders from "./pages/Orders/ProformaInvoiceOrders/ProformaInvoiceOrders";
import EditProforamaInvoice from "./pages/EditProformaInvoice/EditProforamaInvoice";
import MakePo from "./pages/MakePo/MakePo";
import SignedProformaInvoices from "./pages/Orders/SignedProformaInvoices/SignedProformaInvoices";
import Finance from "./pages/Finance/Finance";
import Orders from "./pages/Orders/Orders";
import Projects from "./pages/Projects/Projects";
import AllProjects from "./pages/AllProjects/AllProjects";
import SharedProjects from "./pages/AllProjects/SharedProjects";
import WebsitePage from "./pages/WebsitePage/WebsitePage";
import PoInfo from "./pages/MakePo/PoInfo/PoInfo";
import Invoice from "./Components/PurchaseOrderPdf/Invoice";
import PurchaseOrderPdf from "./Components/PurchaseOrderPdf/PurchaseOrderPdf";
import PurchaseOrdersAll from "./pages/PurchaseOrdersAll/PurchaseOrdersAll";
import EditStock from "./pages/EditStock/EditStock";
import PackingList from "./pages/PackingList/PackingList";
import PackingListPdf from "./Components/PackingListPdf/PackingListPdf";
import PackingListsAll from "./pages/PackingListsAll/PackingListsAll";
import PackingListManual from "./pages/PackingList/PackingListManual";
import Home from "./pages/Home/Home";
import EditStock2 from "./pages/EditStock/EditStock2";
import NewLayout from "./Components/NewLayout/NewLayout";
import AddIssue from "./Components/NewLayout/Modules/pages/Add-Issue/AddIssue";
import CheckProduct from "./pages/CheckProduct/CheckProduct";
import HomeDashboard from "./Components/NewLayout/Modules/pages/Home-Dashboard/HomeDashboard";
import Issues from "./Components/NewLayout/Modules/pages/All-Issues/Issues";
function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/website" element={<WebsitePage />}></Route>
          <Route path="/check" element={<CheckProduct />}></Route>

          {/* this are routes for new dashboard */}
          <Route path="dashboard" element={<NewLayout />}>
            <Route index path="home" element={<HomeDashboard />}></Route>
            <Route path="add-issue" element={<AddIssue />}></Route>
            <Route path="issues" element={<Issues />}></Route>
          </Route>
        {/* end routes dashboard */}

          <Route path="check-product" element={<CheckProduct />}></Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />}></Route>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route path="user" element={<UserLayout />}>
                <Route path="home" element={<Home />} />
                <Route index element={<Warranty />}></Route>
                <Route path="pricelist" element={<PriceList />}></Route>
                <Route path="pdf" element={<ProformaInvoice />}></Route>
                <Route path="piadmin" element={<PIActionsAdmin />}></Route>
                <Route path="allpo" element={<PurchaseOrdersAll />}></Route>
                <Route path="orders" element={<Orders />}></Route>
                <Route path="projects" element={<Projects />}></Route>
                <Route path="allprojects" element={<AllProjects />}></Route>
                <Route path="sharedprojects" element={<SharedProjects />}></Route>
                <Route path="orders/pisigned" element={<SignedProformaInvoices />}></Route>
                <Route path="editpi/:id" element={<EditProforamaInvoice />}></Route>
                <Route path="addproduct" element={<ProductForm />}></Route>
                <Route path="makepi" element={<PiStepper />}></Route>
                <Route path="makepo" element={<MakePo />}></Route>
                <Route path="poinfo" element={<PoInfo />}></Route>
                <Route path="popdf" element={<PurchaseOrderPdf />}></Route>
                <Route path="finance" element={<Finance />}></Route>
                <Route path="editstock" element={<EditStock />}></Route>
                <Route path="editstock2" element={<EditStock2 />}></Route>
                <Route path="packinglist" element={<PackingList />}></Route>
                <Route path="packinglistmanual" element={<PackingListManual />}></Route>{" "}
                <Route path="packinglistpdf" element={<PackingListPdf />}></Route>
                <Route path="allpkl" element={<PackingListsAll />}></Route>
                <Route path="table" element={<ProformaInvoice />}></Route>
                <Route path="pricelistinfo" element={<PriceListInfo />}></Route>
                <Route path="pricelistpdf" element={<PriceListPDF />}></Route>
                <Route path="warranty" element={<Warranty />}></Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="admin" element={<AdminPage />}></Route>
                  <Route path="employees" element={<Employees />}></Route>
                  <Route path="new_user" element={<NewUser />}></Route>
                </Route>
                <Route path="warranty-check" element={<WarrantyCheck />}></Route>
                <Route path="customer-price-list" element={<CustomerPriceList />}></Route>
                <Route path="checkCustomer" element={<CheckCustomer />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
