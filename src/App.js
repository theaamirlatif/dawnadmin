import { Route, Routes } from "react-router-dom"
import Home from "./component/Home"
import Customers from "./component/Customers"
import Certificate from "./component/Certificate"
import AlotCertificate from "./component/AlotCertificate"
import Login from "./component/Login"
import Logout from "./component/Logout"
import AllCertificates from "./component/AllCertificates"
import Team from "./component/Team"
import Categories from "./component/Categories"
import Products from "./component/Products"

// App all routes

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Certificate" element={<Certificate />} />
        <Route path="/AlotCertificate" element={<AlotCertificate />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/AllCertificates" element={<AllCertificates />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
