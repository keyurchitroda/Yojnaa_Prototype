import React from "react";
import Sidebar from "../Layout/Sidebar";
import YojnaFormAction from "./YojnaFormAction";

function YojnaForm() {
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar componentName={<YojnaFormAction />} />
        </div>
      </body>
    </div>
  );
}

export default YojnaForm;
