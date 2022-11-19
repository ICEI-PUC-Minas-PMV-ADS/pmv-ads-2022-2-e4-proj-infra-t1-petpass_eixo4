using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PetPassBackend.Contracts;
using PetPassBackend.Controllers;
using PetPassBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTests.MockData;

namespace UnitTests.UnitTests
{
    public class UsuariosControllerTests
    {
        private readonly Mock<IRepositoryWrapper> _mockRepo;
        private readonly UsuariosController _controller;
        private readonly List<Usuario> _usuarioList;

        public UsuariosControllerTests()
        {
            _mockRepo = new Mock<IRepositoryWrapper>();
            _controller = new UsuariosController(_mockRepo.Object);
            _usuarioList = UsuarioMockData.GetMockUsuarios();
        }


        [Fact]
        public void GetAll_ExecutaAcao_RetornaOkResult()
        {
            //Arrange
            _mockRepo.Setup(c => c.Usuario.GetAllUsuarios()).Returns(_usuarioList);
            //Act
            var result = (OkObjectResult)_controller.GetAll();

            //Assert
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public void GetAll_ExecutaAcao_RetornaTodosOsItens()
        {
            //Arrange

            _mockRepo.Setup(c => c.Usuario.GetAllUsuarios()).Returns(UsuarioMockData.GetMockUsuarios());

            //Act
            var result = (OkObjectResult)_controller.GetAll();
            var items = Assert.IsType<List<Usuario>>(result.Value);

            //Assert
            items.Count.Should().Be(4);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        public void GetById_IdValido_RetornaOk(int usuarioId)
        {
            //Arrange

            _mockRepo.Setup(c => c.Usuario.GetUsuarioById(usuarioId)).Returns(() => _usuarioList.Find(c => c.Id == usuarioId));


            //Act
            var result = _controller.GetById(usuarioId) as ObjectResult;

            //Assert
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public void GetById_IdInvalido_RetornaOk()
        {
            //Arrange
            var usuarioId = 5;
            _mockRepo.Setup(c => c.Usuario.GetUsuarioById(usuarioId)).Returns(() => _usuarioList.Find(c => c.Id == usuarioId));


            //Act
            var result = (NotFoundResult)_controller.GetById(usuarioId);

            //Assert
            result.StatusCode.Should().Be(404);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        public void GetById_IdValido_RetornaItemCorreto(int usuarioId)
        {
            //Arrange
            _mockRepo.Setup(c => c.Usuario.GetUsuarioById(usuarioId)).Returns(() => _usuarioList.Find(c => c.Id == usuarioId));

            //Act
            var okResult = _controller.GetById(usuarioId) as OkObjectResult;
            var pet = okResult.Value as Usuario;

            //Assert
            pet.Id.Should().Be(usuarioId);
        }

        [Fact]
        public async void Create_ObjetoValido_RetornaCreateResponse()
        {
            //Arrange

            var mockUsuario = new Usuario
            {
                Id = 5,
                Email = "Rodrigo",
                Password = "12345",
                Perfil=Perfil.Administrador
            };
            var mockUsuarioDto = new UsuarioDto()
            {
                Nome=mockUsuario.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(mockUsuario.Password),
                Perfil = mockUsuario.Perfil
            };
            _mockRepo.Setup(c => c.Usuario.Create(mockUsuario));


            //Act
            var createResult = await _controller.Create(mockUsuarioDto) as CreatedAtActionResult;

            //Assert
            createResult.StatusCode.Should().Be(201);

        }

        [Fact]
        public async void Create_ObjetoValido_RepostaContemItemCriado()
        {
            //Arrange
            var mockUsuario = new Usuario
            {
                Id = 5,
                Email = "Rodrigo",
                Password = "12345",
                Perfil = Perfil.Administrador
            };

            var mockUsuarioDto = new UsuarioDto()
            {
                Nome = mockUsuario.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(mockUsuario.Password),
                Perfil = mockUsuario.Perfil
            };
            _mockRepo.Setup(c => c.Usuario.Create(mockUsuario));


            //Act
            var createResult = await _controller.Create(mockUsuarioDto) as CreatedAtActionResult;
            var usuario = createResult.Value as Usuario;

            //Assert
            usuario.Email.Should().Be("Rodrigo");
        }

        [Fact]
        public async void Delete_ObjetoValido_RetornaCodigo204()
        {
            //Arrange
            var usuarioId = 1;
            _mockRepo.Setup(c => c.Usuario.GetUsuarioById(usuarioId)).Returns(() => _usuarioList.Find(c => c.Id == usuarioId));


            //Act
            var deleteResult = await _controller.Delete(usuarioId) as NoContentResult;

            //Assert
            deleteResult.StatusCode.Should().Be(204);

        }

        [Fact]
        public async void Delete_ObjetoInvalido_RetornaNotFound()
        {
            //Arrange
            var usuarioId = 11;
            var mockUsuario = new Usuario
            {
                Id = 11,
            };
            _mockRepo.Setup(c => c.Usuario.GetUsuarioById(usuarioId)).Returns(() => _usuarioList.Find(c => c.Id == usuarioId));


            //Act
            var deleteResult = await _controller.Delete(mockUsuario.Id) as NotFoundResult;

            //Assert
            deleteResult.StatusCode.Should().Be(404);
        }

        [Fact]
        public async void Update_ObjetoInvalido_RetornaNotFound()
        {
            //Arrange
            var usuarioId = 11;
            var mockUsuario = new UsuarioDto
            {
                Id = 11,
            };
            _mockRepo.Setup(c => c.Usuario.GetUsuarioById(usuarioId)).Returns(() => _usuarioList.Find(c => c.Id == usuarioId));


            //Act
            var updateResult = await _controller.Update(usuarioId, mockUsuario) as NotFoundResult;

            //Assert
            updateResult.StatusCode.Should().Be(404);
        }

        [Fact]
        public async void Update_ObjetoValido_RetornaNoContent()
        {
            //Arrange
            var usuarioId = 1;
            var mockUsuario = new UsuarioDto
            {
                Id = 1,
                Password= BCrypt.Net.BCrypt.HashPassword("54321")
            };
            _mockRepo.Setup(c => c.Usuario.GetUsuarioById(usuarioId)).Returns(() => _usuarioList.Find(c => c.Id == usuarioId));


            //Act
            var updateResult = await _controller.Update(usuarioId, mockUsuario) as NoContentResult;

            //Assert
            updateResult.StatusCode.Should().Be(204);
        }

        [Fact]
        public async void Update_IdsDiferentes_RetornaBadRequest()
        {
            //Arrange
            var usuarioId = 1;
            var mockUsuario = new UsuarioDto
            {
                Id = 2,
            };
            _mockRepo.Setup(c => c.Usuario.GetUsuarioById(usuarioId)).Returns(() => _usuarioList.Find(c => c.Id == usuarioId));

            //Act
            var updateResult = await _controller.Update(usuarioId, mockUsuario) as BadRequestResult;

            //Assert
            updateResult.StatusCode.Should().Be(400);
        }

    }
}
