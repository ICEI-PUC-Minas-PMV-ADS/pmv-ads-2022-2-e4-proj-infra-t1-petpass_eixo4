using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PetPassBackend.Models;

namespace PetPassBackend.Services
{
    public class NewsService
    {
        private readonly IMongoCollection<News> _newsCollection;

        public NewsService(
            IOptions<PetPassNewsDatabaseSettings> petPassNewsDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                petPassNewsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                petPassNewsDatabaseSettings.Value.DatabaseName);

            _newsCollection = mongoDatabase.GetCollection<News>(
                petPassNewsDatabaseSettings.Value.NewsCollectionName);
        }

        public async Task<List<News>> GetAsync() =>
            await _newsCollection.Find(_ => true).ToListAsync();

        public async Task<News> GetAsync(string id) =>
            await _newsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(News addNews) =>
            await _newsCollection.InsertOneAsync(addNews);

        public async Task UpdateAsync(string id, News updatedBook) =>
            await _newsCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

        public async Task RemoveAsync(string id) =>
            await _newsCollection.DeleteOneAsync(x => x.Id == id);

    }
}
