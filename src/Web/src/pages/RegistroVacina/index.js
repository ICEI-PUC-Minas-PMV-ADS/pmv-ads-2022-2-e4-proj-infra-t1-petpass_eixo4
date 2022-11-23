import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { requestBackend } from '../../util/requests';

import './styles.css';

const RegistroVacina = () => {
  const [buttonText, setButtonText] = useState('Salvar');
  const [error, setError] = useState(false);

  const {
    state: { id: petId },
  } = useLocation();

  const { register, handleSubmit } = useForm();

  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7110/api/Vacinas`)
      .then((res) => setVacinas(res.data))
      .catch((err) => console.error(err));
  }, []);

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
      url: `https://localhost:7110/api/RegistroVacinas`,
      withCredentials: true,
      data: {
        ...formData,
        petId: parseInt(petId),
        vacinaId: parseInt(formData['vacinaId']),
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
    <>
      <div className="pet-crud-container">
        <div className="base-card pet-crud-form-card">
          <h1 className="pet-crud-form-title">REGISTRAR VACINA</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="margin-botton-15">
                <label className="label-form">Vacina</label>
                <select
                  {...register('vacinaId', {
                    required: 'Campo obrigatório.',
                  })}
                  className={`form-control base-input`}
                  placeholder="Vacina"
                  name="vacinaId"
                >
                  {vacinas?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.descricao} - Dose: {item.dose} 
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-15">
                <label className="label-form">Idade</label>
                <input
                  {...register('idade', {
                    required: 'Campo obrigatório.',
                  })}
                  type="double"
                  className={`form-control base-input`}
                  placeholder="Idade"
                  name="idade"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-15">
                <label className="label-form">Data de Aplicação</label>
                <input
                  {...register('data', {
                    required: 'Campo obrigatório.',
                  })}
                  type="date"
                  className={`form-control base-input`}
                  placeholder="Data de Aplicação"
                  name="data"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="pet-crud-buttons-container">
                <button
                  className="btn btn-outline-danger pet-crud-button"
                  onClick={() => history.push('/pets')}
                >
                  CANCELAR
                </button>
                <button className="btn btn-outline-primary pet-crud-button button-rigth">
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
          {error ? <p>Algo deu errado, tente novamente</p> : null}
        </div>
      </div>
    </>
  );
};

export default RegistroVacina;
