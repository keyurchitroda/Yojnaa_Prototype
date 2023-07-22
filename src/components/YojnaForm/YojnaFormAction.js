import React, { useState } from "react";

const YojnaFormAction = () => {
  const [formsData, setFormsData] = useState([
    { name: "", age: "", mobile: "" },
  ]);

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

  return (
    <div style={{ padding: "50px" }}>
      <form>
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
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputPassword4">તાલુકો</label>
            <input
              type="text"
              class="form-control"
              id="taliko"
              placeholder="તાલુકો"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputPassword4"> Village (ગામ)</label>
            <input
              type="text"
              class="form-control"
              id="village"
              placeholder="ગામ"
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
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Age (ઉંમર)</label>
            <input
              type="number"
              class="form-control"
              id="age"
              placeholder="ઉંમર"
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
            />
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
                  />
                  <label class="custom-control-label" for="sc">
                    SC
                  </label>
                </div>
              </div>
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
                    id="yes"
                    name="customRadioInline1"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label" for="yes">
                    YES
                  </label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="no"
                    name="customRadioInline1"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label" for="no">
                    No
                  </label>
                </div>
              </div>
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
            />
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
                  name="customRadioInline1"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="apl1">
                  APL-1
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="apl2"
                  name="customRadioInline1"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="apl2">
                  APL-2
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="bpl"
                  name="customRadioInline1"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="bpl">
                  BPL
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="અંત્યોદય"
                  name="customRadioInline1"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="અંત્યોદય">
                  અંત્યોદય
                </label>
              </div>
            </div>
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
                    name="customRadioInline_yes"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label" for="yes1">
                    YES
                  </label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="no1"
                    name="customRadioInline_yes"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label" for="no1">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group col-md-6">
            <label for="exampleInputEmail1">
              Total number of members that remain the adharcard (આધારકાર્ડ બાકી
              રહેલા સભ્યોની કુલ સંખ્યા)
            </label>
            <input
              type="number"
              class="form-control"
              id="total_adharcard_remian_number"
              aria-describedby="આધારકાર્ડ બાકી રહેલા સભ્યોની કુલ સંખ્યા"
              placeholder="આધારકાર્ડ બાકી રહેલા સભ્યોની કુલ સંખ્યા"
            />
          </div>
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
                    name="customRadioInline_yes"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label" for="yes2">
                    YES
                  </label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="no2"
                    name="customRadioInline_yes"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label" for="no2">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

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
            />
          </div>
        </div>

        {/* steo 9 */}
        <div class="form-group col-md-12">
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
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default YojnaFormAction;
