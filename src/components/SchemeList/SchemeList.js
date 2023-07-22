import React from "react";
import SchemeListCards from "./SchemeListCards";
import Sidebar from "../Layout/Sidebar";

const SchemeList = () => {
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar componentName={<SchemeListCards />} />
        </div>
      </body>
    </div>
  );
};

export default SchemeList;
