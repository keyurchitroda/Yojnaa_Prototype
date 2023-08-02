import React from "react";
import { RotatingTriangles } from "react-loader-spinner";
import Pagination from "../pagination/Pagination";
import { API_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSearchSchemeValues,
  setLoadingFalse,
  setLoadingTrue,
  setSingleSchemeRecord,
} from "../../redux/slices/yojnaformSlice";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const SchemeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const yojnaForms = useSelector((state) => state.reducer.yojnaForms);

  const handleFindSchemeByPagination = async (page) => {
    await dispatch(setLoadingTrue());
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/voters/?ac_no=${
      yojnaForms.searchValues.ac_no
    }&booth_no=${
      yojnaForms.searchValues?.booth_no ? yojnaForms.searchValues?.booth_no : ""
    }&page=${page}`;
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        await dispatch(GetSearchSchemeValues(response, page));
        await dispatch(setLoadingFalse());
      });
  };

  const handleEditForm = async (id) => {
    await dispatch(setLoadingTrue());
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/voters/${id}`;
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(async (response) => {
        await dispatch(setSingleSchemeRecord(response));
        navigate("/yojnaform");
        await dispatch(setLoadingFalse());
      });
  };

  return (
    <div class="container-fluid">
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Scheme List</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered table-hover"
              id="dataTable"
              width="100%"
              cellspacing="0"
              style={{ cursor: "pointer" }}
            >
              <thead>
                <tr>
                  <th>Action</th>
                  <th>AC Name</th>
                  <th>Booth No</th>
                  <th>Idcard No</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Address</th>
                  <th>Village</th>
                  <th>Taluka</th>
                  <th>District</th>
                  <th>Pincode</th>
                  <th>Scheme Name</th>
                  <th>Benefit Details</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Action</th>
                  <th>AC Name</th>
                  <th>Booth No</th>
                  <th>Idcard No</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Address</th>
                  <th>Village</th>
                  <th>Taluka</th>
                  <th>District</th>
                  <th>Pincode</th>
                  <th>Scheme Name</th>
                  <th>Benefit Details</th>
                </tr>
              </tfoot>
              <tbody>
                {yojnaForms.isLoading ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <RotatingTriangles
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="rotating-triangels-loading"
                          wrapperStyle={{ display: "inline-block" }}
                          wrapperClass="rotating-triangels-wrapper"
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  _.map(_.get(yojnaForms, "schemeList", []), (items, index) => (
                    <tr>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          onClick={() => handleEditForm(items.id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>{items.ac_name ? items.ac_name : "N/A"}</td>
                      <td>{items.booth_no ? items.booth_no : "N/A"}</td>
                      <td>{items.idcard_no ? items.idcard_no : "N/A"}</td>
                      <td>{`${items.eng_f_name} ${items.eng_m_name} ${items.eng_surname}`}</td>
                      <td>{items.mobile_no ? items.mobile_no : "N/A"}</td>
                      <td>{items.Address ? items.Address : "N/A"}</td>
                      <td>{items.village_name ? items.village_name : "N/A"}</td>
                      <td>{items.taluka_name ? items.taluka_name : "N/A"}</td>
                      <td>{items.dist_name ? items.dist_name : "N/A"}</td>
                      <td>{items.pincode ? items.pincode : "N/A"}</td>
                      <td>{items.scheme_name ? items.scheme_name : "N/A"}</td>
                      <td>
                        {items.benifit_detail ? items.benifit_detail : "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div class="table-responsive">
            <Pagination
              className="pagination-bar"
              currentPage={_.get(yojnaForms, "currentPage", 1)}
              totalCount={_.get(yojnaForms, "pageCount", 1)}
              pageSize={10}
              onPageChange={(page) => handleFindSchemeByPagination(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeTable;
