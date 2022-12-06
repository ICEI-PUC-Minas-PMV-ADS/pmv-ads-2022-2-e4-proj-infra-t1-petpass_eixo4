import './styles.css';
import DogImage from '../../assets/images/cute-pet.jpg';
import CatImage from '../../assets/images/cute-cat.jpg';
import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { requestBackend } from '../../util/requests';
import { getAuthenticatedUser } from '../../util/auth';

const InfoPets = () => {
  const history = useHistory();

  const [pet, setPet] = useState({});

  const [error, setError] = useState(false);

  const {
    state: { id },
  } = useLocation();

  useEffect(() => {
    axios
      .get(`http://rodrigopuc-001-site1.htempurl.com/api/Pets/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const finallyRequest = (response) => {
    if (response) {
      history.push('/pets');
    } else {
      setError(true);
    }
  };

  const deletePet = (petId) => {
    const params = {
      method: 'DELETE',
      url: `https://localhost:7110/api/Pets/${petId}`,
      withCredentials: true,
      data: {
        petId,
        usuarioId: getAuthenticatedUser(),
      },
    };

    requestBackend(params)
      .then(() => finallyRequest(true))
      .catch(() => finallyRequest(false))
  };

  return (
    <div className="pets-container">
      <div className="header">
      <button
          className=" infoButton btn btn-outline-secondary pet-crud-button"
          onClick={() => history.push('/pets')}
        >
          Voltar
        </button>
        <button
          className=" infoButton btn btn-outline-danger pet-crud-button"
          onClick={() => deletePet(id)}
        >
          Excluir
        </button>
        <button
          className=" infoButton btn btn-outline-primary pet-crud-button button-rigth"
          onClick={() => history.push('/cadPet', { id })}
        >
          Editar
        </button>
      </div>

      <div className="base-card pets-card">
        <div className="pets-content-container">
          <div className="pet-image-container">
            {pet.tipo === 0 ? (
              <>
                <img src={DogImage} alt="Pet" />
                <a href="https://br.freepik.com/vetores-gratis/pastor-australiano-fofo_10576737.htm#query=Ilustra%C3%A7%C3%A3o%20cachorro&position=11&from_view=search&track=sph">
                  Imagem do Freepik
                </a>
              </>
            ) : (
              <>
                <img src={CatImage} alt="Pet" />
                <a href="https://br.freepik.com/vetores-gratis/gato-bonito-jogando-bola-de-fios-dos-desenhos-animados-ilustracao-em-vetor-icone-conceito-de-icone-de-natureza-animal-isolado-de-vetor-premium-estilo-de-desenho-animado-plano_22750853.htm#query=ilustracao%20gato&position=26&from_view=search&track=sph">
                  Imagem do Freepik
                </a>
              </>
            )}
          </div>
          <div className="row card-data-pet">
            <p className="col-sm-6">Nome: {pet.nomePet}</p>
            <p className="col-sm-6">Tipo: {['Cachorro', 'Gato'][pet.tipo]}</p>
            <p className="col-sm-6">Raça: {pet.raca}</p>
            <p className="col-sm-6">Sexo: {['Fêmea', 'Macho'][pet.sexo]}</p>
            <p className="col-sm-6">Peso: {pet.peso} kg</p>
            <p className="col-sm-6">
              Data do cadastro: {new Date(pet.dataRegistro).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="base-card card-vaccine">
          <h6>Relação de Vacinas:</h6>
          {pet.registroVacinas
            ?.sort((a, b) => a.idade - b.idade)
            .map((item) => (
              <p key={item.id}>
                <button
                  className="btn-vaccine"
                  onClick={() => history.push('/registroVacina', {id: item.id})}
                >
                  <EditIcon color="action"/> {item.vacina.descricao} - Dose: {item.vacina.dose} - Idade:{' '}
                  {item.idade} - Aplicação:{' '}
                  {new Date(item.data).toLocaleDateString()}
                </button>
              </p>
            ))}
        </div>
        <div className="message-error">{error ? <p>Algo deu errado, tente novamente!</p> : null}</div>
      </div>
    </div>
  );
};

export default InfoPets;
