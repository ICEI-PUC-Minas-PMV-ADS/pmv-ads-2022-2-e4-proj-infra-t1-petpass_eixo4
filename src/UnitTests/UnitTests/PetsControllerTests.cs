using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Moq;
using PetPassBackend.Contracts;
using PetPassBackend.Controllers;
using PetPassBackend.Models;
using UnitTests.MockData;

namespace UnitTests.UnitTests
{
    public class PetsControllerTests
    {
        private readonly Mock<IRepositoryWrapper> _mockRepo;
        private readonly PetsController _controller;
        private readonly List<Pet> _petList;
        private readonly IUrlHelper _urlHelper;


        public PetsControllerTests()
        {
            _mockRepo = new Mock<IRepositoryWrapper>();
            _controller = new PetsController(_mockRepo.Object, _urlHelper);
            _petList = PetMockData.GetMockPets();
        }

        [Fact]
        public void GetAll_ExecutaAcao_RetornaOkResult()
        {
            //Arrange
            _mockRepo.Setup(c => c.Pet.GetAllPets()).Returns(_petList);
            //Act
            var result = (OkObjectResult)_controller.GetAll();

            //Assert
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public void GetAll_ExecutaAcao_RetornaTodosOsItens()
        {
            //Arrange

            _mockRepo.Setup(c => c.Pet.GetAllPets()).Returns(PetMockData.GetMockPets());

            //Act
            var result = (OkObjectResult)_controller.GetAll();
            var items = Assert.IsType<List<Pet>>(result.Value);

            //Assert
            items.Count.Should().Be(4);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(19)]
        public void GetById_IdValido_RetornaOk(int petId)
        {
            //Arrange

            _mockRepo.Setup(c => c.Pet.GetFullPetById(petId)).Returns(() => _petList.Find(c => c.Id == petId));


            //Act
            var result = _controller.GetById(petId) as ObjectResult;

            //Assert
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public void GetById_IdInvalido_RetornaOk()
        {
            //Arrange
            var petId = 5;
            _mockRepo.Setup(c => c.Pet.GetPetById(petId)).Returns(() => _petList.Find(c => c.Id == petId));


            //Act
            var result = (NotFoundResult)_controller.GetById(petId);

            //Assert
            result.StatusCode.Should().Be(404);
        }

        [Theory]
        [InlineData(3)]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(19)]
        public void GetById_IdValido_RetornaItemCorreto(int petId)
        {
            //Arrange
            _mockRepo.Setup(c => c.Pet.GetFullPetById(petId)).Returns(() => _petList.Find(c => c.Id == petId));

            //Act
            var okResult = _controller.GetById(petId) as OkObjectResult;
            var pet = okResult.Value as Pet;

            //Assert
            pet.Id.Should().Be(petId);
        }

        [Fact]
        public async void Create_ObjetoValido_RetornaCreateResponse()
        {
            //Arrange

            var mockPet = new Pet
            {
                Id = 5,
                NomePet = "Zeca",
                Raca = "Pincher",
            };
            _mockRepo.Setup(c => c.Pet.Create(mockPet));


            //Act
            var createResult = await _controller.Create(mockPet) as CreatedAtActionResult;

            //Assert
            createResult.StatusCode.Should().Be(201);

        }

        [Fact]
        public async void Create_ObjetoValido_RepostaContemItemCriado()
        {
            //Arrange

            var mockPet = new Pet
            {
                Id = 5,
                NomePet = "Zeca",
                Raca = "Pincher",
            };
            _mockRepo.Setup(c => c.Pet.Create(mockPet));


            //Act
            var createResult = await _controller.Create(mockPet) as CreatedAtActionResult;
            var pet = createResult.Value as Pet;

            //Assert
            pet.NomePet.Should().Be("Zeca");
        }

        [Fact]
        public async void Delete_ObjetoValido_RetornaCodigo204()
        {
            //Arrange
            var petId = 1;
            _mockRepo.Setup(c => c.Pet.GetPetById(petId)).Returns(() => _petList.Find(c => c.Id == petId));


            //Act
            var deleteResult = await _controller.Delete(petId) as NoContentResult;

            //Assert
            deleteResult.StatusCode.Should().Be(204);

        }

        [Fact]
        public async void Delete_ObjetoInvalido_RetornaNotFound()
        {
            //Arrange
            var petId = 11;
            var mockPet = new Pet
            {
                Id = 11,
            };
            _mockRepo.Setup(c => c.Pet.GetPetById(petId)).Returns(() => _petList.Find(c => c.Id == petId));


            //Act
            var deleteResult = await _controller.Delete(mockPet.Id) as NotFoundResult;

            //Assert
            deleteResult.StatusCode.Should().Be(404);
        }

        [Fact]
        public async void Update_ObjetoInvalido_RetornaNotFound()
        {
            //Arrange
            var petId = 11;
            var mockPet = new Pet
            {
                Id = 11,
            };
            _mockRepo.Setup(c => c.Pet.GetPetById(petId)).Returns(() => _petList.Find(c => c.Id == petId));


            //Act
            var updateResult = await _controller.Update(petId, mockPet) as NotFoundResult;

            //Assert
            updateResult.StatusCode.Should().Be(404);
        }

        [Fact]
        public async void Update_ObjetoValido_RetornaNoContent()
        {
            //Arrange
            var petId = 1;
            var mockPet = new Pet
            {
                Id = 1,
            };
            _mockRepo.Setup(c => c.Pet.GetPetById(petId)).Returns(() => _petList.Find(c => c.Id == petId));


            //Act
            var updateResult = await _controller.Update(petId, mockPet) as NoContentResult;

            //Assert
            updateResult.StatusCode.Should().Be(204);
        }

        [Fact]
        public async void Update_IdsDiferentes_RetornaBadRequest()
        {
            //Arrange
            var petId = 1;
            var mockPet = new Pet
            {
                Id = 2,
            };
            _mockRepo.Setup(c => c.Pet.GetPetById(petId)).Returns(() => _petList.Find(c => c.Id == petId));

            //Act
            var updateResult = await _controller.Update(petId, mockPet) as BadRequestResult;

            //Assert
            updateResult.StatusCode.Should().Be(400);
        }

    }
}