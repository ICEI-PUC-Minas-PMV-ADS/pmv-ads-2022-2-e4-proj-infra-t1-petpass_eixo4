using System.ComponentModel.DataAnnotations;

namespace PetPassBackend.Models
{
    public class AuthenticateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
