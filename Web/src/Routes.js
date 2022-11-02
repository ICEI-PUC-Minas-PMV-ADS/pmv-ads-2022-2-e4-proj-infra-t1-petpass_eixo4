import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pets from './pages/Pets';
import Auth from './pages/Auth';
import CadVacina from './pages/CadVacina';
import CadPet from './pages/CadPet';
import Usuario from './pages/Usuario';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Redirect from="/auth" to="/auth/login" exact/>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/pets" exact>
        <Pets />
      </Route>
      <Route path="/infopets" exact>
        <Pets />
      </Route>
      <Route path="/cadvacina">
        <CadVacina />
      </Route>
      <Route path="/cadpet">
        <CadPet />
      </Route>
      <Route path="/usuario">
        <Usuario />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
