using PetPassBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.MockData
{
    internal class UsuarioMockData
    {
        public static List<Usuario> GetMockUsuarios()
        {
            return new List<Usuario>
            {
                new Usuario
                {
                    Id=1,
                    Nome="Tatiane Maia",
                    Password="12345",
                    Perfil=Perfil.Administrador,
                },
                new Usuario
                {
                    Id=2,
                    Nome="Rodrigo Lobenwein",
                    Password="12345",
                    Perfil=Perfil.Usuario,
                },
                new Usuario
                {
                    Id=3,
                    Nome="Claudio Resende",
                    Password="12345",
                    Perfil=Perfil.Instituicao,
                },
                new Usuario
                {
                    Id=4,
                    Nome="Vera Silva",
                    Password="12345",
                    Perfil=Perfil.Administrador,
                },
            };
        }
    }
}
