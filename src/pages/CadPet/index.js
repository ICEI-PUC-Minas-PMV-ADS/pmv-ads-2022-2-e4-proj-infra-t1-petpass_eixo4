import './styles.css';

const CadPet = () => {
  return (
    <div className="pet-crud-container">
      <div className="base-card pet-crud-form-card">
        <h1 className="pet-crud-form-title">CADASTRAR PET</h1>

        <form>
          <div className="row pet-crud-inputs-container">
            <div className="col-xl-6">
              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input `}
                  placeholder="Nome"
                  name="name"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Tipo"
                  name="tipo"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Raça"
                  name="raca"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Sexo"
                  name="sexo"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Idade"
                  name="idade"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="margin-botton-30">
                <input
                  type="number"
                  className={`form-control base-input`}
                  placeholder="Peso"
                  name="peso"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <label className="pet-label-form">Data do Registro:</label>
              <div className="margin-botton-30">
                <input
                  type="date"
                  className={`form-control base-input`}
                  placeholder="Data do Registro"
                  name="DataRegistro"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <div className="margin-botton-30">
                <input
                  type="text"
                  className={`form-control base-input`}
                  placeholder="Url da imagem do pet"
                  name="imgUrl"
                />
                <div className="invalid-feedback d-block">{}</div>
              </div>

              <p className="pet-message-form">
                As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb.
              </p>
            </div>

            <div className="pet-crud-buttons-container">
              <button className="btn btn-outline-danger pet-crud-button">
                CANCELAR
              </button>
              <button className="btn btn-outline-primary pet-crud-button button-rigth">
                SALVAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadPet;
