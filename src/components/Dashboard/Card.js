import React, { useEffect, useState } from "react";

import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { RotatingTriangles } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { ACDetails } from "../../redux/slices/cardSlice";
// import Carousel from "react-multi-carousel";

const Card = () => {
  const [arrayCard2, setArrayCard2] = useState([]);
  const [cardLoding2, setcardLoading2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setcardLoading2(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${API_URL}/schemesd/boothlistbypcno/`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setcardLoading2(false);

        setArrayCard2(response);
      });
  }, []);

  const handleNavigateDetails = async (item, query) => {
    await dispatch(ACDetails(item));
    navigate(`/boothlist?${query}=${item.ac_no}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------ */}
      <div>
        <h1 className="h3 mb-2 text-gray-800">
          Assembly Consituency - Gandhinagar
        </h1>

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
            {arrayCard2.length > 0 &&
              arrayCard2.map((item, index) => (
                <div
                  key={item.id}
                  className="col-xl-3 col-md-6 mb-4"
                  onClick={() => handleNavigateDetails(item, "ac_no")}
                >
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            {item.ac_no}- {item.ac_name}
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {item.eng_ac_name}
                          </div>
                          <div className="h6 mb-0 font-weight-bold text-gray-800">
                            {item.total_beneficiaries}
                          </div>
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
