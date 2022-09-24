using Microsoft.EntityFrameworkCore;

namespace PetPassBackend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Pet> Pets { get; set; }

        public DbSet<Vacina> Vacinas { get; set; }
    }
}
