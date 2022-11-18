using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetPassBackend.Migrations
{
    public partial class RenameRegistroId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RegistroVacinaId",
                table: "RegistroVacinas",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "RegistroVacinas",
                newName: "RegistroVacinaId");
        }
    }
}
