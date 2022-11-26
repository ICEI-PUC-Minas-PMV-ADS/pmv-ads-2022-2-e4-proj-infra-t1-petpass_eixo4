using Microsoft.EntityFrameworkCore;
using PetPassBackend.Contracts;
using PetPassBackend.Models;

namespace PetPassBackend.Repository
{
    public class RegistroVacinaRepository : RepositoryBase<RegistroVacina>, IRegistroVacinaRepository
    {
        public RegistroVacinaRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {

        }
        public IEnumerable<RegistroVacina> GetAllRegistros()
        {
            return (IEnumerable<RegistroVacina>)FindAll().ToList();
        }

        public IEnumerable<RegistroVacina> GetVacinasPet(int petId)
        {
            return (IEnumerable<RegistroVacina>)FindByCondition(p => p.PetId.Equals(petId))
                .Include(x => x.Vacina)
                .ToList();
        }

        public IEnumerable<RegistroVacina> GetPetsVacinados(int vacinaId)
        {
            return (IEnumerable<RegistroVacina>)FindByCondition(p => p.VacinaId.Equals(vacinaId))
                .ToList();
        }

        public RegistroVacina GetRegistroById(int registroId)
        {
            return FindByCondition(p => p.Id.Equals(registroId))
                .Include(p => p.Pet)
                .Include(p => p.Vacina)
                .FirstOrDefault();
        }
        public void CreateRegistro(RegistroVacina registro)
        {
            Create(registro);
        }
        public void UpdateRegistro(RegistroVacina registro)
        {
            Update(registro);
        }
        public void DeleteRegistro(RegistroVacina registro)
        {
            Delete(registro);
        }

    }
}
