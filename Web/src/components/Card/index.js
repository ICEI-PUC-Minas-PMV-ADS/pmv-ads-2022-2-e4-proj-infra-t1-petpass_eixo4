import './styles.css';

import PetImage from '../../assets/images/cute-pet.jpg';

const Card = () => {
  return (
    <div className="base-card product-card">
      <div className="card-top-container">
        <img src={PetImage} alt="Pet filhote" />
        <a href="https://br.freepik.com/vetores-gratis/pastor-australiano-fofo_10576737.htm#query=Ilustra%C3%A7%C3%A3o%20cachorro&position=11&from_view=search&track=sph">
          Imagem do Freepik
        </a>
      </div>
      <div className="card-botton-container">
        <div className="card-data-pet">
          <p>Nome: Bethoveen {}</p>
          <p>Raça: Maltês {}</p>
          <p>Sexo: Macho {}</p>
          <p>Idade: 5 anos {}</p>
          <p>Peso: 5 Kg {}</p>
          <p>Data do cadastro: 20/10/22 {}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
