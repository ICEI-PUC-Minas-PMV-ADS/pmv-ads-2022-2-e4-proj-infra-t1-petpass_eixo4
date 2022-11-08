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

        public IPetRepository Pet
        {
            get
            {
                if (_pet == null)
                {
                    _pet = new PetRepository(_repoContext);
                }
                return _pet;
            }
        }
        public IVacinaRepository Vacina
        {
            get
            {
                if (_vacina == null)
                {
                    _vacina = new VacinaRepository(_repoContext);
                }
                return _vacina;
            }
        }
        public IUsuarioRepository Usuario
        {
            get
            {
                if (_usuario == null)
                {
                    _usuario = new UsuarioRepository(_repoContext);
                }
                return _usuario;
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
