import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { requestBackend } from '../../util/requests';
import { useForm } from 'react-hook-form';
import { getAuthenticatedUser } from '../../util/auth';

import './styles.css';
import axios from 'axios';

const CadPet = () => {
  
  const [buttonText, setButtonText] = useState('Salvar');

  const [error, setError] = useState(false);

  const petId = useLocation()?.state?.id;

  const isEditing = petId ? true : false;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (isEditing) {
      axios
      .get(`https://localhost:7110/api/Pets/${petId}`)
      .then((res) => {
        const pet = res.data;
        setValue('nomePet', pet.nomePet);
        setValue('tipo', pet.tipo);
        setValue('raca', pet.raca);
        setValue('sexo', pet.sexo);
        setValue('peso', pet.peso);
        setValue('dataRegistro', pet.dataRegistro.split('T')[0]);
      })
      .catch((err) => console.log(err)); 
    }
  }, [petId, isEditing, setValue]);

  const finallyRequest = (response) => {
    if (response) {
      history.push('/pets');
    } else {
      setError(true);
    }
  };

  const createLinkPetUser = (petId) => {
    const params = {
      method: 'POST',
      url: `https://localhost:7110/api/Pets/${petId}/usuarios`,
      withCredentials: true,
      data: {
        petId,
        usuarioId: getAuthenticatedUser(),
      },
    };

    requestBackend(params)
      .then(() => finallyRequest(true))
      .catch(() => finallyRequest(false))
      .finally(() => setButtonText('Salvar'));
  };

  const onSubmit = (formData) => {
    const params = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `https://localhost:7110/api/Pets/${petId}` : `https://localhost:7110/api/Pets`,
      withCredentials: true,
      data: {
        ...formData,
        tipo: parseInt(formData['tipo']),
        sexo: parseInt(formData['sexo']),
        peso: parseInt(formData['peso']),
      },
    };

    if (isEditing) {
      params.data = {...params.data, id: petId};
    }

    setButtonText('Carregando...');
    console.log('web params: ',formData);

    requestBackend(params)
      .then((response) => {
        if (!isEditing) {
          createLinkPetUser(response.data.id);
        } else {
          finallyRequest(true);
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => setButtonText('Salvar'));
  };

  const history = useHistory();

  return (
    <>
      <div className="pet-crud-container">
        <div className="base-card pet-crud-form-card">
          <h1 className="pet-crud-form-title">Cadastro de Pet</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="margin-botton-15">
                <label className="label-form">Nome</label>
                <input
                  {...register('nomePet', {
                    required: 'Campo obrigatório.',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.nomePet ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome"
                  name="nomePet"
                />
                <div className="invalid-feedback d-block">{errors.nomePet?.message}</div>
              </div>

              <div className="margin-botton-15">
                <label className="label-form">Tipo</label>
                <select
                  {...register('tipo', {
                    required: 'Campo obrigatório.',
                  })}
                  className={`form-control base-input`}
                  placeholder="Tipo"
                  name="tipo"
                >
                  <option value="0">Cachorro</option>
                  <option value="1">Gato</option>
                </select>
              </div>

              <div className="margin-botton-15">
                <label className="label-form">Raça</label>
                <input
                  {...register('raca', {
                    required: 'Campo obrigatório.',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.raca ? 'is-invalid' : ''
                  }`}
                  placeholder="Raça"
                  name="raca"
                />
                <div className="invalid-feedback d-block">{errors.raca?.message}</div>
              </div>

              <div className="margin-botton-15">
                <label className="label-form">Sexo</label>
                <select
                  {...register('sexo', {
                    required: 'Campo obrigatório.',
                  })}
                  className={`form-control base-input`}
                  placeholder="Sexo"
                  name="sexo"
                >
                  <option value="0">Fêmea</option>
                  <option value="1">Macho</option>
                </select>
              </div>

              <div className="margin-botton-15">
              <label className="label-form">Peso</label>
                <input
                  {...register('peso', {
                    required: 'Campo obrigatório.',
                  })}
                  type="double"
                  className={`form-control base-input ${
                    errors.peso ? 'is-invalid' : ''
                  }`}
                  placeholder="Peso"
                  name="peso"
                />
                <div className="invalid-feedback d-block">{errors.peso?.message}</div>
              </div>

              <div className="margin-botton-15">
              <label className="label-form">Data de Registro</label>
                <input
                  {...register('dataRegistro', {
                    required: 'Campo obrigatório.',
                  })}
                  type="date"
                  className={`form-control base-input ${
                    errors.dataRegistro ? 'is-invalid' : ''
                  }`}
                  placeholder="Data de Registro"
                  name="dataRegistro"
                />
                <div className="invalid-feedback d-block">{errors.dataRegistro?.message}</div>
              </div>

              <div className="pet-crud-buttons-container">
                <button
                  className="btn btn-outline-secondary pet-crud-button"
                  onClick={() => history.push('/pets')}
                >
                  Cancelar
                </button>
                <button className="btn btn-outline-primary pet-crud-button button-rigth">
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
          {error ? <p>Algo deu errado, tente novamente!</p> : null}
        </div>
      </div>
    </>
  );
};

export default CadPet;
