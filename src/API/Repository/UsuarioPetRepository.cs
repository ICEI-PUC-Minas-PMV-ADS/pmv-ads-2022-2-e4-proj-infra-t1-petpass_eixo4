using Microsoft.EntityFrameworkCore;
using PetPassBackend.Contracts;
using PetPassBackend.Models;

namespace PetPassBackend.Repository
{
    public class UsuarioPetRepository : RepositoryBase<UsuarioPet>,IUsuarioPetRepository
    {
        public UsuarioPetRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {

        }
        public void CreateUsuarioPet(UsuarioPet usuarioPet)
        {
            Create(usuarioPet);
        }

        public void DeleteUsuarioPet(UsuarioPet usuarioPet)
        {
            Delete(usuarioPet);
        }

        public IEnumerable<UsuarioPet> GetAllUsuarioPet()
        {
            return FindAll().ToList();
        }

        public IEnumerable<UsuarioPet> GetPetUsuarios(int usuarioId)
        {
            return FindByCondition(p => p.UsuarioId == usuarioId).Include(p => p.Pet).ToList();
        }

        public IEnumerable<UsuarioPet> GetUsuariosPet(int petId)
        {
            return FindByCondition(p => p.PetId == petId).Include(p=>p.Usuario).ToList();
        }
    }
}
