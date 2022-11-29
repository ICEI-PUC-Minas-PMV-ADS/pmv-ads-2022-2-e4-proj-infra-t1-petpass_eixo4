import './styles.css';
import 'bootstrap/js/src/collapse.js';

import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import history from '../../util/history';
import { AuthContext } from '../../AuthContext';
import { getTokenData, isAuthenticated } from '../../util/auth';
import { removeAuthData } from '../../util/storage';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
    window.location = '';
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid main-container">
        <Link to="/" className="nav-logo-text col-md-2" >
          <h4>PetPass</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#petpass-navbar"
          aria-controls="petpass-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col-md-10 justify-content-end" id="petpass-navbar">
          <ul className="navbar-nav main-menu">
            {authContextData.authenticated && (
              <>
                <li>
                  <NavLink to="/pets" activeClassName="active">
                    PET
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/usuario" activeClassName="active">
                    USUÁRIO
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/noticias" activeClassName="active">
                  NOTÍCIAS
                  </NavLink>
                </li>
                <li>
                  <a href="#logout" onClick={handleLogoutClick}>
                    LOGOUT
                  </a>
                </li>
              </>
             )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
