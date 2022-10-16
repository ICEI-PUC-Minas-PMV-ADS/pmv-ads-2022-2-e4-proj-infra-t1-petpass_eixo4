namespace PetPassBackend.Models
{
    public class UsuarioPet
    {
        public int PetId { get; set; }
        public Pet Pet { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
