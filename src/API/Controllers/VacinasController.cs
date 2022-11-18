using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetPassBackend.Contracts;
using PetPassBackend.Models;

namespace PetPassBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacinasController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public VacinasController(IRepositoryWrapper context)
        {
            _repository = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var model = _repository.Vacina.GetAllVacinas();

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
                var model = _repository.Vacina.GetVacinaById(id);

                if (model == null) return NotFound();

                return Ok(model);
            }
            catch (Exception)
            {
                return StatusCode(500, "Erro interno do servidor");
            }

            //GerarLinks(model);

        }

        [HttpPost]
        public async Task<IActionResult> Create(Vacina model)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();

                _repository.Vacina.CreateVacina(model);
                await _repository.Save();

                return CreatedAtAction("GetById", new { id = model.Id }, model);
            }
            catch (Exception)
            {
                return StatusCode(500, "Erro interno do servidor");
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Vacina model)
        {
            if (id != model.Id) return BadRequest();

            var modelDb = _repository.Vacina.GetVacinaById(id);

            if (modelDb == null) return NotFound();

            _repository.Vacina.Update(model);
            await _repository.Save();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var model = _repository.Vacina.GetVacinaById(id);

            if (model == null) return NotFound();

            _repository.Vacina.DeleteVacina(model);
            await _repository.Save();

            return NoContent();
        }

    }

}

