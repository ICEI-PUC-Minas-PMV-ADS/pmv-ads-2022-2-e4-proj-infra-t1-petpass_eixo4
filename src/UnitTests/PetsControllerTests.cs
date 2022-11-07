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

namespace UnitTests
{
    public class PetsControllerTests
    {
        [Fact]
        public void GetAll_ExecutaAcao_RetornaOkResult()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(c => c.Pet.GetAllPets()).Returns(PetMockData.GetMockPets());
            var controller = new PetsController(mockRepo.Object);
            //Act
            var result = (OkObjectResult)controller.GetAll();

            //Assert
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public void GetAll_ExecutaAcao_RetornaTodosOsItens()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(c => c.Pet.GetAllPets()).Returns(PetMockData.GetMockPets());
            var controller = new PetsController(mockRepo.Object);
            //Act
            var result = (OkObjectResult)controller.GetAll();
            var items = Assert.IsType<List<Pet>>(result.Value);

            //Assert
            result.StatusCode.Should().Be(200);
            items.Count.Should().Be(3);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        public void GetById_IdValido_RetornaOk(int petId)
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            var petList = new List<Pet>();
            petList = PetMockData.GetMockPets();
            mockRepo.Setup(c => c.Pet.GetPetById(petId)).Returns(petList.ElementAt(petId)); //Não parece certo
            var controller = new PetsController(mockRepo.Object);

            //Act
            var result = (OkObjectResult)controller.GetById(petId);

            //Assert
            result.StatusCode.Should().Be(200);
        }
        [Fact]
        public void Create_ObjetoValido_RetornaCreateResponse()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            var mockPet = new Pet
            {
                Id = 5,
                NomePet = "Zeca",
                Raca = "Pincher",
            };
            mockRepo.Setup(c => c.Pet.Create(mockPet));
            var controller = new PetsController(mockRepo.Object);

            //Act
            var createResult = (CreatedAtActionResult)controller.Create(mockPet);

            //Assert
            createResult.StatusCode.Should().Be(201);

        }
        [Fact]
        public void Remove_ObjetoValido_RetornaCodigo204()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            var mockPet = new Pet
            {
                Id = 0,
                NomePet = "Zeca",
                Raca = "Pincher",
            };
            mockRepo.Setup(c => c.Pet.Delete(mockPet));
            var controller = new PetsController(mockRepo.Object);

            //Act
            var deleteResult = controller.Delete(mockPet.Id);

            //Assert
           // deleteResult.GetType().Should().Be(System.Type(OkResult));

        }

    }
}