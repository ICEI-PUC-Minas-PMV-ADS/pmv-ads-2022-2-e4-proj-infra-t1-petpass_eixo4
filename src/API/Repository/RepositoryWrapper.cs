using PetPassBackend.Contracts;
using PetPassBackend.Models;

namespace PetPassBackend.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepositoryContext _repoContext;
        private IPetRepository _pet;
        private IVacinaRepository _vacina;
        private IUsuarioRepository _usuario;
        private IRegistroVacinaRepository _registro;
        private IUsuarioPetRepository _usuarioPet;

        public IPetRepository Pet
        {
            get
            {
                _pet ??= new PetRepository(_repoContext);
                return _pet;
            }
        }
        public IVacinaRepository Vacina
        {
            get
            {
                _vacina ??= new VacinaRepository(_repoContext);
                return _vacina;
            }
        }
        public IUsuarioRepository Usuario
        {
            get
            {
                _usuario ??= new UsuarioRepository(_repoContext);
                return _usuario;
            }
        }
        public IRegistroVacinaRepository Registro
        {
            get
            {
                _registro ??= new RegistroVacinaRepository(_repoContext);
                return _registro;
            }
        }
        public IUsuarioPetRepository UsuariosPets
        {
            get
            {
                _usuarioPet ??= new UsuarioPetRepository(_repoContext);
                return _usuarioPet;
            }
        }
        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }
        public async Task Save()
        {
            await _repoContext.SaveChangesAsync();
        }

    }
}
