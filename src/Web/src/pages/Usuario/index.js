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
    };

    requestBackend(params).then((response) => {
      setPage([response.data]);
    });
  }, []);

  return (
    <div className="user-container">
      <h1>Meu Perfil</h1>
      <div className="base-card user-card">
        <div className="user-content-container">
          <div className="user-image-container">
            <img src={GirlImage} alt="Avatar Girl" />
            <a href="https://br.freepik.com/vetores-gratis/avatares-de-pessoas-multirraciais_7085153.htm">
              Imagem do Freepik
            </a>
          </div>
          <div className="row card-data-user">
            {page?.map((item) => (
              <div key={item}>
                <p>E-mail: {item.email}</p>
                <p>Perfil: {item.perfil < 2 ? (item.perfil === 1 ? 'Administrador' : 'Usuário' ) : 'Instituição'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="base-card card-pet">
          <h6>Pets cadastrados:</h6>
          {page?.map((item) => (
            <div key={item}>
              <p>{item.pets.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
