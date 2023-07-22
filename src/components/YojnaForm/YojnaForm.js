import React from "react";
import Sidebar from "../Layout/Sidebar";
import YojnaFormAction from "./YojnaFormAction";
import FormsList from "./FormsList";

function YojnaForm() {
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar componentName={<FormsList />} />
        </div>
      </body>
    </div>
  );
}

export default YojnaForm;
