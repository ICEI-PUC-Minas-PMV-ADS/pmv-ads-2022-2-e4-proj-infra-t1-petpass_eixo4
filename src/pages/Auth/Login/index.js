import ButtonIcon from '../../../components/ButtonIcon/index';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { useState } from 'react';
import api from '../../../api/api';
import useData from '../../../store/useData';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();
  const { setData } = useData();

    // const teste = () => {
    //   //  api.post('/cadastro/auth', {email, password}).catch((res) => {
    //     setData({ id: 1, nome:'Arthur', email: 'arthur@gmail.com' })
    //     history.push("/pets")
    //   //  })
    // }

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form >
        <div className="mb-4">
          <input
            type="text"
            className={`form-control base-input`}
            placeholder="Email"
            name="username"
            onChange={(e) => setEmail( e.target.value )}
          />
          <div className="invalid-feedback d-block"></div>
        </div>
        <div className="mb-2">
          <input
            type="password"
            className={`form-control base-input`}
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value )}
          />
          <div className="invalid-feedback d-block">{}</div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha?
        </Link>
        <div className="login-submit">
          <button type="submit">entrat</button>
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;