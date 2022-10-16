using System.ComponentModel.DataAnnotations;

namespace PetPassBackend.Models
{
    public class RegistroVacina
    {
        public int PetId { get; set; }
        public Pet Pet { get; set; }
        public int VacinaId { get; set; }
        public Vacina Vacina { get; set; }

        [DataType(DataType.Date)]
        public DateTime Data { get; set; }
        public double Idade { get; set; }
    }
}
