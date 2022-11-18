using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace PetPassBackend.Models
{
    public class Vacina : LinksHATEOAS
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [Display(Name = "Nome do Pet")]
        public TipoAnimal TipoPet { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(1000)]
        [Display(Name = "Descrição")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(100)]
        public string Dose { get; set; }

        public ICollection<RegistroVacina> PetsVacinados { get; set; }

        public enum TipoAnimal
        {
            Cachorro,
            Gato
        }
    }
}
