import React from "react";
import Sidebar from "../Layout/Sidebar";
import { YojnaSurveyForm } from "./YojnaSurveyForm";

export const YojnaSurveyFormAction = () => {
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar componentName={<YojnaSurveyForm />} />
        </div>
      </body>
    </div>
  );
};
