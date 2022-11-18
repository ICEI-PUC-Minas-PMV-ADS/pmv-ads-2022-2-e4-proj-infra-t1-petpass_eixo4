using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetPassBackend.Models
{
    public class RegistroVacina : LinksHATEOAS
    {
        [Key]
        public int Id { get; set; }
        public int PetId { get; set; }

        [ForeignKey("PetId")]
        public Pet Pet { get; set; }
        
        [ForeignKey("VacinaId")]
        public int VacinaId { get; set; }
        public Vacina Vacina { get; set; }

        [DataType(DataType.Date)]
        public DateTime Data { get; set; }
        public double Idade { get; set; }
    }
}
