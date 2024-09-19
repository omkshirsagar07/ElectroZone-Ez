import { useState, useEffect } from "react";
import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [permission, setPermission] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('id') && sessionStorage.getItem('id').length > 0) {
      setPermission(true);
    }
  }, []);

  const Logout = () => {
    sessionStorage.removeItem('id');
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img src={logo} height="35" alt="Logo" onClick={() => navigate('/')} />
          </a>
        </div>
        <span
          className="nav-link me-4 text-white fw-bold btn"
          onClick={() => navigate('/AboutUs')}
          style={{ cursor: "pointer", marginRight: "10px" }}
        >
          About Us
        </span>

        <button className="btn me-3 btn-outline-success" onClick={() => navigate('/Seller-Register')}>
          Become a seller
        </button>

        <div className="d-flex align-items-center">
          <button
            className="text-reset border-none btn"
            onClick={permission ? () => navigate('/Wishlist') : () => navigate('/User-Login')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bag-heart" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
            </svg>
          </button>
          <button
            className="text-reset me-2 border-none btn"
            onClick={permission ? () => navigate('/Cart') : () => navigate('/User-Login')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
          </button>

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
                alt="Avatar"
                loading="lazy"
              />
            </a>

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
              {permission ?
                null :
                <li>
                  <button className="dropdown-item" onClick={() => navigate('/User-Login')}>
                    Login
                  </button>
                </li>}
              {permission && (
                <>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate('/EditProfile')}
                    >
                      Edit profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate('/AddressInfo')}
                    >
                      Add Address
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate('/WishList')}
                    >
                      My Wishlist
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate('/Cart')}
                    >
                      My Cart
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate('/Orders')}
                    >
                      View Orders
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={Logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
