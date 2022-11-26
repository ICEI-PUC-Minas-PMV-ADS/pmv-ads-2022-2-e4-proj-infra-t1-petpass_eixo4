using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetPassBackend.Migrations
{
    public partial class UpdUsuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Usuarios",
                newName: "Email");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Usuarios",
                newName: "Nome");
        }
    }
}
