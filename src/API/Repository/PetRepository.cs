
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
            return FindAll().OrderBy(p => p.Id)
                .ToList();
        }

        public Pet GetPetById(int petId)
        {
            return FindByCondition(p => p.Id.Equals(petId))
                .FirstOrDefault();
        }
        public void CreatePet(Pet pet)
        {
            Create(pet);
        }
        public void UpdatePet(Pet pet)
        {
            Update(pet);
        }
        public void DeletePet(Pet pet)
        {
            Delete(pet);
        }

        public Pet GetFullPetById(int petId)
        {
            return FindByCondition(p => p.Id.Equals(petId))
                .Include(p=>p.RegistroVacinas)
                .ThenInclude(p=>p.Vacina)
                .Include(p=>p.Usuarios)
                .FirstOrDefault();
        }
    }
}
