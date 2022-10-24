import { Link } from 'react-router-dom';
import MainImage from '../../assets/images/home-health.png';
import ButtonIcon from '../../components/ButtonIcon';

import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="base-card home-card">
        <div className="home-content-container">
          <div>
            <h1>Organize as vacinas do seu pet</h1>
            <p>Crie seu cartão de vacina online e acesse onde você quiser.</p>
          </div>
          <div>
            <Link to="/auth">
              <ButtonIcon text="Realizar login" />
            </Link>
          </div>
        </div>
        <div className="home-image-container">
          <img src={MainImage} alt="Pet no veterinário" />
          <a href="https://br.freepik.com/vetores-gratis/exame-de-saude-do-gato-pelo-veterinario-na-clinica-veterinaria-mulher-acariciando-ilustracao-em-vetor-plana-gatinho-feliz-cuidados-com-animais-de-estimacao-medicina-para-animais-domesticos-conceito-para-banner-design-de-site-ou-pagina-da-web-de-destino_22343590.htm#query=Pessoas%20de%20ilustra%C3%A7%C3%A3o%20plana%20com%20animais%20de%20estima%C3%A7%C3%A3o&position=18&from_view=search&track=sph">Imagem de pch.vector no Freepik</a> 
        </div>
      </div>
    </div>
  );
};

export default Home;
