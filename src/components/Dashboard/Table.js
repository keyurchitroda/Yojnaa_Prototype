import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import _ from "lodash";
import { API_URL } from "../config";
import { RotatingTriangles } from "react-loader-spinner";

const Table = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currenPage, setCurrenPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `${API_URL}/schemesd/benificiary-records/?page=${currenPage}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setData(response.data.results);
        setTotalCount(response.data.count);
      });
  }, []);

  const handlePageChange = (page) => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let endPointVar = `${API_URL}/schemesd/benificiary-records/?page=${page}`;
    if (acNo || boothNo) {
      endPointVar = `${API_URL}/schemesd/benificiary-records/?ac_no=${acNo}&booth_no_new=${boothNo}&page=${page}`;
    }
    fetch(endPointVar, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);

        setData(response.data.results);
        setCurrenPage(page);
      });
  };

  const exportToCsv = (filename, rows) => {
    // Get the headers from the first row of data
    const headers = _.keys(data[0]);
    // Create a CSV string from the array of rows
    const csvContent = `data:text/csv;charset=utf-8,${_.join(
      [
        _.join(headers, ","),
        ..._.map(data, (row) => _.join(_.values(row), ",")),
      ],
      "\n"
    )}`;

    // console
    // Create a link element to download the CSV file
    const link = document.createElement("a");
    // Set the href attribute to the CSV string
    link.setAttribute("href", encodeURI(csvContent));
    // Set the download attribute to the specified filename
    link.setAttribute("download", "table");
    // Make the link hidden
    link.style.visibility = "hidden";
    // Append the link to the document body
    document.body.appendChild(link);
    // Simulate a click on the link to trigger the download
    link.click();
    // Remove the link from the document body
    document.body.removeChild(link);
  };

  const [acNameList, setAcNameList] = useState([]);
  const [boothNoList, setBoothNoList] = useState([]);
  const [acNo, setAcNo] = useState("");
  const [boothNo, setBoothNo] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${API_URL}/schemesd/boothlistbypcno/`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setAcNameList(response);
      });
  }, []);

  const getSearchingTableRecords = (acNovalue) => {
    setCurrenPage(1);
    setLoading(true);
    let endPoint = `${API_URL}/schemesd/benificiary-records/?ac_no=${acNo}&page=${currenPage}`;
    if (acNo && boothNo) {
      endPoint = `${API_URL}/schemesd/benificiary-records/?ac_no=${acNo}&booth_no_new=${boothNo}&page=${currenPage}`;
    }

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(endPoint, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setData(response.data.results);
        setTotalCount(response.data.count);
        return;
      });
    return;
  };

  const setAcNoAndGetBoothList = async (e) => {
    setAcNo(e.target.value);
    setBoothNo("");
    // await getSearchingTableRecords(e.target.value);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `${API_URL}/schemesd/boothlistbyacno/?ac_no=${e.target.value}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((response) => {
        setBoothNoList(response);
      });
  };

  const setBoothNoChange = async (e) => {
    setBoothNo(e.target.value);
  };

  return (
    <div class="container-fluid">
      <h1 class="h3 mb-2 text-gray-800">Tables</h1>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
          <div class=" col-md-4">
            <select
              class="custom-select"
              required
              onChange={setAcNoAndGetBoothList}
              // disabled={yojnaForms.searchValues.ac_no == null}
            >
              <option value="" disabled selected>
                Select AC Name
              </option>
              {_.map(acNameList, (items) => (
                <option value={items.ac_no}>
                  {items.eng_ac_name} ({items.ac_name})
                </option>
              ))}
            </select>
          </div>

          <div class=" col-md-4">
            <select class="custom-select" required onChange={setBoothNoChange}>
              <option value="" disabled selected>
                Select Booth Name
              </option>
              {_.map(boothNoList, (items) => (
                <option value={items.booth_no}>
                  {items.eng_booth_name} ({items.booth_name})
                </option>
              ))}
            </select>
          </div>
          {/* </div> */}
          {/* <a
            onClick={exportToCsv}
            className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i>
            Export CSV
          </a> */}
          <a
            onClick={getSearchingTableRecords}
            className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-search fa-sm text-white-50"></i>
            Search
          </a>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
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
                {loading ? (
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
                  data.map((items, index) => (
                    <tr>
                      <td>{items.ac_name ? items.ac_name : "N/A"}</td>
                      <td>{items.booth_no_new ? items.booth_no_new : "N/A"}</td>
                      <td>{items.idcard_no ? items.idcard_no : "N/A"}</td>
                      <td>{items.Name ? items.Name : "N/A"}</td>
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
          <div
            class="table-responsive"
            // style={{ display: "flex", justifyContent: "center" }}
          >
            <Pagination
              className="pagination-bar"
              currentPage={currenPage}
              totalCount={totalCount}
              pageSize={10}
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
