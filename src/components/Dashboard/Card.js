import React, { useEffect, useState } from "react";

import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { RotatingTriangles } from "react-loader-spinner";
// import Carousel from "react-multi-carousel";

const Card = () => {
  const [arrayCard, setArrayCard] = useState([]);
  const [arrayCard2, setArrayCard2] = useState([]);
  const [cardLoding1, setcardLoading1] = useState(false);
  const [cardLoding2, setcardLoading2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setcardLoading1(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${API_URL}/schemesd/scheme-counts/`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setcardLoading1(false);
        setArrayCard(response.data);
      });
  }, []);

  useEffect(() => {
    setcardLoading2(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${API_URL}/schemesd/acnamecounts/`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setcardLoading2(false);

        setArrayCard2(response.data);
      });
  }, []);

  const handleNavigateDetails = (item, query) => {
    if (query == "scheme_name") {
      navigate(`/details?${query}=${item.scheme_name}`);
    } else {
      navigate(`/details?${query}=${item.ac_name}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <div>
        <h1 className="h3 mb-2 text-gray-800">Scheams</h1>
        {cardLoding1 ? (
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
          <>
            <div className="row">
              {arrayCard.map((item, index) => (
                <div
                  key={item.id}
                  className="col-xl-3 col-md-6 mb-4"
                  onClick={() => handleNavigateDetails(item, "scheme_name")}
                >
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            {item.scheme_name}
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {item.total_beneficiary}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div> */}
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Parliament No: - 6
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    Gandhinagar
                  </div>
                </div>
                {/* <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------ */}
      <div>
        <h1 className="h3 mb-2 text-gray-800">Ac Name</h1>

        {cardLoding2 ? (
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
          <div className="row">
            {arrayCard2.map((item, index) => (
              <div
                key={item.id}
                className="col-xl-3 col-md-6 mb-4"
                onClick={() => handleNavigateDetails(item, "ac_name")}
              >
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          {item.ac_name}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {item.total_beneficiary}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
