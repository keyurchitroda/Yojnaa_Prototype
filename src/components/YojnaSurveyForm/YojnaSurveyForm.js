import React, { useState } from "react";
import { useEffect } from "react";
import {
  getAllYojna,
  getExistYojnas,
  setLoadingFalse,
  setLoadingTrue,
} from "../../redux/slices/yojnaformSlice";
import { API_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { RotatingTriangles } from "react-loader-spinner";

export const YojnaSurveyForm = () => {
  const array = [1, 2, 3, 4, 5, 6];
  const yojnaForms = useSelector((state) => state.reducer.yojnaForms);
  console.log("yojnaForms", yojnaForms);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    getAllYojnas();
    getAvailableYojnas();
  }, []);

  const getAvailableYojnas = async () => {
    await dispatch(setLoadingTrue());
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/bfsurveyquestions/${_.get(
      yojnaForms,
      "singleBenificaryRecord.id",
      ""
    )}`;
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        console.log(response);
        await dispatch(getExistYojnas(response));
        await dispatch(setLoadingFalse());
      });
  };

  const getAllYojnas = async () => {
    await dispatch(setLoadingTrue());
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/yojnas/`;
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        console.log(response);
        await dispatch(getAllYojna(response));
        await dispatch(setLoadingFalse());
      });
  };

  const [expandedIndex, setExpandedIndex] = useState(0);

  const [userInputs, setUserInputs] = useState(
    _.get(yojnaForms, "existyojnas", [])
  );

  const handleAccordionClick = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Clicking the same accordion again will close it
    } else {
      setExpandedIndex(index); // Clicking a different accordion will open it
    }
  };

  const handleChange = (index, field, value) => {
    const updatedUserInputs = [...userInputs];
    if (!updatedUserInputs[index]) {
      updatedUserInputs[index] = {
        voters_id: _.get(yojnaForms, "singleBenificaryRecord.id", ""), // You can modify this based on your requirements
        scheme_id: yojnaForms.yojnas[index]?.yojna_id,
        is_beneficial: "No", // Default value
        earlier_benefit: "No", // Default value
        rest_of_benefits: 0, // Default value
        remarks: "", // Default value
      };
    }
    updatedUserInputs[index][field] = value;
    setUserInputs(updatedUserInputs);
  };

  const handleSubmit = () => {
    const reqData = _.filter(userInputs, (item) => item !== undefined);
    console.log(reqData);
    //http://127.0.0.1:8000/schemesd/surveyquestion/create/

    const requestOptions = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData),
    };
    let apiUrl = `${API_URL}/schemesd/surveyquestion/create/`;
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        console.log(response);
        navigate("/yojnaformlist");
      });
  };

  return (
    <>
      {yojnaForms.isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            ariaLabel="rotating-triangels-loading"
            wrapperStyle={{ display: "inline-block" }}
            wrapperClass="rotating-triangels-wrapper"
          />
        </div>
      ) : (
        <div id="accordion" style={{ padding: "50px" }}>
          {yojnaForms.yojnas.map((item, index) => (
            <div className="card" key={item?.yojna_id}>
              <div className="card-header" id={`heading${index}`}>
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={expandedIndex === index}
                  >
                    {item.yojna_name}
                  </button>
                </h5>
              </div>
              {expandedIndex === index && (
                <div
                  className={`collapse show`}
                  aria-labelledby={`heading${index}`}
                >
                  <div className="card-body">
                    <div className="form-row">
                      {/* Questions1 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "40px",
                        }}
                      >
                        <label
                          htmlFor={`is_beneficial-yes-${index}`}
                          style={{ fontWeight: "bold" }}
                        >
                          લાભ મળવાપાત્ર છે કે કેમ?
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "5px",
                          }}
                        >
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id={`is_beneficial-yes-${index}`}
                              name={`is_beneficial-${index}`}
                              className="custom-control-input"
                              value="Yes"
                              checked={
                                userInputs[index]?.is_beneficial === "Yes"
                              }
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "is_beneficial",
                                  e.target.value
                                )
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`is_beneficial-yes-${index}`}
                            >
                              YES
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id={`is_beneficial-no-${index}`}
                              name={`is_beneficial-${index}`}
                              className="custom-control-input"
                              value="No"
                              checked={
                                userInputs[index]?.is_beneficial === "No"
                              }
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "is_beneficial",
                                  e.target.value
                                )
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`is_beneficial-no-${index}`}
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* Questions2 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "40px",
                        }}
                      >
                        <label
                          htmlFor={`earlier_benefit-yes-${index}`}
                          style={{ fontWeight: "bold" }}
                        >
                          અગાઉ લાભ મળેવેલ છે?
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "5px",
                          }}
                        >
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id={`earlier_benefit-yes-${index}`}
                              name={`earlier_benefit-${index}`}
                              className="custom-control-input"
                              value="Yes"
                              checked={
                                userInputs[index]?.earlier_benefit === "Yes"
                              }
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "earlier_benefit",
                                  e.target.value
                                )
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`earlier_benefit-yes-${index}`}
                            >
                              YES
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id={`earlier_benefit-no-${index}`}
                              name={`earlier_benefit-${index}`}
                              className="custom-control-input"
                              value="No"
                              checked={
                                userInputs[index]?.earlier_benefit === "No"
                              }
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "earlier_benefit",
                                  e.target.value
                                )
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`earlier_benefit-no-${index}`}
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* Questions3 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "40px",
                        }}
                      >
                        <label
                          htmlFor={`rest_of_benefits-${index}`}
                          style={{ fontWeight: "bold" }}
                        >
                          બાકી લાભાર્થી ની સંખ્યા
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`rest_of_benefits-${index}`}
                          placeholder="rest_of_benefits"
                          value={userInputs[index]?.rest_of_benefits}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "rest_of_benefits",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-5">
                      <label
                        htmlFor={`remarks-${index}`}
                        style={{ fontWeight: "bold" }}
                      >
                        રિમાર્કસ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`remarks-${index}`}
                        aria-describedby="રિમાર્કસ"
                        placeholder="રિમાર્કસ"
                        value={userInputs[index]?.remarks}
                        onChange={(e) =>
                          handleChange(index, "remarks", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            className="btn btn-primary"
            disabled={userInputs.length === 0}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};
