using Microsoft.AspNetCore.Mvc;
using PetPassBackend.Models;
using PetPassBackend.Services;

namespace PetPassBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly NewsService _newsService;

        public NewsController(NewsService newsService) =>
            _newsService = newsService;

        [HttpGet]
        public async Task<List<News>> Get() =>
            await _newsService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<News>> Get(string id)
        {
            var news = await _newsService.GetAsync(id);

            if (news is null)
            {
                return NotFound();
            }

            return news;
        }

        [HttpPost]
        public async Task<IActionResult> Post(News addNews)
        {
            await _newsService.CreateAsync(addNews);

            return CreatedAtAction(nameof(Get), new { id = addNews.Id }, addNews);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, News updatedNews)
        {
            var news = await _newsService.GetAsync(id);

            if (news is null)
            {
                return NotFound();
            }

            updatedNews.Id = news.Id;

            await _newsService.UpdateAsync(id, updatedNews);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var news = await _newsService.GetAsync(id);

            if (news is null)
            {
                return NotFound();
            }

            await _newsService.RemoveAsync(id);

            return NoContent();
        }
    }
}

