import React, { useEffect, useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Card = () => {
  const [arrayCard, setArrayCard] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://15.206.117.255:8000/schemesd/scheme-counts/", requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setArrayCard(response.data);
      });
  }, []);

  // const arrayCard = [
  //   {
  //     id: "1",
  //     title: "EARNINGS (MONTHLY)1",
  //     count: 10,
  //   },
  //   {
  //     id: "2",
  //     title: "EARNINGS (MONTHLY)2",
  //     count: 11,
  //   },
  //   {
  //     id: "3",
  //     title: "EARNINGS (MONTHLY)3",
  //     count: 12,
  //   },
  //   {
  //     id: "4",
  //     title: "EARNINGS (MONTHLY)4",
  //     count: 13,
  //   },
  //   {
  //     id: "5",
  //     title: "EARNINGS (MONTHLY)5",
  //     count: 14,
  //   },
  //   {
  //     id: "6",
  //     title: "EARNINGS (MONTHLY)6",
  //     count: 15,
  //   },
  //   {
  //     id: "7",
  //     title: "EARNINGS (MONTHLY)7",
  //     count: 16,
  //   },
  //   {
  //     id: "8",
  //     title: "EARNINGS (MONTHLY)8",
  //     count: 17,
  //   },
  //   {
  //     id: "9",
  //     title: "EARNINGS (MONTHLY)9",
  //     count: 18,
  //   },
  // ];

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

  return (
    <Carousel
      showArrows={true}
      autoFocus={true}
      emulateTouch={true}
      autoPlay={true}
      infiniteLoop={true}
      onChange={handleCarouselChange}
      transitionTime={1000}
    >
      {[...Array(totalSets)].map((_, setIndex) => (
        <div key={setIndex} className="row">
          {getVisibleCards().map((item, index) => (
            <div key={item.id} className="col-xl-3 col-md-6 mb-4">
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
  );
};

export default Card;
