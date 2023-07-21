import React from "react";
import Sidebar from "../Layout/Sidebar";
import BoothListCards from "./BoothListCards";

const BoothList = () => {
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar componentName={<BoothListCards />} />
          {/* <Header /> */}
        </div>
      </body>
    </div>
  );
};

export default BoothList;
