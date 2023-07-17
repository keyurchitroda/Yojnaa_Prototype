import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";

const Table = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currenPage, setCurrenPage] = useState(1);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://13.127.21.5:8000/schemesd/benificiary-records/?page=${currenPage}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response.data.results);
        setTotalCount(response.data.count);
      });
  }, []);

  const handlePageChange = (page) => {
    console.log("page", page);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://13.127.21.5:8000/schemesd/benificiary-records/?page=${page}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response.data.results);
        setCurrenPage(page);
      });
  };

  return (
    <div class="container-fluid">
      <h1 class="h3 mb-2 text-gray-800">Tables</h1>

      <div class="card shadow mb-4">
        <div class="card-header py-3">
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
                {data.map((items, index) => (
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
                ))}
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

export default Table;
