import './styles.css';

import GirlImage from '../../assets/images/avatar-girl.jpg';

const Usuario = () => {

  return (
    <div className="user-container">
      <h1>Perfil do usuário</h1>
      <div className="base-card user-card">
        <div className="user-content-container">
          <div className="user-image-container">
            <img src={GirlImage} alt="Avatar Girl" />
            <a href="https://br.freepik.com/vetores-gratis/avatares-de-pessoas-multirraciais_7085153.htm">
              Imagem do Freepik
            </a>
          </div>
          <div className="row card-data-user">
            <p>Nome: andrea@gmail.com {}</p>
            <p>Perfil: Usuário {}</p>
          </div>
        </div>
        <div className="base-card card-pet">
          <h6>Relação de Pets:</h6>
          <p>Bethoveen</p>
          <p>Mel</p>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
