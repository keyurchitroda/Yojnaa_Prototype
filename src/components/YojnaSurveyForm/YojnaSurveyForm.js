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
  const yojnaForms = useSelector((state) => state.reducer.yojnaForms);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const selectedYojnaArray = _.map(
    _.get(yojnaForms, "existyojnas", []),
    (item) => {
      return {
        earlier_benefit: item.earlier_benefit,
        is_beneficial: item.is_beneficial,
        remarks: item.remarks,
        rest_of_benefits: item.rest_of_benefits,
        yojna_id: item.scheme_id,
        voters_id: item.voters_id,
        id: item.id,
      };
    }
  );

  const [userInputs, setUserInputs] = useState([]);

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
        const updatedUserInputs = {};
        response.forEach((item) => {
          updatedUserInputs[item.scheme_id] = {
            is_beneficial: item.is_beneficial,
            earlier_benefit: item.earlier_benefit,
            rest_of_benefits: item.rest_of_benefits,
            remarks: item.remarks,
          };
        });

        setUserInputs(updatedUserInputs);
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
        await dispatch(getAllYojna(response));
        await dispatch(setLoadingFalse());
      });
  };

  const [expandedYojnaIds, setExpandedYojnaIds] = useState(selectedYojnaArray);

  const handleAccordionClick = (yojna_id) => {
    if (expandedYojnaIds.includes(yojna_id)) {
      setExpandedYojnaIds(expandedYojnaIds.filter((id) => id !== yojna_id));
    } else {
      setExpandedYojnaIds([...expandedYojnaIds, yojna_id]);
    }
  };

  const handleChange = (yojna_id, field, value) => {
    const updatedUserInputs = { ...userInputs };
    if (!updatedUserInputs[yojna_id]) {
      updatedUserInputs[yojna_id] = {};
    }
    updatedUserInputs[yojna_id][field] = value;
    setUserInputs(updatedUserInputs);
  };

  const handleSubmit = () => {
    const reqData = Object.keys(userInputs).map((yojna_id) => ({
      voters_id: _.get(yojnaForms, "singleBenificaryRecord.id", ""),
      scheme_id: yojna_id,
      ...userInputs[yojna_id],
    }));
    const requestOptions = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData),
    };
    let apiUrl = `${API_URL}/schemesd/surveyquestion/create/`;
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
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
                    onClick={() => handleAccordionClick(item?.yojna_id)}
                    aria-expanded={expandedYojnaIds.includes(item.yojna_id)}
                  >
                    {item.yojna_name}
                  </button>
                </h5>
              </div>
              {expandedYojnaIds.includes(item.yojna_id) && (
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
                                userInputs[item.yojna_id]?.is_beneficial ===
                                "Yes"
                              }
                              onChange={(e) =>
                                handleChange(
                                  item.yojna_id,
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
                                userInputs[item.yojna_id]?.is_beneficial ===
                                "No"
                              }
                              onChange={(e) =>
                                handleChange(
                                  item.yojna_id,
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
                                userInputs[item.yojna_id]?.earlier_benefit ===
                                "Yes"
                              }
                              onChange={(e) =>
                                handleChange(
                                  item.yojna_id,
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
                                userInputs[item.yojna_id]?.earlier_benefit ===
                                "No"
                              }
                              onChange={(e) =>
                                handleChange(
                                  item.yojna_id,
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
                          value={userInputs[item.yojna_id]?.rest_of_benefits}
                          onChange={(e) =>
                            handleChange(
                              item.yojna_id,
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
                        value={userInputs[item.yojna_id]?.remarks}
                        onChange={(e) =>
                          handleChange(item.yojna_id, "remarks", e.target.value)
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
