import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { requestBackend } from '../../util/requests';
import { getAuthenticatedUser } from '../../util/auth';

import './styles.css';

const RegistroVacina = () => {
  const [buttonText, setButtonText] = useState('Salvar');

  const [error, setError] = useState(false);

  const [petId, setPetId] = useState(useLocation()?.state?.petId);

  const [tipoPet] = useState(useLocation()?.state?.tipoPet);

  const regId = useLocation()?.state?.id;

  const isEditing = regId ? true : false;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7110/api/Vacinas`)
      .then((res) => {
        let vacinas = [...res.data].filter(e => e.tipoPet === tipoPet);
        setVacinas(vacinas);
      })
      .catch((err) => console.error(err));
  }, [tipoPet]);

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`https://localhost:7110/api/RegistroVacinas/${regId}`)
        .then((res) => {
          const vac = res.data;
          setValue('vacinaId', vac.vacinaId);
          setValue('idade', vac.idade);
          setValue('data', vac.data.split('T')[0]);
          setPetId(vac.petId);
        })
        .catch((err) => console.error(err));
    }
  }, [regId, isEditing, setValue, setPetId]);

  const finallyRequest = (response) => {
    if (response) {
      history.push('/pets');
    } else {
      setError(true);
    }
  };

  const onSubmit = (formData) => {
    const params = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing
        ? `https://localhost:7110/api/RegistroVacinas/${regId}`
        : `https://localhost:7110/api/RegistroVacinas`,
      withCredentials: true,
      data: {
        ...formData,
        petId: parseInt(petId),
        vacinaId: parseInt(formData['vacinaId']),
      },
    };

    if (isEditing) {
      params.data = { ...params.data, id: regId };
    }

    setButtonText('Carregando...');
    requestBackend(params)
      .then(() => finallyRequest(true))
      .catch(() => finallyRequest(false))
      .finally(() => setButtonText('Salvar'));
  };

  const deletePet = (regId) => {
    const params = {
      method: 'DELETE',
      url: `https://localhost:7110/api/RegistroVacinas/${regId}`,
      withCredentials: true,
      data: {
        regId,
        usuarioId: getAuthenticatedUser(),
      },
    };

    requestBackend(params)
      .then(() => finallyRequest(true))
      .catch(() => finallyRequest(false))
  };

  const history = useHistory();

  return (
    <>
      <div className="pet-crud-container">
        <div className="base-card pet-crud-form-card">
          <h1 className="pet-crud-form-title">Aplicação de Vacina</h1>

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
                  className={`form-control base-input ${
                    errors.idade ? 'is-invalid' : ''
                  }`}
                  placeholder="Idade"
                  name="idade"
                />
                <div className="invalid-feedback d-block">{errors.idade?.message}</div>
              </div>

              <div className="margin-botton-15">
                <label className="label-form">Data de Aplicação</label>
                <input
                  {...register('data', {
                    required: 'Campo obrigatório.',
                  })}
                  type="date"
                  className={`form-control base-input ${
                    errors.data ? 'is-invalid' : ''
                  }`}
                  placeholder="Data de Aplicação"
                  name="data"
                />
                <div className="invalid-feedback d-block">{errors.data?.message}</div>
              </div>

              <div className="pet-crud-buttons-container">
                <button
                  className="btn btn-outline-secondary pet-crud-button"
                  onClick={() => history.push('/pets')}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-outline-danger pet-crud-button"
                  onClick={() => deletePet(regId)}
                >
                  Excluir
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
