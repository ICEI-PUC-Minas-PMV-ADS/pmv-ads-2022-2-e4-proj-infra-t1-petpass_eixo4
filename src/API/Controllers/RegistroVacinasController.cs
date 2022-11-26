using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetPassBackend.Contracts;
using PetPassBackend.Models;

namespace PetPassBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroVacinasController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public RegistroVacinasController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var model = _repository.Registro.GetAllRegistros();

                return Ok(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro interno do servidor: " +
                    $"\n Message: {e.Message}"+
                    $"\n InnerException: {e.InnerException}");
            }
        }

        [HttpGet("Pet/{petId}")]
        public IActionResult GetVacinasDoPet(int petId)
        {
            try
            {
                var model = _repository.Registro.GetVacinasPet(petId);

                return Ok(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erro interno do servidor: " +
                    $"\n Message: {e.Message}" +
                    $"\n InnerException: {e.InnerException}");
            }
        }

        [HttpGet("Vacina/{vacinaId}")]
        public IActionResult GetAllPetsVacinados(int vacinaId)
        {
            try
            {
                var model = _repository.Registro.GetPetsVacinados(vacinaId);

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
                var model = _repository.Registro.GetRegistroById(id);

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
        public async Task<IActionResult> Create(RegistroVacina model)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();

                _repository.Registro.CreateRegistro(model);
                await _repository.Save();

                return CreatedAtAction("GetById", new { id = model.Id }, model);
            }
            catch (Exception)
            {
                return StatusCode(500, "Erro interno do servidor");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, RegistroVacina model)
        {
            if (id != model.Id) return BadRequest();

            var modelDb = _repository.Registro.GetRegistroById(id);

            if (modelDb == null) return NotFound();

            _repository.Registro.Update(model);
            await _repository.Save();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var model = _repository.Registro.GetRegistroById(id);

            if (model == null) return NotFound();

            _repository.Registro.DeleteRegistro(model);
            await _repository.Save();

            return NoContent();
        }
        //private void GerarLinks(RegistroVacina model)
        //{
        //    model.Links.Add(new LinkDto(model.Email, Url.ActionLink(), rel: "self", method: "GET"));
        //    model.Links.Add(new LinkDto(model.Email, Url.ActionLink(), rel: "update", method: "PUT"));
        //    model.Links.Add(new LinkDto(model.Email, Url.ActionLink(), rel: "delete", method: "DELETE"));
        //}
    }
}
