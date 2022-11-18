using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace PetPassBackend.Models
{
    public class Usuario : LinksHATEOAS
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        [JsonIgnore]
        public string Password { get; set; }

        [Required]
        public Perfil Perfil { get; set; }

        public ICollection<UsuarioPet> Pets { get; set; }
    }

    public enum Perfil
    {
        [Display(Name = "Usuário")]
        Usuario,
        [Display(Name = "Administrador")]
        Administrador,
        [Display(Name ="Instituição")]
        Instituicao
    }
}
