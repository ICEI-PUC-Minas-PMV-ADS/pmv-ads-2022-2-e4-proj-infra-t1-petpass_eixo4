namespace PetPassBackend.Models
{
    public class LinksHATEOASCollection<T> : LinksHATEOAS where T:class
    {
        public List<T> Values { get; set; }
        public LinksHATEOASCollection(List<T> values)
        {
            Values = values;
        }
    }
}
