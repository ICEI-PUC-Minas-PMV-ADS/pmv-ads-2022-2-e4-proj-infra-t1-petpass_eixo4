using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetPassBackend.Migrations
{
    public partial class UpdRegistroVacina : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<int>(
            //    name: "Id",
            //    table: "PetsVacinados",
            //    type: "int",
            //    nullable: false,
            //    defaultValue: 0)
            //    .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.CreateIndex(
                name: "IX_RegistroVacinas_PetId",
                table: "RegistroVacinas",
                column: "PetId");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RegistroVacinas",
                table: "RegistroVacinas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RegistroVacinas",
                table: "RegistroVacinas",
                column: "RegistroVacinaId");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RegistroVacinas",
                table: "RegistroVacinas");

            migrationBuilder.DropIndex(
                name: "IX_RegistroVacinas_PetId",
                table: "RegistroVacinas");

            migrationBuilder.DropColumn(
                name: "RegistroVacinaId",
                table: "RegistroVacinas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RegistroVacinas",
                table: "RegistroVacinas",
                columns: new[] { "PetId", "VacinaId" });
        }
    }
}
