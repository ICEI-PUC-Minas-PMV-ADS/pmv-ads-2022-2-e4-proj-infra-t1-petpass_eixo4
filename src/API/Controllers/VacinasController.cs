using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetPassBackend.Models;

namespace PetPassBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacinasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VacinasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Vacinas.ToListAsync();

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Vacinas
                .FirstOrDefaultAsync(v => v.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Vacina model)
        {
            _context.Vacinas.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Vacina model)
        {
            if (id != model.Id) return BadRequest();

            var modelDb = await _context.Vacinas.AsNoTracking().FirstOrDefaultAsync(v => v.Id == id);

            if (modelDb == null) return NotFound();

            _context.Vacinas.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Vacinas.FindAsync(id);

            if (model == null) return NotFound();

            _context.Vacinas.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }

}

