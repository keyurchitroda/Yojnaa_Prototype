import React, { useState } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import { useSelector } from "react-redux";
import _ from "lodash";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

const YojnaFormAction = () => {
  const [formsData, setFormsData] = useState([
    { name: "", age: "", mobile: "" },
  ]);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const yojnaForms = useSelector((state) => state.reducer.yojnaForms);

  const fullAddress = `${_.get(
    yojnaForms,
    "singleBenificaryRecord.house_no",
    ""
  )} ${_.get(yojnaForms, "singleBenificaryRecord.landmark", "")} ${_.get(
    yojnaForms,
    "singleBenificaryRecord.area_id",
    ""
  )}`;

  const fullName = `${_.get(
    yojnaForms,
    "singleBenificaryRecord.benificiary_f_name",
    ""
  )} ${_.get(
    yojnaForms,
    "singleBenificaryRecord.benificiary_m_name",
    ""
  )} ${_.get(yojnaForms, "singleBenificaryRecord.benificiary_surname", "")}`;

  const [districtName, setDistricName] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.dist_name", "")
  );
  const [talukaName, setTalukaName] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.taluka_name", "")
  );
  const [villageName, setVillageName] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.village_name", "")
  );
  const [address, setAddress] = useState(fullAddress);
  const [headName, setHeadName] = useState(fullName);
  const [age, setAge] = useState("");
  const [totlaIncome, setTotalIncome] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.total_income", "")
  );
  const [cast, setCast] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.caste", "")
  );
  const [isIncludedSECC, setIsIncludedSECC] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.secc", "")
  );
  const [score, setScore] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.secc_score", "")
  );
  const [categoryOfRationCard, setCategoryOfRationCard] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.rationcard_category", "")
  );
  const [isAddharPending, setIsAddharPending] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.is_addhar_pending", "")
  );
  const [totalMemberAdharPending, setTotalMemberAdharPending] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.pending_members", "")
  );
  const [isDisability, setIsDisability] = useState("");
  const [percentageOfDisability, setPercentageOfDisability] = useState(
    _.get(yojnaForms, "singleBenificaryRecord.disability_score", "")
  );

  const handleChange = (index, field, value) => {
    const updatedForms = formsData.map((form, i) => {
      if (i === index) {
        return { ...form, [field]: value };
      }
      return form;
    });
    setFormsData(updatedForms);
  };

  const addForm = () => {
    setFormsData([...formsData, { name: "", age: "", mobile: "" }]);
  };

  const removeForm = (index) => {
    const updatedForms = formsData.filter((form, i) => i !== index);
    setFormsData(updatedForms);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate districtName
    if (!districtName) {
      newErrors.districtName = "District is required";
    }

    // Validate talukaName
    if (!talukaName) {
      newErrors.talukaName = "Taluka is required";
    }

    // Validate villageName
    if (!villageName) {
      newErrors.villageName = "Village is required";
    }

    // Validate address
    if (!address) {
      newErrors.address = "Address is required";
    }

    // Validate headName
    if (!headName) {
      newErrors.headName = "Head of the family name is required";
    }

    // // Validate age
    // if (!age) {
    //   newErrors.age = "Age is required";
    // }

    // Validate totlaIncome
    if (!totlaIncome) {
      newErrors.totlaIncome = "Total family income is required";
    }

    // Validate cast
    if (!cast) {
      newErrors.cast = "Caste is required";
    }

    // Validate isIncludedSECC
    if (!isIncludedSECC) {
      newErrors.isIncludedSECC = "SECC inclusion is required";
    }

    // Validate score
    if (!score) {
      newErrors.score = "Score is required";
    }

    // Validate categoryOfRationCard
    if (!categoryOfRationCard) {
      newErrors.categoryOfRationCard = "Category of Ration card is required";
    }

    // Validate isAddharPending
    if (!isAddharPending) {
      newErrors.isAddharPending = "Aadhaar card pending is required";
    }

    // Validate totalMemberAdharPending
    if (isAddharPending === "Yes" && !totalMemberAdharPending) {
      newErrors.totalMemberAdharPending =
        "Total members pending for Aadhaar card is required";
    }

    // Validate isDisability
    // if (!isDisability) {
    //   newErrors.isDisability = "Disability information is required";
    // }

    // Validate percentageOfDisability
    if (isDisability === "Yes" && !percentageOfDisability) {
      newErrors.percentageOfDisability = "Percentage of disability is required";
    }

    // // Validate formsData array
    // const formErrors = formsData.map((form, index) => {
    //   const errors = {};
    //   if (!form.name.trim()) {
    //     errors.name = `Name for form ${index + 1} is required`;
    //   }
    //   if (!form.age.trim()) {
    //     errors.age = `Age for form ${index + 1} is required`;
    //   }
    //   if (!form.mobile.trim()) {
    //     errors.mobile = `Mobile number for form ${index + 1} is required`;
    //   }
    //   return errors;
    // });
    // if (formErrors.length > 0) {
    //   newErrors.formsData = formErrors;
    // }

    setErrors(newErrors);

    // Return true if the form is valid (no errors)
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm(); // Call the validation function to get errors
    setErrors(newErrors); // Update the errors state with the validation result

    // Check if there are any errors, if not, proceed with form submission

    if (Object.keys(newErrors).length === 0) {
      const reqData = {
        total_income: totlaIncome,
        caste: cast,
        secc: isIncludedSECC,
        secc_score: score,
        rationcard_category: categoryOfRationCard,
        is_addhar_pending: isAddharPending,
        pending_members:
          isAddharPending === "Yes" ? totalMemberAdharPending : null,
        disability_score:
          isDisability === "Yes" ? percentageOfDisability : null,
      };

      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      };
      let apiUrl = `${API_URL}/schemesd/benificiary/${_.get(
        yojnaForms,
        "singleBenificaryRecord.id",
        ""
      )}/`;
      fetch(apiUrl, requestOptions)
        .then((res) => res.json())
        .then(async (response) => {
          console.log(response);
          navigate("/yojnaformlist");
        });
      // Perform your form submission logic here
    } else {
      console.log("Form has errors. Please check the fields.");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      {yojnaForms.isLoading ? (
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
          {/* step1 */}
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="exampleInputEmail1">Distric (જિલ્લો)</label>
              <input
                type="text"
                class="form-control"
                id="district"
                aria-describedby="district"
                placeholder="જિલ્લો"
                value={districtName}
                onChange={(e) => setDistricName(e.target.value)}
                disabled
              />
              {errors.districtName && (
                <div className="error-message">{errors.districtName}</div>
              )}
            </div>
            <div class="form-group col-md-4">
              <label for="inputPassword4">તાલુકો</label>
              <input
                type="text"
                class="form-control"
                id="taliko"
                placeholder="તાલુકો"
                value={talukaName}
                onChange={(e) => setTalukaName(e.target.value)}
                disabled
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputPassword4"> Village (ગામ)</label>
              <input
                type="text"
                class="form-control"
                id="village"
                placeholder="ગામ"
                value={villageName}
                onChange={(e) => setVillageName(e.target.value)}
                disabled
              />
            </div>
          </div>

          {/* step2 */}
          <div class="form-group">
            <label for="inputAddress">સરનામું (Address)</label>
            <input
              type="text"
              class="form-control"
              id="address"
              placeholder="સરનામું"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled
            />
          </div>

          {/* step3 */}

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">
                Name of the head of the family (કુટુંબ ના વડા નું નામ)
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="name"
                placeholder="કુટુંબ ના વડા નું નામ"
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
                disabled
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Age (ઉંમર)</label>
              <input
                type="number"
                class="form-control"
                id="age"
                placeholder="ઉંમર"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled
              />
            </div>
          </div>

          {/* step 4 */}

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">
                Total family income (કુટુંબની કુલ આવક)
              </label>
              <input
                type="text"
                class="form-control"
                id="total_income"
                aria-describedby="total_income"
                placeholder="કુટુંબની કુલ આવક"
                value={totlaIncome}
                onChange={(e) => setTotalIncome(e.target.value)}
              />
              {errors.totlaIncome && (
                <div className="error-message text-danger">
                  {errors.totlaIncome}
                </div>
              )}
            </div>
            <div class="form-group col-md-6 ">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label for="inputPassword4">Caste (જાતિ)</label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5px",
                  }}
                >
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="gen"
                      name="customRadioInline1"
                      class="custom-control-input"
                      value="GENERAL"
                      checked={cast === "GENERAL"}
                      onChange={(e) => setCast(e.target.value)}
                    />
                    <label class="custom-control-label" for="gen">
                      GENERAL
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="obc"
                      name="customRadioInline1"
                      class="custom-control-input"
                      value="OBC"
                      checked={cast === "OBC"}
                      onChange={(e) => setCast(e.target.value)}
                    />
                    <label class="custom-control-label" for="obc">
                      OBC
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="st"
                      name="customRadioInline1"
                      class="custom-control-input"
                      value="ST"
                      checked={cast === "ST"}
                      onChange={(e) => setCast(e.target.value)}
                    />
                    <label class="custom-control-label" for="st">
                      ST
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="sc"
                      name="customRadioInline1"
                      class="custom-control-input"
                      value="SC"
                      checked={cast === "SC"}
                      onChange={(e) => setCast(e.target.value)}
                    />
                    <label class="custom-control-label" for="sc">
                      SC
                    </label>
                  </div>
                </div>
                {errors.cast && (
                  <div className="error-message text-danger">{errors.cast}</div>
                )}
              </div>
            </div>
          </div>

          {/* step 5 */}

          <div class="form-row">
            <div class="form-group col-md-6 ">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label for="inputPassword4">
                  Included in SECC (SECC માં સમાવેશ થયેલ છે)
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5px",
                  }}
                >
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="secc_yes"
                      name="secc_yes"
                      class="custom-control-input"
                      value="Yes"
                      checked={isIncludedSECC === "Yes"}
                      onChange={(e) => setIsIncludedSECC(e.target.value)}
                    />
                    <label class="custom-control-label" for="secc_yes">
                      YES
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="secc_no"
                      name="secc_no"
                      class="custom-control-input"
                      value="No"
                      checked={isIncludedSECC === "No"}
                      onChange={(e) => setIsIncludedSECC(e.target.value)}
                    />
                    <label class="custom-control-label" for="secc_no">
                      No
                    </label>
                  </div>
                </div>
                {errors.isIncludedSECC && (
                  <div className="error-message text-danger">
                    {errors.isIncludedSECC}
                  </div>
                )}
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Score (સ્કોર)</label>
              <input
                type="number"
                class="form-control"
                id="score"
                aria-describedby="સ્કોર"
                placeholder="સ્કોર"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
              {errors.score && (
                <div className="error-message text-danger">{errors.score}</div>
              )}
            </div>
          </div>

          {/* step 6 */}

          <div class="form-group col-md-6 ">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label for="inputPassword4">
                રેશનકાર્ડ કઇ કેટેગરીનું ધરાવે છે.? (Ration card belongs to which
                category?)
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "5px",
                }}
              >
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="apl1"
                    name="apl1"
                    class="custom-control-input"
                    value="APL-1"
                    checked={categoryOfRationCard === "APL-1"}
                    onChange={(e) => setCategoryOfRationCard(e.target.value)}
                  />
                  <label class="custom-control-label" for="apl1">
                    APL-1
                  </label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="apl2"
                    name="apl2"
                    class="custom-control-input"
                    value="APL-2"
                    checked={categoryOfRationCard === "APL-2"}
                    onChange={(e) => setCategoryOfRationCard(e.target.value)}
                  />
                  <label class="custom-control-label" for="apl2">
                    APL-2
                  </label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="bpl"
                    name="bpl"
                    class="custom-control-input"
                    value="BPL"
                    checked={categoryOfRationCard === "BPL"}
                    onChange={(e) => setCategoryOfRationCard(e.target.value)}
                  />
                  <label class="custom-control-label" for="bpl">
                    BPL
                  </label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="અંત્યોદય"
                    name="અંત્યોદય"
                    class="custom-control-input"
                    value="અંત્યોદય"
                    checked={categoryOfRationCard === "અંત્યોદય"}
                    onChange={(e) => setCategoryOfRationCard(e.target.value)}
                  />
                  <label class="custom-control-label" for="અંત્યોદય">
                    અંત્યોદય
                  </label>
                </div>
              </div>
              {errors.categoryOfRationCard && (
                <div className="error-message text-danger">
                  {errors.categoryOfRationCard}
                </div>
              )}
            </div>
          </div>

          {/* step 7 */}
          <div class="form-row">
            <div class="form-group col-md-6 ">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label for="inputPassword4">
                  આધારકાર્ડ કોઇ સભ્યનું બાકી છે કે કેમ? હા/ના જો હા તો કેટલા (Is
                  Aadhaar card due to any member? Yes/No If yes how many?)
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5px",
                  }}
                >
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="yes1"
                      name="adhar_yes"
                      class="custom-control-input"
                      value="Yes"
                      checked={isAddharPending === "Yes"}
                      onChange={(e) => setIsAddharPending(e.target.value)}
                    />
                    <label class="custom-control-label" for="yes1">
                      YES
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="no1"
                      name="adhar_no"
                      class="custom-control-input"
                      value="No"
                      checked={isAddharPending === "No"}
                      onChange={(e) => setIsAddharPending(e.target.value)}
                    />
                    <label class="custom-control-label" for="no1">
                      No
                    </label>
                  </div>
                </div>
                {errors.isAddharPending && (
                  <div className="error-message text-danger">
                    {errors.isAddharPending}
                  </div>
                )}
              </div>
            </div>

            {isAddharPending === "Yes" && (
              <div class="form-group col-md-6">
                <label for="exampleInputEmail1">
                  Total number of members that remain the adharcard (આધારકાર્ડ
                  બાકી રહેલા સભ્યોની કુલ સંખ્યા)
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="total_adharcard_remian_number"
                  aria-describedby="આધારકાર્ડ બાકી રહેલા સભ્યોની કુલ સંખ્યા"
                  placeholder="આધારકાર્ડ બાકી રહેલા સભ્યોની કુલ સંખ્યા"
                  value={totalMemberAdharPending}
                  onChange={(e) => setTotalMemberAdharPending(e.target.value)}
                />
                {errors.totalMemberAdharPending && (
                  <div className="error-message text-danger">
                    {errors.totalMemberAdharPending}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* step 8 */}
          <div class="form-row">
            <div class="form-group col-md-6 ">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label for="inputPassword4">
                  કુટુંબની કોઇ વ્યક્તિ વિકલાંગ છે કે કેમ? હા/ના જો હા તો
                  િવકલાંકતાની ટકાવારી % ?(Does any family member have a
                  disability? Yes/No If yes percentage of discrimination %?)
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5px",
                  }}
                >
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="yes2"
                      name="disability_yes"
                      class="custom-control-input"
                      value="Yes"
                      checked={isDisability === "Yes"}
                      onChange={(e) => setIsDisability(e.target.value)}
                    />
                    <label class="custom-control-label" for="yes2">
                      Yes
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="no2"
                      name="disability_yes"
                      class="custom-control-input"
                      value="No"
                      checked={isDisability === "No"}
                      onChange={(e) => setIsDisability(e.target.value)}
                    />
                    <label class="custom-control-label" for="no2">
                      No
                    </label>
                  </div>
                </div>
                {errors.isDisability && (
                  <div className="error-message text-danger">
                    {errors.isDisability}
                  </div>
                )}
              </div>
            </div>

            {isDisability === "Yes" && (
              <div class="form-group col-md-6">
                <label for="exampleInputEmail1">
                  percentage of discrimination % ( િવકલાંકતાની ટકાવારી %)
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="total_perc_discrimination"
                  aria-describedby=" િવકલાંકતાની ટકાવારી %"
                  placeholder=" િવકલાંકતાની ટકાવારી %"
                  value={percentageOfDisability}
                  onChange={(e) => setPercentageOfDisability(e.target.value)}
                />
                {errors.percentageOfDisability && (
                  <div className="error-message text-danger">
                    {errors.percentageOfDisability}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* steo 9 */}
          {/* <div class="form-group col-md-12">
            <div className="row">
              <label for="exampleInputEmail1">
                Details of total family members (કુટુંબના કુલ સભ્યોની વિગત )
              </label>
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginLeft: "10px" }}
                onClick={addForm}
              >
                Add Form
              </button>
            </div>
            <div className="row mt-2">
              {formsData.map((form, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Form {index + 1}</h4>
                      <div className="form-group">
                        <label htmlFor={`name${index}`}>Name (નામ)</label>
                        <input
                          type="text"
                          className="form-control"
                          id={`name${index}`}
                          value={form.district}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                          placeholder="નામ"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`age_${index}`}>Age (ઉંમર)</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`age_${index}`}
                          value={form.taluko}
                          onChange={(e) =>
                            handleChange(index, "age", e.target.value)
                          }
                          placeholder="ઉંમર"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`mobile_${index}`}>
                          Mobile Number (મોબાઈલ)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`mobile_${index}`}
                          value={form.village}
                          onChange={(e) =>
                            handleChange(index, "mobile", e.target.value)
                          }
                          placeholder="મોબાઈલ"
                          maxLength="10"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeForm(index)}
                      >
                        Remove Form
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <button onClick={handleSubmit} type="submit" class="btn btn-primary">
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default YojnaFormAction;
