import React, { useState } from "react";
import "../../styles/style.css";
import { Navbar } from "./Navbar";
import Dahsboard from "../Dashboard/Dahsboard";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSidebadeStyle } from "../../redux/slices/styleSlice";

const Sidebar = ({ componentName }) => {
  // const [style, setStyle] = useState(
  //   "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  // );

  const currentStyle = useSelector(
    (state) => state.reducer.sidebarStyle.currentSidebarStyle
  );

  const dispatch = useDispatch();

  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      currentStyle ==
      "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
      dispatch(
        setSidebadeStyle(
          "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        )
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
      dispatch(
        setSidebadeStyle(
          "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        )
      );
    }
  };

  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.clear("token");
  };

  const newStyle = localStorage.getItem("styleToggle");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // setSelectedImage(URL.createObjectURL(file));
      setSelectedImage(file);
    } else {
      // Show an error message or perform any desired action for invalid file types
      toast.error("Invalid file type. Please select a valid XLSX file", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const changeStyle1 = () => {
    if (
      currentStyle ==
      "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
      dispatch(
        setSidebadeStyle(
          "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        )
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
      dispatch(
        setSidebadeStyle(
          "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        )
      );
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleImportSheet = () => {
    setIsLoading(true);
    const reqData = {
      excel_file: selectedImage,
    };

    const formData = new FormData();
    formData.append("excel_file", selectedImage);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch("http://13.127.21.5:8000/newdat/importexcel/", requestOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 1) {
          setIsLoading(false);
          handleCloseModal();
          toast("File successfully uploaded..!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setIsLoading(false);
          toast.error("File not uploaded..!. Something went wrong..!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <>
      <ul
        className={
          currentStyle
            ? currentStyle
            : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        }
        id="accordionSidebar"
      >
        {/*  <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          // href="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            YOJNA <sup>2</sup>
          </div>
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
              onClick={changeStyle1}
            ></button>
          </div>
        </a>

        {/*   <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/*  <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <a className="nav-link" href="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder"></i>
            <span>Pages</span>
          </a>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <a className="collapse-item" onClick={handleLogout}>
                Logout
              </a>
              <h6 className="collapse-header">Yojna Forms Screen:</h6>
              <a className="collapse-item" href="/yojnaformlist">
                Yojna Forms
              </a>
            </div>
          </div>
        </li>
      </ul>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* <Navbar /> */}

          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/*  <!-- Sidebar Toggle (Topbar) --> */}
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
              onClick={changeStyle}
            >
              <i className="fa fa-bars"></i>
            </button>

            {/*  <!-- Topbar Search --> */}
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>

            <a
              onClick={handleButtonClick}
              className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              <i className="fas fa-plus fa-sm text-white-50"></i>
              Import Sheet
            </a>

            {isModalOpen && (
              <div className="modal fade show" style={{ display: "block" }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Sheet Upload</h5>
                      <button
                        type="button"
                        className="close"
                        onClick={handleCloseModal}
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="imageUpload">Select Sheet:</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="imageUpload"
                          accept=".xlsx"
                          onChange={handleImageChange}
                        />
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
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleImportSheet}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/*  <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">
              {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
              <li className="nav-item dropdown no-arrow d-sm-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-search fa-fw"></i>
                </a>
                {/*   <!-- Dropdown - Messages --> */}
                <div
                  className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form className="form-inline mr-auto w-100 navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>

              <div className="topbar-divider d-none d-sm-block"></div>

              {/* <!-- Nav Item - User Information --> */}
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    User
                  </span>
                  <img
                    className="img-profile rounded-circle"
                    src="img/undraw_profile.svg"
                  />
                </a>
                {/*  <!-- Dropdown - User Information --> */}
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-toggle="modal"
                    data-target="#logoutModal"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>

          {/* <Dahsboard /> */}
          {componentName}
        </div>

        {/* //  Footer  */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2023</span>
            </div>
          </div>
        </footer>
        {/* <!-- End of Footer --> */}
      </div>
    </>
  );
};

export default Sidebar;
