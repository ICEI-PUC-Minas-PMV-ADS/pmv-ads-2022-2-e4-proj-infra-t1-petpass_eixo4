using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PetPassBackend.Contracts;
using PetPassBackend.Controllers;
using PetPassBackend.Models;
using UnitTests.MockData;

namespace UnitTests.UnitTests
{
    public class VacinasControllerTests
    {
        private readonly Mock<IRepositoryWrapper> _mockRepo;
        private readonly VacinasController _controller;
        private readonly List<Vacina> _vacinaList;

        public VacinasControllerTests()
        {
            _mockRepo = new Mock<IRepositoryWrapper>();
            _controller = new VacinasController(_mockRepo.Object);
            _vacinaList = VacinaMockData.GetMockVacinas();
        }
        [Fact]
        public void GetAll_ExecutaAcao_RetornaOkResult()
        {
            //Arrange
            _mockRepo.Setup(c => c.Vacina.GetAllVacinas()).Returns(_vacinaList);
            //Act
            var result = (OkObjectResult)_controller.GetAll();

            //Assert
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public void GetAll_ExecutaAcao_RetornaTodosOsItens()
        {
            //Arrange

            _mockRepo.Setup(c => c.Vacina.GetAllVacinas()).Returns(VacinaMockData.GetMockVacinas());

            //Act
            var result = (OkObjectResult)_controller.GetAll();
            var items = Assert.IsType<List<Vacina>>(result.Value);

            //Assert
            items.Count.Should().Be(4);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(4)]
        [InlineData(12)]
        public void GetById_IdValido_RetornaOk(int vacinaId)
        {
            //Arrange

            _mockRepo.Setup(c => c.Vacina.GetVacinaById(vacinaId)).Returns(() => _vacinaList.Find(c => c.Id == vacinaId));


            //Act
            var result = _controller.GetById(vacinaId) as ObjectResult;

            //Assert
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public void GetById_IdInvalido_RetornaOk()
        {
            //Arrange
            var vacinaId = 5;
            _mockRepo.Setup(c => c.Vacina.GetVacinaById(vacinaId)).Returns(() => _vacinaList.Find(c => c.Id == vacinaId));


            //Act
            var result = (NotFoundResult)_controller.GetById(vacinaId);

            //Assert
            result.StatusCode.Should().Be(404);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(4)]
        [InlineData(12)]
        public void GetById_IdValido_RetornaItemCorreto(int vacinaId)
        {
            //Arrange
            _mockRepo.Setup(c => c.Vacina.GetVacinaById(vacinaId)).Returns(() => _vacinaList.Find(c => c.Id == vacinaId));

            //Act
            var okResult = _controller.GetById(vacinaId) as OkObjectResult;
            var pet = okResult.Value as Vacina;

            //Assert
            pet.Id.Should().Be(vacinaId);
        }

        [Fact]
        public async void Create_ObjetoValido_RetornaCreateResponse()
        {
            //Arrange

            var mockVacina = new Vacina
            {
                Id = 5,
                Descricao = "Nova vacina",
                Dose = "25mg",
                TipoPet = 0
            };
            _mockRepo.Setup(c => c.Vacina.Create(mockVacina));


            //Act
            var createResult = await _controller.Create(mockVacina) as CreatedAtActionResult;

            //Assert
            createResult.StatusCode.Should().Be(201);

        }

        [Fact]
        public async void Create_ObjetoValido_RepostaContemItemCriado()
        {
            //Arrange

            var mockVacina = new Vacina
            {
                Id = 5,
                Descricao = "Nova vacina",
                Dose = "25mg",
                TipoPet = 0
            };
            _mockRepo.Setup(c => c.Vacina.Create(mockVacina));


            //Act
            var createResult = await _controller.Create(mockVacina) as CreatedAtActionResult;
            var vacina = createResult.Value as Vacina;

            //Assert
            vacina.Descricao.Should().Be("Nova vacina");
        }

        [Fact]
        public async void Delete_ObjetoValido_RetornaCodigo204()
        {
            //Arrange
            var vacinaId = 1;
            _mockRepo.Setup(c => c.Vacina.GetVacinaById(vacinaId)).Returns(() => _vacinaList.Find(c => c.Id == vacinaId));


            //Act
            var deleteResult = await _controller.Delete(vacinaId) as NoContentResult;

            //Assert
            deleteResult.StatusCode.Should().Be(204);

        }

        [Fact]
        public async void Delete_ObjetoInvalido_RetornaNotFound()
        {
            //Arrange
            var vacinaId = 11;
            var mockVacina = new Vacina
            {
                Id = 11,
            };
            _mockRepo.Setup(c => c.Vacina.GetVacinaById(vacinaId)).Returns(() => _vacinaList.Find(c => c.Id == vacinaId));


            //Act
            var deleteResult = await _controller.Delete(mockVacina.Id) as NotFoundResult;

            //Assert
            deleteResult.StatusCode.Should().Be(404);
        }

        [Fact]
        public async void Update_ObjetoInvalido_RetornaNotFound()
        {
            //Arrange
            var vacinaId = 11;
            var mockVacina = new Vacina
            {
                Id = 11,
            };
            _mockRepo.Setup(c => c.Vacina.GetVacinaById(vacinaId)).Returns(() => _vacinaList.Find(c => c.Id == vacinaId));


            //Act
            var updateResult = await _controller.Update(vacinaId, mockVacina) as NotFoundResult;

            //Assert
            updateResult.StatusCode.Should().Be(404);
        }

        [Fact]
        public async void Update_ObjetoValido_RetornaNoContent()
        {
            //Arrange
            var vacinaId = 1;
            var mockVacina = new Vacina
            {
                Id = 1,
            };
            _mockRepo.Setup(c => c.Vacina.GetVacinaById(vacinaId)).Returns(() => _vacinaList.Find(c => c.Id == vacinaId));


            //Act
            var updateResult = await _controller.Update(vacinaId, mockVacina) as NoContentResult;

            //Assert
            updateResult.StatusCode.Should().Be(204);
        }

        [Fact]
        public async void Update_IdsDiferentes_RetornaBadRequest()
        {
            //Arrange
            var vacinaId = 1;
            var mockVacina = new Vacina
            {
                Id = 2,
            };
            _mockRepo.Setup(c => c.Vacina.GetVacinaById(vacinaId)).Returns(() => _vacinaList.Find(c => c.Id == vacinaId));

            //Act
            var updateResult = await _controller.Update(vacinaId, mockVacina) as BadRequestResult;

            //Assert
            updateResult.StatusCode.Should().Be(400);


        }
    }
}
