using PetPassBackend.Models;

namespace PetPassBackend.Contracts
{
    public interface IPetRepository : IRepositoryBase<Pet>
    {
        IEnumerable<Pet> GetAllPets();
        Pet GetPetById(int id);
        void CreatePet(Pet pet);
        void UpdatePet(Pet pet);
        void DeletePet(Pet pet);
    }
}
