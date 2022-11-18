using System.ComponentModel.DataAnnotations.Schema;

namespace PetPassBackend.Models
{
    [NotMapped]
    public class LinkDto
    {
        public int Id { get; set; }

        public string Href { get; set; }

        public string Rel { get; set; }

        public string Method { get; set; }

        public LinkDto(string href, string rel, string method)
        {
            Href = href;
            Rel = rel;
            Method = method;
        }
    }
    public class LinksHATEOAS
    {
        public List<LinkDto> Links { get; set; } = new List<LinkDto>();
    }
}
