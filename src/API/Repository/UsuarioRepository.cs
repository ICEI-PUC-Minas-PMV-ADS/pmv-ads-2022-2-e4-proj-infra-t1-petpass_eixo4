using Microsoft.EntityFrameworkCore;
using PetPassBackend.Contracts;
using PetPassBackend.Models;

namespace PetPassBackend.Repository
{
    public class UsuarioRepository : RepositoryBase<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
        public IEnumerable<Usuario> GetAllUsuarios()
        {
            return (IEnumerable<Usuario>)FindAll().OrderBy(p => p.Nome).ToListAsync();
        }

        public Usuario GetUsuarioById(int usuarioId)
        {
            return FindByCondition(p => p.Id.Equals(usuarioId))
                .Include(p => p.Pets)
                .FirstOrDefault();
        }
        public void CreateUsuario(Usuario usuario)
        {
            Create(usuario);
        }
        public void UpdateUsuario(Usuario usuario)
        {
            Create(usuario);
        }
        public void DeleteUsuario(Usuario usuario)
        {
            Create(usuario);
        }

        public void Authenticate(AuthenticateDto model)
        {

        }

    }
}
