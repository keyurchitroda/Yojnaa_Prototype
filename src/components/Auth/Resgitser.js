import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Resgitser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpVerifyScreen, setOtpVerifyScreen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    const reqData = {
      username: `${firstName}${lastName}`,
      email: email,
      mobile_number: mobile,
      password: password,
      current_password: confirmPassword,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData),
    };

    setIsLoading(true);

    fetch(`${API_URL}/account/signup/`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 1) {
          setIsLoading(false);
          setOtpVerifyScreen(true);
          toastr.success(response.message);
        } else {
          setIsLoading(false);

          handleErrorResponse(response.error);
        }
      });
  };

  const handleErrorResponse = (error) => {
    if (error.email) {
      toastr.error(error.email[0]);
    }
    if (error.mobile_number) {
      toastr.error(error.mobile_number[0]);
    }
    if (error.username) {
      toastr.error(error.username[0]);
    }
  };

  const handleOTPVeirfy = () => {
    const reqData = {
      email: email,
      otp: otpValue,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData),
    };

    setIsLoading(true);
    fetch(`${API_URL}/account/verify-otp/`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 1) {
          setIsLoading(false);

          navigate("/login");

          toastr.success(response.message);
        } else {
          setIsLoading(false);

          toastr.error(response.message);
        }
      });
  };

  const getValidation = () => {
    let isValid = false;
    if (
      !firstName ||
      !lastName ||
      !mobile ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      isValid = true;
    }
    return isValid;
  };

  const getOtpValidation = () => {
    let isValid = false;
    if (!otpValue) {
      isValid = true;
    }
    return isValid;
  };

  return (
    <div className="">
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {!otpVerifyScreen ? (
              <div className="row">
                <div className="col-lg-2 d-none d-lg-block "></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Create an Account!
                      </h1>
                    </div>
                    <form className="user">
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleFirstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleLastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Mobile Number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleRepeatPassword"
                            placeholder="Repeat Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <a
                        href="#"
                        className="btn btn-primary btn-user btn-block"
                        onClick={handleRegister}
                        style={
                          getValidation()
                            ? { pointerEvents: "none", opacity: "0.5" }
                            : {}
                        }
                      >
                        {isLoading ? "Loading..." : "Register Account"}
                      </a>
                      <hr />
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="small" onClick={() => navigate("/login")}>
                        Already have an account? Login!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-2 d-none d-lg-block "></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">OTP Veirfy</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputEmail1"
                          placeholder="Otp Veirfy"
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value)}
                        />
                      </div>
                      <a
                        href="#"
                        className="btn btn-primary btn-user btn-block"
                        onClick={handleOTPVeirfy}
                        style={
                          getOtpValidation()
                            ? { pointerEvents: "none", opacity: "0.5" }
                            : {}
                        }
                      >
                        {isLoading ? "Loading..." : "Verify OTP"}
                      </a>
                      <hr />
                    </form>
                    <hr />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resgitser;
