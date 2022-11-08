using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetPassBackend.Contracts;
using PetPassBackend.Models;
using System.Data;

namespace PetPassBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public PetsController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var model = _repository.Pet.GetAllPets();

                return Ok(model);
            }
            catch (Exception)
            {
                return StatusCode(500, "Erro interno do servidor");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var model = _repository.Pet.GetPetById(id);

                if (model == null) return NotFound();

                //GerarLinks(model);
                return Ok(model);
            }
            catch (Exception)
            {
                return StatusCode(500, "Erro interno do servidor");
            }


        }

        [HttpPost]
        public IActionResult Create(Pet model)
        {
            model.DataRegistro = DateTime.Today;

            _repository.Pet.CreatePet(model);
            _repository.Save();

            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Pet model)
        {
            if (id != model.Id) return BadRequest();

            var modelDb = _repository.Pet.GetPetById(id);

            if (modelDb == null) return NotFound();

            _repository.Pet.Update(model);
            _repository.Save();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var model = _repository.Pet.GetPetById(id);

            if (model == null) return NotFound();

            _repository.Pet.DeletePet(model);
            _repository.Save();

            return NoContent();
        }
        private void GerarLinks(Pet model)
        {
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "self", metodo: "GET"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "update", metodo: "PUT"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "delete", metodo: "DELETE"));
        }

        //[HttpPost("{id}/usuarios")]
        //public async Task<ActionResult> AddUsuario(int id, UsuarioPet model)
        //{
        //    if (id != model.PetId) return BadRequest();

        //    _repository.UsuarioPets.Add(model);
        //    await _repository.SaveChangesAsync();

        //    return CreatedAtAction("GetById", new { id = model.PetId }, model);
        //}

        //[HttpDelete("{id}/usuarios/{usuarioId}")]
        //public async Task<ActionResult> DeleteUsuario(int id, int usuarioId)
        //{
        //    var model = await _repository.UsuarioPets
        //        .Where(v => v.PetId == id && v.UsuarioId == usuarioId)
        //        .FirstOrDefaultAsync();

        //    if (model == null) return NotFound();

        //    _repository.UsuarioPets.Remove(model);
        //    await _repository.SaveChangesAsync();

        //    return NoContent();
        //}

        //[HttpPost("{id}/vacinas")]
        //public async Task<ActionResult> AddVacina(int id, RegistroVacina model)
        //{
        //    if (id != model.PetId) return BadRequest();

        //    _repository.RegistroVacinas.Add(model);
        //    await _repository.SaveChangesAsync();

        //    return CreatedAtAction("GetById", new { id = model.PetId }, model);
        //}

        //[HttpPut("{id}/vacinas/{vacinaId}")]
        //public async Task<ActionResult> UpdateVacina(int id, RegistroVacina model)
        //{
        //    if (id != model.PetId) return BadRequest();

        //    _repository.RegistroVacinas.Update(model);
        //    await _repository.SaveChangesAsync();

        //    return CreatedAtAction("GetById", new { id = model.PetId }, model);
        //}

        //[HttpDelete("{id}/vacinas/{vacinaId}")]
        //public async Task<ActionResult> DeleteVacina(int id, int vacinaId)
        //{
        //    var model = await _repository.RegistroVacinas
        //        .Where(v => v.PetId == id && v.VacinaId == vacinaId)
        //        .FirstOrDefaultAsync();

        //    if (model == null) return NotFound();

        //    _repository.RegistroVacinas.Remove(model);
        //    await _repository.SaveChangesAsync();

        //    return NoContent();
        //}


    }
}
