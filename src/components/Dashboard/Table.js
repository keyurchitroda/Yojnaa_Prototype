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
    fetch(
      `${API_URL}/schemesd/benificiary-records/?page=${page}`,
      requestOptions
    )
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

  return (
    <div class="container-fluid">
      <h1 class="h3 mb-2 text-gray-800">Tables</h1>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
          <a
            onClick={exportToCsv}
            className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i>
            Export CSV
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
                  <th>idcard_no</th>
                  <th>booth_no</th>
                  <th>Benificiary First Name</th>
                  <th>Benificiary Midle Name</th>
                  <th>Benificiary SurName</th>
                  <th>Scheme Name</th>
                  <th>AC Name</th>
                  <th>Year CD</th>
                  <th>Village</th>
                  <th>District</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>idcard_no</th>
                  <th>booth_no</th>
                  <th>Benificiary First Name</th>
                  <th>Benificiary Midle Name</th>
                  <th>Benificiary SurName</th>
                  <th>Scheme Name</th>
                  <th>AC Name</th>
                  <th>Year CD</th>
                  <th>Village</th>
                  <th>District</th>
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
                      <td>{items.idcard_no}</td>
                      <td>{items.booth_no ? items.booth_no : "N/A"}</td>
                      <td>{items.benificiary_f_name}</td>
                      <td>{items.benificiary_m_name}</td>
                      <td>{items.benificiary_surname}</td>
                      <td>{items.scheme_name}</td>
                      <td>{items.ac_name}</td>
                      <td>{items.year_cd}</td>
                      <td>{items.village_name}</td>
                      <td>{items.dist_name}</td>
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
