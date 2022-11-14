using PetPassBackend.Models;

namespace PetPassBackend.Contracts
{
    public interface IRegistroVacinaRepository : IRepositoryBase<RegistroVacina>
    {
        IEnumerable<RegistroVacina> GetAllRegistros();
        IEnumerable<RegistroVacina> GetVacinasPet(int petId);
        IEnumerable<RegistroVacina> GetPetsVacinados(int vacinaId);
        RegistroVacina GetRegistroById(int id);
        void CreateRegistro(RegistroVacina registroVacina);
        void UpdateRegistro(RegistroVacina registroVacina);
        void DeleteRegistro(RegistroVacina registroVacina);
    }
}
