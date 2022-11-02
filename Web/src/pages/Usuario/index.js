import './styles.css';

import GirlImage from '../../assets/images/avatar-girl.jpg';
import { requestBackend } from '../../util/requests.js';
import { useEffect, useState } from 'react';
import { getAuthenticatedUser } from '../../util/auth';


const Users = () => {

  const [page, setPage] = useState();

  useEffect(() => {
    const params = {
      url: `/api/Usuarios/${getAuthenticatedUser()}/`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setPage([response.data]);
    });
  }, []);

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
            {page?.map((item) => (<div key={item}>
              <p>Nome: {item.nome}</p>
              <p>Perfil: {item.perfil === 0 ? "Administrador" : "Usuario" }</p>
            </div>
            ))}
          </div>
        </div>
        <div className="base-card card-pet">
          <h6>Relação de Pets:</h6>
          {page?.map((item) => (<div key={item}>
              <p>{item.pets}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
