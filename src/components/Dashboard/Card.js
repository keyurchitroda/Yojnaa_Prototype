import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { RotatingTriangles } from "react-loader-spinner";

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

  const cardsPerPage = 4;
  const totalSets = Math.ceil(arrayCard.length / cardsPerPage);

  const [currentSet, setCurrentSet] = useState(0);

  const handleCarouselChange = (index) => {
    setCurrentSet(index);
  };

  const getVisibleCards = () => {
    const startIndex = currentSet * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return arrayCard.slice(startIndex, endIndex);
  };

  const cardsPerPage2 = 4;
  const totalSets2 = Math.ceil(arrayCard2.length / cardsPerPage2);

  const [currentSet2, setCurrentSet2] = useState(0);

  const handleCarouselChange2 = (index) => {
    setCurrentSet2(index);
  };

  const getVisibleCards2 = () => {
    const startIndex = currentSet2 * cardsPerPage2;
    const endIndex = startIndex + cardsPerPage2;
    return arrayCard2.slice(startIndex, endIndex);
  };

  const handleNavigateDetails = (item, query) => {
    if (query == "scheme_name") {
      navigate(`/details?${query}=${item.scheme_name}`);
    } else {
      navigate(`/details?${query}=${item.ac_name}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
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
          <Carousel
            showArrows={true}
            autoFocus={true}
            emulateTouch={true}
            infiniteLoop={true}
            onChange={handleCarouselChange}
            transitionTime={1000}
          >
            {[...Array(totalSets)].map((_, setIndex) => (
              <div key={setIndex} className="row">
                {getVisibleCards().map((item, index) => (
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
            ))}
          </Carousel>
        )}
      </div>
      <div>
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
          <Carousel
            showArrows={true}
            autoFocus={true}
            emulateTouch={true}
            infiniteLoop={true}
            onChange={handleCarouselChange2}
            transitionTime={1000}
          >
            {[...Array(totalSets2)].map((_, setIndex) => (
              <div key={setIndex} className="row">
                {getVisibleCards2().map((item, index) => (
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
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Card;
