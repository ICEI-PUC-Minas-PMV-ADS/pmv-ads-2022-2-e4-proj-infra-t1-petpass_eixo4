using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetPassBackend.Models
{
    public class Pet
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Campo obrigatório")]
        [MaxLength(100)]
        [Display(Name ="Nome do Pet")]
        public string NomePet { get; set; }

        [Required(ErrorMessage ="Campo obrigatório")]
        public TipoPet Tipo { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        public SexoPet Sexo { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(100)]
        [Display(Name ="Raça")]
        public string Raca { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [Column(TypeName ="decimal(18,2)")]
        public double Peso { get; set; }

        [Display(Name ="Data do Registro")]
        [DataType(DataType.Date)]
        public DateTime DataRegistro { get; set; }

        public enum TipoPet
        {
            Cachorro,
            Gato
        }
        public enum SexoPet
        {
            femea,
            macho
        }
    }
}
