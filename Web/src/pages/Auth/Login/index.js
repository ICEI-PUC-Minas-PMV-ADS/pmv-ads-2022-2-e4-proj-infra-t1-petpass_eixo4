import ButtonIcon from '../../../components/ButtonIcon/index';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext.js';
import { requestBackendLogin } from '../../../util/requests.js';
import { saveAuthData } from '../../../util/storage.js';
import { getTokenData } from '../../../util/auth.js';


import './styles.css';

const Login = () => {

  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/pets' } };

  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit, formState : {errors} } = useForm();

  const history = useHistory();

  const onSubmit = (formData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log('Erro', error);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">
          Erro ao tentar efetuar o Login!
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
          {...register('username', {
            required: 'Campo obrigatório.'
          })}
            type="text"
            className={`form-control base-input ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Nome"
            name="username"
          />
          <div className="invalid-feedback d-block">{errors.username?.message}</div>
        </div>
        <div className="mb-2">
          <input
          {...register('password', {
            required: 'Campo obrigatório.'
          })}
            type="password"
            className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">{errors.password?.message}</div>
        </div>
        <Link to="/auth/register" className="login-link-recover">
          Esqueci a senha?
        </Link>
        <div className="login-submit">
          <ButtonIcon text="ENTRAR" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;