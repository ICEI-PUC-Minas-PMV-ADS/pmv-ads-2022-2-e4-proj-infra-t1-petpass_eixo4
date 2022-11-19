import './styles.css';
import PetImage from '../../assets/images/cute-pet.jpg';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useData from '../../store/useData';

const InfoPets = () => {
  const history = useHistory();

  const [pet, setPet] = useState({});


  const {
    data: {
      user: { id },
    },
  } = useData();

  useEffect(() => {
    axios
      .get(`https://localhost:7110/api/Pets/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error(err));
}, []);

  return (
    <div className="pets-container">
      <div className="header">
        <button 
            className=" infoButton btn btn-outline-primary pet-crud-button button-rigth"
            onClick={() => history.push('/cadPet')}
          >
            Editar</button>
        <button 
            className=" infoButton btn btn-outline-danger pet-crud-button"
            onClick={() => history.push('/pets')}
          >
            Voltar</button>
      </div>

      



      <div className="base-card pets-card">
        <div className="pets-content-container">
          <div className="pet-image-container">
          <img src={PetImage} alt="Pet" />
          <a href="https://br.freepik.com/vetores-gratis/pastor-australiano-fofo_10576737.htm#query=Ilustra%C3%A7%C3%A3o%20cachorro&position=11&from_view=search&track=sph">Imagem no Freepik</a>
          </div>
          <div className="row card-data-pet">
            <p className="col-sm-6">Nome: {pet.NomePet}</p>
            <p className="col-sm-6">Raça: {pet.Raca}</p>
            <p className="col-sm-6">Sexo: {pet.Sexo}</p>
            <p className="col-sm-6">Idade: {pet.Idade}</p>
            <p className="col-sm-6">Peso: {pet.Peso}</p>
            <p className="col-sm-6">Data do cadastro: {pet.DataCadastro}</p>
          </div>
        </div>
        <div className="base-card card-vaccine">
            <h6>Relação de Vacinas:</h6>
            <p>Gripe Canina - 1ª dose</p>
          </div>
      </div>
    </div>
  );
};

export default InfoPets;