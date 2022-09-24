using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetPassBackend.Models;
using System.Data;

namespace PetPassBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PetsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Pets.ToListAsync();

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Pets
                .FirstOrDefaultAsync(v => v.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Pet model)
        {
            model.DataRegistro = DateTime.Today;

            _context.Pets.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Pet model)
        {
            if (id != model.Id) return BadRequest();

            var modelDb = await _context.Pets.AsNoTracking().FirstOrDefaultAsync(v => v.Id == id);

            if (modelDb == null) return NotFound();

            _context.Pets.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Pets.FindAsync(id);

            if (model == null) return NotFound();

            _context.Pets.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
