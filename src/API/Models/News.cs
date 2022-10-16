using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PetPassBackend.Models
{
    public class News
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateTime Data { get; set; }

        [BsonElement("Título")]
        public string Titulo { get; set; }

        [BsonElement("Notícia")]
        public string Noticia { get; set; }

    }
}
