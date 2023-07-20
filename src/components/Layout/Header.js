import React, { useState } from "react";
import Dahsboard from "../Dashboard/Dahsboard";
import CardDetails from "../CardDetails/CardDetails";
import { Navbar } from "./Navbar";

const Header = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Navbar />

        <Dahsboard />
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
  );
};

export default Header;
