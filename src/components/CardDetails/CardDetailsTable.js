import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import Pagination from "../pagination/Pagination";
import { RotatingTriangles } from "react-loader-spinner";

const CardDetailsTable = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currenPage, setCurrenPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const url = window.location.href;

  // Create a URLSearchParams object from the URL
  const params = new URLSearchParams(new URL(url).search);

  // Get the iterator for the key-value pairs
  const iterator = params.entries();

  // Get the first key-value pair (assuming there's only one)
  const { value } = iterator.next();

  // Extract the key and value
  const [key, val] = value;

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/benificiary-records/?${key}=${decodeURI(
      val
    )}&page=${currenPage}`;

    fetch(apiUrl, requestOptions)
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
    let apiUrl = `${API_URL}/schemesd/benificiary-records/?${key}=${decodeURI(
      val
    )}&page=${page}`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setData(response.data.results);
        setCurrenPage(page);
      });
  };

  return (
    <div class="container-fluid">
      <h1 class="h3 mb-2 text-gray-800">Tables</h1>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
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
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
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
  );
};

export default CardDetailsTable;
