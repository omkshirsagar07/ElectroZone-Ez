import { useEffect, useState } from "react";
import AddProduct from "../componants/Add-Product";
import MandatoryInfo from "../componants/Seller-Mandatory-Info";
import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import SellerProductList from "../componants/SellerProductList";
import SellerOrderList from "../componants/SellerOrderList";
import { toast } from "react-toastify";
import { additionalInfo, fetchSeller } from "../services/seller";
import EditSellerProfile from "../componants/EditSellerProfile";

function Seller_Dashboard() {
  const [renderComponent, setRenderComponent] = useState("Home");
  const [verticalNavVisible, setVerticalNavVisible] = useState(false);
  const navigate = useNavigate();
  const [GSTINNo, setGSTINNo] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [IFSCode, setIFSCode] = useState('');
  const [branch, setBranch] = useState('');
  const [address, setAddress] = useState('');
  const item = document.getElementById("VerticalNav")

  const onHome = () => {
    navigate('/')
  }
  const onSubmit = async () => {
    if (GSTINNo.length === 0) {
      toast.warning("GST Number is mandatory");
    } else if (GSTINNo.length < 15) {
      toast.warning("GST Number must be 15 characters");
    } else if (bankAccount.length === 0) {
      toast.warning("Bank Account Number is mandatory");
    } else if (IFSCode.length === 0) {
      toast.warning("IFSC Number is mandatory");
    } else if (branch.length === 0) {
      toast.warning("Branch is mandatory");
    } else if (address.length === 0) {
      toast.warning("Address is mandatory");
    } else {
      try {
        const result = await additionalInfo(sessionStorage.getItem('sellerId'), GSTINNo, bankAccount, IFSCode, branch, address);
        if (result.status === 200) {
          toast.success("Additional Information Submitted. Now, you can add Products");
          setVerticalNavVisible(true);
          setRenderComponent("Add-Product");
        }
      } catch (error) {
        toast.error("Failed to submit additional information");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const prop = await fetchSeller(sessionStorage.id);
      console.log(prop)
      console.log(prop["gstNo"])
      const gst = prop.gstNo;
      try {
        if (gst.length > 0) {
          console.log('hii')
          setVerticalNavVisible(true);
        }
      } catch (error) {
        toast.success("Fill the additional Info to sell your products")
      }
    };
    fetchData(); // Corrected async usage in useEffect
  }, []);

  const activeComponent = () => {
    switch (renderComponent) {
      case "Home":
        return (
          <div className="col-lg-12 mb-5 mb-lg-0" id="Home">
            <div className="card">
              <div className="card-body py-5 px-md-5 bg-dark text-white justify-content-center">
                <div style={{ textAlign: "center" }}>
                  <h3>Additional Information</h3>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form3Example1"
                        className="form-control"
                        placeholder="Enter GSTIN Number"
                        onChange={(e) => setGSTINNo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="number"
                    id="form3Example3"
                    className="form-control"
                    placeholder="Enter Bank Account Number"
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example4"
                    className="form-control"
                    placeholder="Enter IFSC Number"
                    onChange={(e) => setIFSCode(e.target.value)}
                  />
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example4"
                    className="form-control"
                    placeholder="Enter Branch Name"
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <textarea
                    type="text"
                    id="form3Example4"
                    className="form-control"
                    placeholder="Enter Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-success btn-block mb-4 align-items-center"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        );
      case "Add-Product":
        return <AddProduct />;
      case "SellerProductList":
        return <SellerProductList />;
      case "SellerOrderList":
        return <SellerOrderList sellerId = {sessionStorage.id}/>;
      case "EditProfile":
        return <EditSellerProfile />
      default:
        return null;
    }
  };

  const Logout = () => {
    sessionStorage.removeItem("sellerId")
    navigate("/Seller-Login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
          {/* <!-- Collapsible wrapper --> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <!-- Navbar brand --> */}
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img src={logo} height="35" alt="Logo" onClick={onHome} />
            </a>
          </div>
          <div className="navbar-brand mt-2 mt-lg-0 text-center">
            <h3 className="text-white">Dashboard</h3>
          </div>
          {/* <!-- Right elements --> */}
          <div className="d-flex align-items-center">
            {/* <!-- Icon --> */}

            {/* <!-- Avatar --> */}
            <div className="dropdown">
              <a
                data-mdb-dropdown-init
                className="dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuAvatar"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <button className="dropdown-item" onClick={() => setRenderComponent('EditProfile')}>Edit profile</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={Logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      <br />
      {/* vertical Navigation Bar */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 ">
            <div className="vertical-nav bg-dark" id="VerticalNav" style={{ height: 300, visibility: verticalNavVisible ? "visible" : "hidden" }}  >
              <ul className="nav flex-column">
                <li
                  className="nav-item"
                  onClick={() => setRenderComponent("Home")}
                >
                  <button className="nav-link text-reset">Home</button>
                </li>
                <li
                  className="nav-item"
                  onClick={() => setRenderComponent("Add-Product")}
                >
                  <button className="nav-link text-reset">Add Product</button>
                </li>
                <li
                  className="nav-item"
                  onClick={() => setRenderComponent("SellerProductList")}
                >
                  <button className="nav-link text-reset">View Products</button>
                </li>
                <li
                  className="nav-item"
                  onClick={() => setRenderComponent("SellerOrderList")}
                >
                  <button className="nav-link text-reset">View Orders</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-reset">
                    View Business Analysis
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">{activeComponent()}

          </div>
        </div>
      </div>
      <br />
      {/* Footer */}
      <footer className="text-center text-lg-start bg-dark text-white">
        {/* <!-- Section: Social media --> */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="container text-center text-md-start mt-5">
            {/* <!-- Grid row --> */}
            <div className="row mt-3">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* <!-- Content --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Connect With Us
                </h6>
                <div>
                  <input
                    type="text"
                    className="email"
                    placeholder="Enter Email ID"
                  />
                </div>
                <div
                  className="social-media-list"
                  style={{ marginTop: 50, display: "flex", columnGap: 20 }}
                >
                  <div className="social-media youtube">
                    <a href="#" className="text-reset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-youtube"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                      </svg>
                    </a>
                  </div>
                  <div className="social-media facebook">
                    <a href="#" className="text-reset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-facebook"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                      </svg>
                    </a>
                  </div>
                  <div className="social-media whatsapp">
                    <a href="#" className="text-reset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-whatsapp"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                    </a>
                  </div>
                  <div className="social-media instagram">
                    <a href="#" className="text-reset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                      </svg>
                    </a>
                  </div>
                  <div className="social-media twitter">
                    <a href="#" className="text-reset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-twitter-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Grid column --> */}

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-justify">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  Sunbeam InfoTech,
                  <br />
                  Pune-411057 MH
                </p>
                <p>electrozone@Sunbeam.com</p>
                <p>+ 91 234 567 8800</p>
                <p>+ 91 234 567 8900</p>
              </div>

              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Address</h6>
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7563.297463937557!2d73.70390532247107!3d18.58986868661191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb7d0345f01f%3A0x6e8c20c647a06f47!2sSunbeam%20Infotech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1716818773924!5m2!1sen!2sin"
                    title="Sunbeam Map"
                    width="200"
                    height="200"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}

        {/* <!-- Copyright --> */}
        <div className="text-center p-4" style={{ backgroundColor: "black" }}>
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="localhost:3000">
            ElectroZone
          </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  );
}

export default Seller_Dashboard;
