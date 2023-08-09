import React from "react";
import { RotatingTriangles } from "react-loader-spinner";
import Pagination from "../pagination/Pagination";
import { API_URL } from "../config";
import { useState } from "react";
import { useEffect } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const ViewAllScheme = ({ setViewAllModal }) => {
  let items = {};

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currenPage, setCurrenPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/newdat/yojnadetails/?page=${currenPage}`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setData(_.get(response, "results", []));
        setTotalCount(_.get(response, "count", []));
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/newdat/yojnadetails/?page=${page}`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setData(_.get(response, "results", []));
        setCurrenPage(page);
        setLoading(false);
      });
  };

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

      <div class="card shadow mb-4">
        <div class="card-body">
          <a
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              color: "#0c14ff",
              textDecoration: "underline",
            }}
          >
            Back To Home Page
          </a>
          <div class="table-responsive" style={{ padding: "30px" }}>
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>યોજનાનું નામ</th>
                  <th>વિભાગનું નામ</th>
                  <th>સહાયના ધોરણો (કિટ/નાણાંકીય) One Time/Monthly</th>
                  <th>લાયકાતના ધોરણો</th>
                  <th>ફોર્મ સાથે જોડવાના આધાર પુરાવાની યાદી</th>
                  <th>કચેરીનો સંપર્ક નંબર</th>
                  <th>અરજી કરવાની રીત</th>
                  <th>લીંક</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>યોજનાનું નામ</th>
                  <th>વિભાગનું નામ</th>
                  <th>સહાયના ધોરણો (કિટ/નાણાંકીય) One Time/Monthly</th>
                  <th>લાયકાતના ધોરણો</th>
                  <th>ફોર્મ સાથે જોડવાના આધાર પુરાવાની યાદી</th>
                  <th>કચેરીનો સંપર્ક નંબર</th>
                  <th>અરજી કરવાની રીત</th>
                  <th>લીંક</th>
                </tr>
              </tfoot>
              <tbody>
                {loading ? (
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
                  _.map(data ? data : [], (items, index) => (
                    <tr>
                      <td>{items.yojna ? items.yojna : "N/A"}</td>
                      <td>{items.department ? items.department : "N/A"}</td>
                      <td>
                        {items.norms_of_assistance
                          ? items.norms_of_assistance
                          : "N/A"}
                      </td>
                      <td>
                        {items.eligibility_criteria
                          ? items.eligibility_criteria
                          : "N/A"}
                      </td>
                      <td>
                        {items.supporting_evidence
                          ? items.supporting_evidence
                          : "N/A"}
                      </td>
                      <td>
                        {items.office_contact_no
                          ? items.office_contact_no
                          : "N/A"}
                      </td>

                      <td>{items.how_to_apply ? items.how_to_apply : "N/A"}</td>
                      <td>{items.link ? items.link : "N/A"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
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
    </>
  );
};

export default ViewAllScheme;
