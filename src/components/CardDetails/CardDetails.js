import React from "react";
import { Navbar } from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import CardDetailsTable from "./CardDetailsTable";

function CardDetails() {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <CardDetailsTable />
        </div>

        {/* //  Footer  */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2023</span>
            </div>
          </div>
        </footer>
        {/* <!-- End of Footer --> */}
      </div>
    </div>
  );
}

export default CardDetails;
