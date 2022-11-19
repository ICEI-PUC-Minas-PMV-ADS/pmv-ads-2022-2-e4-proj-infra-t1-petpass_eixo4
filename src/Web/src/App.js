import './App.css';
import './assets/styles/custom.scss';

import Routes from './Routes';
import { useState } from 'react';
import { AuthContext } from './AuthContext';

const App = () => {

  const [authContextData, setAuthContextData] = useState({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;
