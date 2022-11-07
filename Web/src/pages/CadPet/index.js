import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const CadPet = () => {

  const formInitialData =   {
    nomePet: "",
    tipo: "",
    sexo: "",
    raca: "",
    peso: 0
  }

  const [data, setData] = useState(formInitialData);
  const [buttonText, setButtonText] = useState('Salvar');
  const [error, setError] = useState(false);


  const onFormUpdate = (category, value) => {
    setData({
      ...data,
      [category]: value
    })
  }


  const finallyRequest = (response) => {
    if(response) {
      history.push('/pets')
    }
    setError(true)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonText('Carregando...')
    axios.post(`https://localhost:7110/api/Pets`)
    .then(() => finallyRequest(true))
    .catch(() => finallyRequest(false))
    .finally(() => setButtonText('Salvar'))

  }

console.log(data)
  
  const history = useHistory();

  return (
    <>
<div className="pet-crud-container">
      <div className="base-card pet-crud-form-card">
        <h1 className="pet-crud-form-title">CADASTRAR PET</h1>

        <form onSubmit={handleSubmit}>
          <div className="row pet-crud-inputs-container">
            <div className="col-xl-6">
              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input `}
                  placeholder="Nome"
                  name="name"
                  value={data.nomePet}
                  onChange={(e) => onFormUpdate('nomePet', e.target.value)}
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Tipo"
                  name="tipo"
                  value={data.tipo}
                  onChange={(e) => onFormUpdate('tipo', e.target.value)}
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Raça"
                  name="raca"
                  value={data.raca}
                  onChange={(e) => onFormUpdate('raca', e.target.value)}
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Sexo"
                  name="sexo"
                    value={data.sexo}
                  onChange={(e) => onFormUpdate('sexo', e.target.value)}
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Idade"
                  name="idade"
                  value={data.idade}
                  onChange={(e) => onFormUpdate('idade', e.target.value)}
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="margin-botton-30">
                <input
                  type="number"
                  className={`form-control base-input`}
                  placeholder="Peso"
                  name="peso"
                  value={data.peso}
                  onChange={(e) => onFormUpdate('peso', e.target.value)}
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Url da imagem do pet"
                  name="imgUrl"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <p className="pet-message-form">
                As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb.
              </p>
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
           {error ? (
              <p>Algo deu errado, tente novamente</p>
            ) : null}
      </div>
    </div>
    </>
  );
};

export default CadPet;
