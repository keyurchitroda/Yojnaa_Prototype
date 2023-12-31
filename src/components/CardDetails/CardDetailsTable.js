import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import Pagination from "../pagination/Pagination";
import { RotatingTriangles } from "react-loader-spinner";
import { useSelector } from "react-redux";

const CardDetailsTable = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currenPage, setCurrenPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [singleData, setSingleData] = useState({});
  const [loading2, setLoading2] = useState(false);

  const cardDetails = useSelector(
    (state) => state.reducer.cardsDetails.scheme_details
  );

  const cardBoothDetails = useSelector(
    (state) => state.reducer.cardsDetails.booth_details
  );

  const cardACDetails = useSelector(
    (state) => state.reducer.cardsDetails.ac_details
  );

  const entries = Object.entries(singleData);

  const keysToShow = [
    "benificiary_f_name",
    "benificiary_surname",
    "beneficiary_id",
    "scheme_name",
    "ac_no",
    "ac_name",
    "year_cd",
    "village_name",
  ]; // Only display 'id' and 'beneficiary_id'

  const filteredEntries = entries.filter(([key, _]) =>
    keysToShow.includes(key)
  );

  // Example data (replace this with your actual data)
  const tableData = {
    id: 8502,
    benificiary_id: 5875,
    scheme_name: "jsy",
    ac_no: 40,
    ac_name: "SANAND",
    benificiary_f_name: "KAILASHBEN",
    benificiary_m_name: "BHAIRAMBHAI",
    benificiary_surname: "PATEL",
    year_cd: "2019-20",
    village_name: "KUNVAR",
    dist_name: "AHMEDABAD",
  };
  // Add more data as needed

  const handleViewClick = (id) => {
    setLoading2(true);
    setShowModal(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/beneficiary/${id}`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setLoading2(false);
        setSingleData(response.data);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const url = window.location.href;

  // Create a URLSearchParams object from the URL
  const params = new URLSearchParams(new URL(url).search);

  const val1 = params.get("booth_no_new");
  const val2 = params.get("scheme_name");

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
    let apiUrl = `${API_URL}/schemesd/benificiary-records/?booth_no_new=${decodeURI(
      val1
    )}&scheme_name=${val2}`;

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
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">
            <a href={`/boothlist?ac_no=${cardACDetails.ac_no}`}>
              {cardACDetails.ac_no} - {cardACDetails.eng_ac_name} (
              {cardACDetails.ac_name})
            </a>
          </li>
          <li class="breadcrumb-item active">
            <a href={`/schemelist?booth_no=${cardBoothDetails.booth_no}`}>
              {cardBoothDetails.booth_no} - {cardBoothDetails.eng_booth_name} (
              {cardBoothDetails.booth_name})
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {cardDetails.scheme_name} ({cardDetails.total_beneficiary})
          </li>
        </ol>
      </nav>

      <h1 class="h3 mb-2 text-gray-800">
        {cardDetails.scheme_name} ({cardDetails.total_beneficiary})
      </h1>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">
            {cardDetails.scheme_name} ({cardDetails.total_beneficiary})
          </h6>
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
        </div>

        {showModal && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">details</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={handleCloseModal}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div
                  className="modal-body"
                  style={{ backgroundColor: "#f0f0f0" }}
                >
                  <div className="form-group">
                    <table className="table">
                      <table className="table">
                        <tbody>
                          {loading2 ? (
                            <tr>
                              <td colSpan={8} style={{ textAlign: "center" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
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
                            filteredEntries.map(([key, value]) => (
                              <tr key={key}>
                                <td className="font-weight-bold">{key}</td>
                                <td>{value}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
