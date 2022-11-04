using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
            mockRepo.Setup(c => c.Pet.GetPetById(petId)).Returns(petList.ElementAt(petId));
            var controller = new PetsController(mockRepo.Object);

            //Act
            var result = (OkObjectResult)controller.GetById(petId);

            //Assert
            result.StatusCode.Should().Be(200);
        }
    }
}