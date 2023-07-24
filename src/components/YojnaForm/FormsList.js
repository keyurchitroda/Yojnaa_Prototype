import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  ACNameList,
  BoothNameList,
  GetSearchSchemeValues,
  VibhagNameList,
  clearVlaue,
  setLoadingFalse,
  setLoadingTrue,
  setSearchValues,
} from "../../redux/slices/yojnaformSlice";
import { MagnifyingGlass } from "react-loader-spinner";
import _ from "lodash";
import SchemeTable from "./SchemeTable";

const FormsList = () => {
  const [acLoader, setAcLoader] = useState(false);
  const [boothLoader, setBoothLoader] = useState(false);
  const [vibhagLoader, setVibhagLoader] = useState(false);

  const dispatch = useDispatch();

  const yojnaForms = useSelector((state) => state.reducer.yojnaForms);

  useEffect(() => {
    dispatch(clearVlaue());
    getAcNameList();
  }, []);

  const getAcNameList = () => {
    setAcLoader(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/uniqueacnames/`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        await dispatch(ACNameList(response));
        setAcLoader(false);
      });
  };

  const getBoothNameList = (event) => {
    setBoothLoader(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/boothlistbyacno/?ac_no=${event.target.value}`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        await dispatch(BoothNameList(response));
        await dispatch(
          setSearchValues({
            ac_no: event.target.value,
            booth_no: null,
            village_name: "",
          })
        );
        setBoothLoader(false);
      });
  };

  const getVibhagList = (event) => {
    setVibhagLoader(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/vibhagbyboothno/?ac_no=${yojnaForms.searchValues?.ac_no}&booth_no=${event.target.value}`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        await dispatch(VibhagNameList(response));
        await dispatch(
          setSearchValues({ booth_no: event.target.value, village_name: "" })
        );
        setVibhagLoader(false);
      });
  };

  const setOnchangeVibhagNo = async (event) => {
    await dispatch(setSearchValues({ village_name: event.target.value }));
  };

  const handleFindScheme = async () => {
    await dispatch(setLoadingTrue());
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/benificiary-records/?ac_no=${
      yojnaForms.searchValues.ac_no
    }&booth_no_new=${
      yojnaForms.searchValues?.booth_no ? yojnaForms.searchValues?.booth_no : ""
    }&page=${1}`;
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        console.log(response);
        await dispatch(GetSearchSchemeValues(response.data));
        await dispatch(setLoadingFalse());
      });
  };

  return (
    <div style={{ padding: "50px" }}>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="exampleInputEmail1">AC Name</label>
          {acLoader ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MagnifyingGlass
                visible={true}
                height="60"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
          ) : (
            <select class="custom-select" required onChange={getBoothNameList}>
              <option value="" disabled selected>
                Open this select menu
              </option>
              {_.map(_.get(yojnaForms, "acNameList", []), (items) => (
                <option value={items.ac_no}>{items.ac_name}</option>
              ))}
            </select>
          )}
        </div>
        <div class="form-group col-md-4">
          <label for="inputPassword4">Booth Name</label>
          {boothLoader ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MagnifyingGlass
                visible={true}
                height="60"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
          ) : (
            <select
              class="custom-select"
              required
              onChange={getVibhagList}
              disabled={yojnaForms.searchValues.ac_no == null}
            >
              <option value="" disabled selected>
                Open this select menu
              </option>
              {_.map(_.get(yojnaForms, "boothNameList", []), (items) => (
                <option value={items.booth_no}>
                  {items.eng_booth_name} ({items.booth_name})
                </option>
              ))}
            </select>
          )}
        </div>
        <div class="form-group col-md-4">
          <label for="inputPassword4"> Vibhaag</label>
          {vibhagLoader ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MagnifyingGlass
                visible={true}
                height="60"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
          ) : (
            <select
              class="custom-select"
              required
              disabled={
                yojnaForms.searchValues?.ac_no == null ||
                yojnaForms.searchValues?.booth_no == null
              }
              onChange={setOnchangeVibhagNo}
            >
              <option value="">Open this select menu</option>
              {_.map(_.get(yojnaForms, "vibhagNameList", []), (items) => (
                <option value={items.village_name}>
                  {items.eng_vibhag_name} ({items.vibhag_name})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <button onClick={handleFindScheme} class="btn btn-primary">
        Search
      </button>

      <div style={{ marginTop: "20px" }}>
        <SchemeTable />
      </div>
    </div>
  );
};

export default FormsList;
