import './styles.css';
import PetImage from '../../assets/images/cute-pet.jpg';

const Pets = () => {
  return (
    <div className="pets-container">
      <h1>Pets Cadastrados</h1>
      <div className="base-card pets-card">
        <div className="pets-content-container">
          <div className="pet-image-container">
          <img src={PetImage} alt="Pet" />
          <a href="https://br.freepik.com/vetores-gratis/pastor-australiano-fofo_10576737.htm#query=Ilustra%C3%A7%C3%A3o%20cachorro&position=11&from_view=search&track=sph">Imagem no Freepik</a>
          </div>
          <div className="row card-data-pet">
            <p className="col-sm-6">Nome: Bethoveen {}</p>
            <p className="col-sm-6">Raça: Maltês {}</p>
            <p className="col-sm-6">Sexo: Macho {}</p>
            <p className="col-sm-6">Idade: 5 anos {}</p>
            <p className="col-sm-6">Peso: 5 Kg {}</p>
            <p className="col-sm-6">Data do cadastro: 20/10/22 {}</p>
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

export default Pets;