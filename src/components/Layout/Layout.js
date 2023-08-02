import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../styles/style.css";
import { Navbar } from "./Navbar";
import Dahsboard from "../Dashboard/Dahsboard";

const Layout = () => {
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar componentName={<Dahsboard />} />
        </div>
      </body>
    </div>
  );
};

export default Layout;
