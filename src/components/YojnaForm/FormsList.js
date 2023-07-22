import React, { useEffect } from "react";
import { API_URL } from "../config";
import { useDispatch } from "react-redux";
import { ACNameList } from "../../redux/slices/yojnaformSlice";

const FormsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAcNameList();
  }, []);

  const getAcNameList = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/uniqueacnames/`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        console.log("response", response);
        await dispatch(ACNameList(response.data));
      });
  };

  const getBoothNameList = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/benificiary-records/`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {});
  };

  const getVibhagList = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/benificiary-records/`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {});
  };

  return (
    <div style={{ padding: "50px" }}>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="exampleInputEmail1">AC Name</label>
            <select class="custom-select" required>
              <option value="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label for="inputPassword4">Booth Naame</label>
            <select class="custom-select" required>
              <option value="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label for="inputPassword4"> Vibhaag</label>
            <select class="custom-select" required>
              <option value="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormsList;
