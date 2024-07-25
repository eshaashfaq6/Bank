import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
function RootLayout() {
    return (
     <>
     <Header></Header>
     <Outlet></Outlet>
     <Footer></Footer>
    </>
    )}
export default RootLayout;