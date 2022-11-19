import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { requestBackend } from '../../util/requests';
import './styles.css';

const CadVacina = () => {
  const [buttonText, setButtonText] = useState('Salvar');
  const [error, setError] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const finallyRequest = (response) => {
    if (response) {
      history.push('/pets');
    } else {
      setError(true);
    }
  };

  const onSubmit = (formData) => {
    const params = {
      method: 'POST',
      url: `https://localhost:7110/api/Vacinas`,
      withCredentials: true,
      data: {
        ...formData,
        tipoPet: parseInt(formData['tipoPet']),
      },
    };

    setButtonText('Carregando...');
    requestBackend(params)
      .then(() => finallyRequest(true))
      .catch(() => finallyRequest(false))
      .finally(() => setButtonText('Salvar'));
  };

  const history = useHistory();

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">CADASTRAR VACINA</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="margin-botton-30">
              <select
                {...register('tipoPet', {
                  required: 'Campo obrigatório.',
                })}
                className={`form-control base-input select-type`}
                placeholder="Tipo"
                name="tipoPet"
              >
                <option value="0">Cachorro</option>
                <option value="1">Gato</option>
              </select>

              <div className="margin-botton-30">
                <input
                {...register('dose', {
                  required: 'Campo obrigatório.',
                })}
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Dose"
                  name="dose"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <textarea
              {...register('Descricao', {
                required: 'Campo obrigatório.',
              })}
                rows={9}
                className={`form-control base-input h-auto`}
                placeholder="Descrição"
                name="Descricao"
              />
              <div className="invalid-feedback d-block"></div>
            </div>
          </div>

          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={() => history.push('/pets')}
            >
              CANCELAR
            </button>
            <button className="btn btn-outline-primary product-crud-button button-rigth">
            {buttonText}
            </button>
          </div>
        </form>
        {error ? <p>Algo deu errado, tente novamente</p> : null}
      </div>
    </div>
  );
};

export default CadVacina;
