import React from "react";
import { Navbar } from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import CardDetailsTable from "./CardDetailsTable";
import BoothListCards from "../BoothList/BoothListCards";

function CardDetails() {
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar componentName={<CardDetailsTable />} />
          {/* <Header /> */}
        </div>
      </body>
    </div>
  );
}

export default CardDetails;
