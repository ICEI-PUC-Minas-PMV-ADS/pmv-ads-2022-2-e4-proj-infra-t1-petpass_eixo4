namespace PetPassBackend.Models
{
    public class PetPassNewsDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string NewsCollectionName { get; set; } = null!;
    }
}
