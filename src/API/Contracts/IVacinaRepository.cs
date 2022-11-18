using PetPassBackend.Models;

namespace PetPassBackend.Contracts
{
    public interface IVacinaRepository : IRepositoryBase<Vacina>
    {
        IEnumerable<Vacina> GetAllVacinas();
        Vacina GetVacinaById(int id);
        void CreateVacina(Vacina vacina);
        void UpdateVacina(Vacina vacina);
        void DeleteVacina(Vacina vacina);
    }
}
