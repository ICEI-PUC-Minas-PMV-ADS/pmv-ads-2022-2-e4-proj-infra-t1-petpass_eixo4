using PetPassBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.MockData
{
    internal class VacinaMockData
    {
        public static List<Vacina> GetMockVacinas()
        {
            return new List<Vacina>
            {
                new Vacina
                {
                    Id=1,
                    Descricao="Vacina 1",
                    Dose="1mg",
                    TipoPet=0
                },
                new Vacina
                {
                    Id=2,
                    Descricao="Vacina 2",
                    Dose="10mg",
                    TipoPet=0
                },
                new Vacina
                {
                    Id=4,
                    Descricao="Vacina 3",
                    Dose="5mg",
                    TipoPet=0
                },
                new Vacina
                {
                    Id=12,
                    Descricao="Vacina 3",
                    Dose="1mg",
                    TipoPet=0
                }
            };
        }
    }
}
