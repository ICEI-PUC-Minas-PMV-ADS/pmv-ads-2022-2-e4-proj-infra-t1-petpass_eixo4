
using Microsoft.EntityFrameworkCore;
using PetPassBackend.Contracts;
using PetPassBackend.Models;

namespace PetPassBackend.Repository
{
    public class PetRepository : RepositoryBase<Pet>, IPetRepository
    {
        public PetRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {

        }
        public IEnumerable<Pet> GetAllPets()
        {
            return (IEnumerable<Pet>)FindAll().OrderBy(p => p.Id).ToListAsync();
        }

        public Pet GetPetById(int petId)
        {
            return FindByCondition(p => p.Id.Equals(petId))
                .Include(p => p.Usuarios)
                .Include(p => p.RegistroVacinas)
                .FirstOrDefault();
        }
        public void CreatePet(Pet pet)
        {
            Create(pet);
        }
        public void UpdatePet(Pet pet)
        {
            Create(pet);
        }
        public void DeletePet(Pet pet)
        {
            Create(pet);
        }
    }
}
