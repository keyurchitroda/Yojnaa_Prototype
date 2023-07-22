import React, { useEffect, useState } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BoothDetails } from "../../redux/slices/cardSlice";

const BoothListCards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const cardDetails = useSelector(
    (state) => state.reducer.cardsDetails.ac_details
  );

  const url = window.location.href;

  // Create a URLSearchParams object from the URL
  const params = new URLSearchParams(new URL(url).search);

  // Get the iterator for the key-value pairs
  const iterator = params.entries();

  // Get the first key-value pair (assuming there's only one)
  const { value } = iterator.next();

  // Extract the key and value
  const [key, val] = value;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/schemesd/boothlistbyacno/?ac_no=${val}`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setData(response);
      });
  }, []);

  const dispatch = useDispatch();

  const handleNavigateDetails = async (item, query) => {
    await dispatch(BoothDetails(item));
    navigate(`/schemelist?${query}=${item.booth_no}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div>
        <h1 className="h3 mb-2 text-gray-800">
          Booth List - {cardDetails.ac_no} - {cardDetails.eng_ac_name} (
          {cardDetails.ac_name})
        </h1>

        {loading ? (
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
            {data.length > 0 &&
              data.map((item, index) => (
                <div
                  key={item.id}
                  className="col-xl-3 col-md-6 mb-4"
                  onClick={() => handleNavigateDetails(item, "booth_no")}
                >
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            {item.booth_no}- {item.booth_name}
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {item.eng_booth_name}
                          </div>
                          <div className="h6 mb-0 font-weight-bold text-gray-800">
                            {/* {item.total_beneficiaries} */}
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

export default BoothListCards;
