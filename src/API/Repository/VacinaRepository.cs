using Microsoft.EntityFrameworkCore;
using PetPassBackend.Contracts;
using PetPassBackend.Models;

namespace PetPassBackend.Repository
{
    public class VacinaRepository : RepositoryBase<Vacina>, IVacinaRepository
    {
        public VacinaRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {

        }
        public IEnumerable<Vacina> GetAllVacinas()
        {
            return (IEnumerable<Vacina>)FindAll().ToListAsync();
        }

        public Vacina GetVacinaById(int vacinaId)
        {
            return FindByCondition(p => p.Id.Equals(vacinaId))
                .Include(p => p.RegistroVacinas)
                .FirstOrDefault();
        }
        public void CreateVacina(Vacina vacina)
        {
            Create(vacina);
        }
        public void UpdateVacina(Vacina vacina)
        {
            Update(vacina);
        }
        public void DeleteVacina(Vacina vacina)
        {
            Delete(vacina);
        }

    }
}
