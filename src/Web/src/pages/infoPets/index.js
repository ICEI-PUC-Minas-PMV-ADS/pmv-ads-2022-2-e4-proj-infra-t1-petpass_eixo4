import './styles.css';
import DogImage from '../../assets/images/cute-pet.jpg';
import CatImage from '../../assets/images/cute-cat.jpg';
import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const InfoPets = () => {
  const history = useHistory();

  const [pet, setPet] = useState({});

  const {
    state: { id },
  } = useLocation();

  useEffect(() => {
    axios
      .get(`https://localhost:7110/api/Pets/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="pets-container">
      <div className="header">
        <button
          className=" infoButton btn btn-outline-primary pet-crud-button button-rigth"
          onClick={() => history.push('/cadPet')}
        >
          Editar
        </button>
        <button
          className=" infoButton btn btn-outline-danger pet-crud-button"
          onClick={() => history.push('/pets')}
        >
          Voltar
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
            <p className="col-sm-6">
              Tipo: {['Cachorro', 'Gato'][pet.tipo]}
            </p>
            <p className="col-sm-6">Raça: {pet.raca}</p>
            <p className="col-sm-6">
              Sexo: {['Fêmea', 'Macho'][pet.sexo]}
            </p>
            <p className="col-sm-6">Peso: {pet.peso} kg</p>
            <p className="col-sm-6">
              Data do cadastro:{' '}
              {new Date(pet.dataRegistro).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="base-card card-vaccine">
          <h6>Relação de Vacinas:</h6>
          {pet.registroVacinas?.sort((a,b) => a.idade-b.idade).map((item) => (
            <p key={item.id}>
              {item.vacina.descricao} - Dose: {item.vacina.dose} - Idade: {item.idade} - Aplicação: {new Date(item.data).toLocaleDateString()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPets;
