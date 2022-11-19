using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PetPassBackend.Contracts;
using PetPassBackend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PetPassBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public UsuariosController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var model = _repository.Usuario.GetAllUsuarios();

            return Ok(model);
        }

        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var model = _repository.Usuario.GetUsuarioById(id);

            if (model == null) return NotFound();

            //GerarLinks(model);
            return Ok(model);
        }

        [HttpGet("{id}/Pets")]
        public ActionResult GetPetsList(int id)
        {
            var model = _repository.UsuariosPets.GetPetsUsuario(id);

            if (model == null) return NotFound();

            //GerarLinks(model);
            return Ok(model);
        }

        [HttpPost("{id}/pets")]
        public async Task<ActionResult> AddPet(int id, UsuarioPet model)
        {
            if (id != model.UsuarioId) return BadRequest();

            _repository.UsuariosPets.CreateUsuarioPet(model);
            await _repository.Save();

            return CreatedAtAction("GetById", new { id = model.PetId }, model);
        }

        [HttpDelete("{id}/pets/{petId}")]
        public async Task<ActionResult> DeletePet(int id, UsuarioPet model)
        {
            if (id != model.UsuarioId) return BadRequest();

            _repository.UsuariosPets.DeleteUsuarioPet(model);
            await _repository.Save();

            return NoContent();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Create(UsuarioDto model)
        {
            Usuario novo = new()
            {
                Nome = model.Nome,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                Perfil = model.Perfil
            };

            _repository.Usuario.Create(novo);
            await _repository.Save();

            return CreatedAtAction("GetById", new { id = novo.Id }, novo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UsuarioDto model)
        {
            if (id != model.Id) return BadRequest();
            var modelDb = _repository.Usuario.GetUsuarioById(id);
            if (modelDb == null) return NotFound();

            modelDb.Nome = model.Nome;
            modelDb.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
            modelDb.Perfil = model.Perfil;


            _repository.Usuario.Update(modelDb);
            await _repository.Save();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = _repository.Usuario.GetUsuarioById(id);

            if (model == null) return NotFound();

            _repository.Usuario.Delete(model);
            await _repository.Save();

            return NoContent();
        }

        //private void GerarLinks(Usuario model)
        //{
        //    model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "self", method: "GET"));
        //    model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "update", method: "PUT"));
        //    model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "delete", method: "DELETE"));
        //}

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult> Authentication(AuthenticateDto model)
        {
            var usuarioDb = _repository.Usuario.GetUsuarioById(model.Id);

            if (usuarioDb == null || !BCrypt.Net.BCrypt.Verify(model.Password, usuarioDb.Password))
                return Unauthorized();

            var jwt = GenerateJwtToken(usuarioDb);

            return Ok(new { jwtToken = jwt });
        }

        private string GenerateJwtToken(Usuario model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Ry74cBQva5dThwbwchR9jhbtRFnJxWSZ");
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
                new Claim(ClaimTypes.Role, model.Perfil.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
