import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const style = {
    // Adding media query..
    "@media (max-width: 1200px)": {
      maxWidth: "1140px",
    },
    "@media (max-width: 768px)": {
      maxWidth: "720px",
    },
    "@media (max-width: 576)": {
      maxWidth: "540px",
    },
    width: "100%",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
  };

  const style2 = {
    // Adding media query..
    "@media (max-width: 1200px)": {
      fontSize: "18px",
    },
    "@media (max-width: 768px)": {
      fontSize: "18px",
    },
    "@media (max-width: 576)": {
      fontSize: "18px",
    },
    color: "#0f106d",
  };

  return (
    <>
      {/* {header} */}
      <div className="navigation">
        <div
          className="container-fuild"
          style={{ borderBottom: "1px solid #ebe8e8", padding: "5px" }}
        >
          <div className="conatainer">
            <div className="row m-0">
              <div class="col-md-12" style={{ color: "#2c3b42" }}>
                Government of Gujarat
                <a href="/login" style={{ float: " right", color: "#ff5c01" }}>
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="container" style={style}>
          <div class="row">
            <div class="col-md-6">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#">
                  <img
                    src="https://gandhinagardm.in/newassets/images/coat_arms_india.png"
                    alt="Logo"
                  />
                  <span style={style2}> જિલ્લા વહીવટીતંત્ર, ગાંધીનગર</span>
                </a>
              </nav>
            </div>
            <div class="col-md-6">
              <nav
                class="navbar navbar-expand-lg"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <a class="navbar-brand" href="/">
                  <img
                    src="https://gandhinagardm.in/newassets/images/digital-india.png"
                    alt="Logo"
                  />
                </a>
                <a class="navbar-brand" href="/">
                  <img
                    src="https://gandhinagardm.in/newassets/images/aajadi_logo.png"
                    alt="Logo"
                  />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* header2 */}
      <div className="h-25">
        <div
          id="parallax"
          class="header-content d-flex align-items-center img-fluid justify-content-center"
          // style={{
          //   backgroundImage: `url(
          //   "https://gandhinagardm.in/newassets/images/slider1.png"
          // )`,
          //   height: "50vh",
          //   width: "100%",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "contain",
          //   transform: "translate3d(0px, 0px, 0px)",
          //   transformStyle: "preserve-3d",
          //   backfaceVisibility: "hidden",
          // }}
        >
          <img
            src="https://gandhinagardm.in/newassets/images/slider1.png"
            alt="Logo"
            class="img-fluid"
          />
        </div>
      </div>
      {/* COntent */}
      <div
        className="services-area gray-bg pt-50 pb-100"
        style={{ paddingTop: "50px", paddingBottom: "100px" }}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div
                class="section-title text-center pb-10"
                style={{ paddingBottom: "10px" }}
              >
                <h2
                  class="title"
                  style={{
                    fontSize: "25px",
                    color: "#ff5722",
                    fontWeight: "700",
                  }}
                >
                  વ્યક્તિગત સરકારી યોજનાઓ, ગુજરાત સરકાર
                </h2>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-6">
              <a href="/dashboard" style={{ width: "100%" }}>
                <div
                  class="single-service text-center mt-10"
                  style={{
                    backgroundColor: "#257228",
                    marginTop: "10px",
                    border: "1px solid #eceff8",
                    borderRadius: "5px",
                    padding: "25px",
                    transition: "all 0.3s ease-out 0s",
                  }}
                >
                  <div class="service-icon">
                    <img src="https://gandhinagardm.in/newassets/images/icon-2.png" />
                  </div>
                  <div class="service-content" style={{ marginTop: "11px" }}>
                    <h4
                      class="service-title"
                      style={{ fontSize: "26px", color: "#ffeb3b" }}
                    >
                      તમને મળવાપાત્ર યોજનાઓ જાણો
                    </h4>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-6">
              <a
                href="department.php"
                style={{
                  width: "100%",
                  color: "#0c14ff",
                  textDecoration: "underline",
                }}
              ></a>
              <div class="text-center mt-10" style={{ marginTop: "10px" }}>
                <a
                  href="/"
                  style={{
                    width: "100%",
                    color: "#0c14ff",
                    textDecoration: "underline",
                  }}
                >
                  <h4 style={{ color: "#0c14ff" }}>વિભાગવાર યોજનાઓ</h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer content 1 */}

      <div
        style={{
          backgroundColor: "#e35c1c",
          color: "#fbfbfb",
          paddingTop: "50px",
          paddingBottom: "5px",
        }}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12">
              <p>
                ગુજરાત રાજ્યના છેવાડાના માનવીને એની અસહાયતાના નિવારણને ટોચઅગ્રતા
                આપી તેના ઉત્કર્ષલક્ષી વિચારધારાની પ્રેરણાથી કોઈપણ જાતની મુશ્કેલી
                વિના સરળતાથી તેને સરકારી યોજનાકીય લાભોની માહિતી પ્રાપ્ત કરી શકે
                તે આ વેબસાઈટનો મુખ્ય ઉદ્દેશ્ય છે.
              </p>
              <p>
                આ વેબસાઈટ પર ગુજરાત સરકારના કુલ ૧૨ વિભાગોની કુલ ૧૬૧ યોજનાઓની
                માહિતી આપવામાં આવી છે. આ વેબસાઈટ પર દરેક વ્યક્તિ વિભાગવાર વિવિધ
                યોજનાની માહિતી મેળવી શકે છે. તમેજ તે કઈ યોજના માટે પાત્રતા ધરાવે
                છે તે જાણી શકે છે.{" "}
              </p>
              <p>
                વ્યક્તિ પોતાની ઉમર, જાતિ, જ્ઞાતિ, શૈક્ષણિક લાયકાત, રાશન પ્રકાર,
                વ્યવસાય, વાર્ષિક આવક વગેરેના આધારે પોતે ગુજરાત સરકારની કઈ કઈ
                યોજનાનો લાભ મેળવી શકે તે જાણી શકે છે. દરેક યોજનાનો લાભ મેળવવા
                માટે લાયકાતના ધોરણો, ફોર્મ સાથે જોડવાના આધારપુરાવાની યાદી, જે તે
                વિભાગ-કચેરીના સંપર્કની માહિતી, અરજી કેવી રીતે કરવી તેની જાણકારી
                સરળતાથી મેળવી શકે છે.{" "}
              </p>
              <p>
                આશા રાખીએ કે જરૂરિયાતમંદ દરેક વ્યક્તિને આ વેબસાઈટના માધ્યમથી
                મહત્તમ સરકારી યોજનાના લાભ મેળવવામાં ઉપયોગી પુરવાર થાય.{" "}
              </p>
              <p style={{ textAlign: "right" }}>
                (એચ.કે. કોયા I.A.S.)
                <br />
                કલેકટર અને જિલ્લા મેજીસ્ટ્રેટ
                <br />
                ગાંધીનગર જિલ્લો
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* final footer */}
      <footer id="footer" class="footer-area">
        <div
          class="footer-copyright pb-20"
          style={{ paddingBottom: "20px", backgroundColor: "#1c2940" }}
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div
                  class="copyright-text pt-20"
                  style={{ paddingBottom: "20px", color: "#fff" }}
                >
                  <p>
                    <span style={{ float: "left" }}>
                      2021 © District Administration, Gandhinagar
                    </span>
                    <span style={{ float: "right" }}>
                      Site Visitor :{" "}
                      <img
                        src="https://hitwebcounter.com/counter/counter.php?page=7933889&amp;style=0006&amp;nbdigits=7&amp;type=page&amp;initCount=245142"
                        title="Site Visited"
                        alt="Site Visited"
                        border="0"
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>
        {`
          @media (max-width: 1200px) {
            .container {
              max-width: 1140px;
            }
            /* Add other responsive styles here */
          }
  
          @media (max-width: 768px) {
            .container {
              max-width: 720px;
            }
            /* Adjust navigation, header, and other sections for mobile */
            .navigation {
              padding: 10px;
            }
            .header-content {
              // Adjust styles for the header content
            }
            .single-service {
              // Adjust styles for service card
            }
            /* Add other responsive styles here */
          }
        `}
      </style>
    </>
  );
};

export default Home;
