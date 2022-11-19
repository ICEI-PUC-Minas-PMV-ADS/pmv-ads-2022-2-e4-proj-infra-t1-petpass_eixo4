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
        private readonly IUrlHelper _urlHelper;

        public PetsController(IRepositoryWrapper repository, IUrlHelper urlHelper)
        {
            _repository = repository;
            _urlHelper = urlHelper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var model = _repository.Pet.GetAllPets();

                return Ok(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro interno do servidor: " +
                    $"\n Message: {e.Message}" +
                    $"\n InnerException: {e.InnerException}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var model = _repository.Pet.GetFullPetById(id);

                if (model == null) return NotFound();

                return Ok(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro interno do servidor: " +
                    $"\n Message: {e.Message}" +
                    $"\n InnerException: {e.InnerException}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(Pet model)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();

                if (model.DataRegistro == DateTime.MinValue) model.DataRegistro = DateTime.Today;

                _repository.Pet.CreatePet(model);
                await _repository.Save();

                return CreatedAtAction("GetById", new { id = model.Id }, model);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro interno do servidor: " +
                    $"\n Message: {e.Message}" +
                    $"\n InnerException: {e.InnerException}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Pet model)
        {
            try
            {
                if (id != model.Id) return BadRequest();

                var modelDb = _repository.Pet.GetPetById(id);

                if (modelDb == null) return NotFound();

                _repository.Pet.Update(model);
                await _repository.Save();

                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro interno do servidor: " +
                    $"\n Message: {e.Message}" +
                    $"\n InnerException: {e.InnerException}");
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var model = _repository.Pet.GetPetById(id);

                if (model == null) return NotFound();

                _repository.Pet.DeletePet((Pet)model);
                await _repository.Save();

                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro interno do servidor: " +
                    $"\n Message: {e.Message}" +
                    $"\n InnerException: {e.InnerException}");
            }
        }
        //private void GerarLinks(Pet model)
        //{
        //    model.Links.Add(new LinkDto(model.Email, _urlHelper.ActionLink(), rel: "self", method: "GET"));
        //    model.Links.Add(new LinkDto(model.Email, _urlHelper.ActionLink(), rel: "update", method: "PUT"));
        //    model.Links.Add(new LinkDto(model.Email, _urlHelper.ActionLink(), rel: "delete", method: "DELETE"));
        //}

        [HttpPost("{id}/usuarios")]
        public async Task<ActionResult> AddUsuario(int id, UsuarioPet model)
        {
            if (id != model.PetId) return BadRequest();

            _repository.UsuariosPets.CreateUsuarioPet(model);
            await _repository.Save();

            return CreatedAtAction("GetById", new { id = model.PetId }, model);
        }

        [HttpDelete("{id}/usuarios/{usuarioId}")]
        public async Task<ActionResult> DeleteUsuario(int id, int usuarioId)
        {
            var pet = _repository.Pet.FindByCondition(p => p.Id == id);
            var model = _repository.UsuariosPets.GetAllUsuarioPet()
                .Where(v => v.PetId == id && v.UsuarioId == usuarioId)
                .FirstOrDefault();

            if (model == null) return NotFound();

            _repository.UsuariosPets.DeleteUsuarioPet(model);
            await _repository.Save();

            return NoContent();
        }

        [HttpPost("{id}/vacinas")]
        public async Task<ActionResult> AddVacina(int id, RegistroVacina model)
        {
            if (id != model.PetId) return BadRequest();

            _repository.Registro.Create(model);
            await _repository.Save();

            return CreatedAtAction("GetById", new { id = model.PetId }, model);
        }

        [HttpPut("{id}/vacinas/{vacinaId}")]
        public async Task<ActionResult> UpdateVacina(int id, RegistroVacina model)
        {
            if (id != model.PetId) return BadRequest();

            _repository.Registro.Update(model);
            await _repository.Save();

            return CreatedAtAction("GetById", new { id = model.PetId }, model);
        }

        [HttpDelete("{id}/vacinas/{registroId}")]
        public ActionResult DeleteVacina(int registroId)
        {
            RegistroVacina model = _repository.Registro.GetRegistroById(registroId);

            if (model == null) return NotFound();

            _repository.Registro.DeleteRegistro(model);
            _repository.Save();

            return NoContent();
        }


    }
}
