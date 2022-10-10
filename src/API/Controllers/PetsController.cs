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
            var model = await _context.Pets
                .Include(c => c.Usuarios)
                .Include(c => c.RegistroVacinas)
                .ToListAsync();

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Pets
                .Include(c => c.Usuarios)
                .Include(c => c.RegistroVacinas)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (model == null) return NotFound();

            GerarLinks(model);
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
        private void GerarLinks(Pet model)
        {
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "self", metodo: "GET"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "update", metodo: "PUT"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "delete", metodo: "DELETE"));
        }

        [HttpPost("{id}/usuarios")]
        public async Task<ActionResult> AddUsuario(int id, UsuarioPet model)
        {
            if (id != model.PetId) return BadRequest();

            _context.UsuarioPets.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.PetId }, model);
        }

        [HttpDelete("{id}/usuarios/{usuarioId}")]
        public async Task<ActionResult> DeleteUsuario(int id, int usuarioId)
        {
            var model = await _context.UsuarioPets
                .Where(v => v.PetId == id && v.UsuarioId == usuarioId)
                .FirstOrDefaultAsync();

            if (model == null) return NotFound();

            _context.UsuarioPets.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/vacinas")]
        public async Task<ActionResult> AddVacina(int id, RegistroVacina model)
        {
            if (id != model.PetId) return BadRequest();

            _context.RegistroVacinas.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.PetId }, model);
        }

        [HttpPut("{id}/vacinas/{vacinaId}")]
        public async Task<ActionResult> UpdateVacina(int id, RegistroVacina model)
        {
            if (id != model.PetId) return BadRequest();

            _context.RegistroVacinas.Update(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.PetId }, model);
        }

        [HttpDelete("{id}/vacinas/{vacinaId}")]
        public async Task<ActionResult> DeleteVacina(int id, int vacinaId)
        {
            var model = await _context.RegistroVacinas
                .Where(v => v.PetId == id && v.VacinaId == vacinaId)
                .FirstOrDefaultAsync();

            if (model == null) return NotFound();

            _context.RegistroVacinas.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
