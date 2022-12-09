import { useEffect } from 'react';
import { useState } from 'react';
import { requestBackend } from '../../util/requests';
import PetImage from '../../assets/images/news_pet.jpg';

import './styles.css';

const Noticias = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const params = {
      url: `/api/News/`,
    };

    requestBackend(params).then((response) => {
      setNews(response.data);
    });
  }, []);

  return (
    <div className="text-container">
      {news?.map((item) => (
        <div key={item.id} className="base-card text-card news-content-container">
          <div className="pet-image-container">
            <img src={PetImage} alt="Notícia Pet" />
            <a href="https://br.freepik.com/vetores-gratis/jovem-mulher-sentada-no-sofa-com-o-gato-e-o-dispositivo-movel-menina-conversando-ilustracao-em-vetor-plana-smartphone-casa-e-relaxamento_10174112.htm#query=ilustracao%20vetor%20news%20pet&position=12&from_view=search&track=ais">
              Imagem do Freepik
            </a>
          </div>
          <div>
            <h1 className="title-container">{item.titulo}</h1>
            <p dangerouslySetInnerHTML={{ __html: item.noticia }}></p>
            <p className="card-data">
              Data: {new Date(item.data).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Noticias;
