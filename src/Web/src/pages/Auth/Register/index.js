import ButtonIcon from '../../../components/ButtonIcon/index';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { requestBackend } from '../../../util/requests.js';

import './styles.css';

const Register = () => {
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/auth/login' } };

  const [hasError, setHasError] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const onSubmit = (formData) => {
    const data = {
      Nome: formData['username'],
      Password: formData['password'],
      Perfil: parseInt(formData['perfil']),
    };

    const params = {
      method: 'POST',
      url: `/api/Usuarios/`,
      data,
    };

    requestBackend(params)
      .then((response) => {
        setHasError(false);
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log(error);
      });
  };

  return (
    <div className="base-card register-card">
      <h1>CADASTRO</h1>
      {hasError && (
        <div className="alert alert-danger">
          Erro ao tentar efetuar o cadastro!
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="new-password">
        <div className="mb-4">
          <label className="label-form-login">E-mail</label>
          <input
            {...register('username', {
              required: 'Campo obrigatório.',
              validate: (val) => {
                const emailRegex = new RegExp('^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$');
                if (!emailRegex.test(val)) {
                  return 'Não é um endereço de e-mail válido!';
                }
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="E-mail"
            name="username"
            autoComplete="new-password"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-4">
          <label className="label-form-login">Senha</label>
          <input
            {...register('password', {
              required: 'Campo obrigatório.',
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Senha"
            name="password"
            autoComplete="new-password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>

        <div className="mb-4">
          <label className="label-form-login">Confirme sua senha</label>
          <input
            {...register('confirm_password', {
              required: 'Campo obrigatório.',
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'As senhas não conferem!';
                }
              },
            })}
            type="password"
            className={`form-control base-input ${
              errors.confirm_password ? 'is-invalid' : ''
            }`}
            placeholder="Confirme sua senha"
            name="confirm_password"
            autoComplete="new-password"
          />
          <div className="invalid-feedback d-block">
            {errors.confirm_password?.message}
          </div>
        </div>

        <div className="form-check form-check-inline">
          <input
            {...register('perfil', {
              required: 'Campo obrigatório.',
            })}
            className="form-check-input"
            type="radio"
            name="perfil"
            id="inlineRadio1"
            value="0"
            checked
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Usuário
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            {...register('perfil', {
              required: 'Campo obrigatório.',
            })}
            className="form-check-input"
            type="radio"
            name="perfil"
            id="inlineRadio2"
            value="2"
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Instituição
          </label>
        </div>

        <div className="register-submit">
          <ButtonIcon text="CADASTRAR" />
        </div>
      </form>
    </div>
  );
};

export default Register;
