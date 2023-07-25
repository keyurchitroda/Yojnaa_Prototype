import React from "react";
import YojnaFormAction from "./YojnaFormAction";
import Sidebar from "../Layout/Sidebar";

export const YojnaFormEdit = () => {
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar componentName={<YojnaFormAction />} />
        </div>
      </body>
    </div>
  );
};
