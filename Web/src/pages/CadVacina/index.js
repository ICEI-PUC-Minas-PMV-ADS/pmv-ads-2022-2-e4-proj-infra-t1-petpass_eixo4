import { useHistory } from 'react-router-dom';
import './styles.css';


const CadVacina = () => {
  const history = useHistory();
  
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">CADASTRAR VACINA</h1>

        <form>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6">
              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input `}
                  placeholder="Nome"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {}
                </div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Dose"
                  name="Dose"
                />
                <div className="invalid-feedback d-block">
                  {}
                </div>
              </div>
              
              <label className="pet-label-form">Data do Registro:</label>
              <div className="margin-botton-30">
                <input
                  type="Date"
                  className={`form-control base-input`}
                  placeholder="Data de registro"
                  name="Data"
                />
                <div className="invalid-feedback d-block">
                  {}
                </div>
              </div>
            </div>
                        
            <div className="col-lg-6">
              <textarea
                rows={9}
                className={`form-control base-input h-auto`}
                placeholder="Descrição"
                name="Descricao"
              />
              <div className="invalid-feedback d-block">
              </div>
            </div>
          </div>

          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={() => history.push('/pets')}
            >
              CANCELAR
            </button>
            <button className="btn btn-outline-primary product-crud-button button-rigth">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadVacina;