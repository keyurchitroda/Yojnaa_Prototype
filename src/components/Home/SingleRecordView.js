import React from "react";
import { API_URL } from "../config";
import { useState } from "react";
import { useEffect } from "react";
import _ from "lodash";
import { RotatingTriangles } from "react-loader-spinner";

const SingleRecordView = ({ newId, setSingleRecordViewModal }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let apiUrl = `${API_URL}/newdat/yojnadetails/${newId}`;

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        const entries = Object.entries(response);

        const keysToShow = [
          "yojna",
          "department",
          "norms_of_assistance",
          "eligibility_criteria",
          "supporting_evidence",
          "office_contact_no",
          "how_to_apply",
          "link",
        ]; // Only display 'id' and 'beneficiary_id'

        const filteredEntries = entries.filter(([key, _]) =>
          keysToShow.includes(key)
        );
        setData(filteredEntries);
        setLoading(false);
      });
  }, []);

  const handleCloseModal = () => {
    setSingleRecordViewModal(false);
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">details</h5>
            <button type="button" className="close" onClick={handleCloseModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: "#f0f0f0" }}>
            <div className="form-group">
              <table className="table">
                <table className="table">
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
                      data.map(([key, value]) => (
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
  );
};

export default SingleRecordView;
