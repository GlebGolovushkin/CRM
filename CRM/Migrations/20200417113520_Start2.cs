using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class Start2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "871c87e6-da7f-4f7c-9472-9e6e3ec20aa3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8d9f0aaa-2514-48a2-a088-d256050422ff");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "478d1a5c-09b2-4bd6-9ac0-17afa2f092dc", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "cafada9a-2158-4200-8a91-01cc0f32d12d", "Worker", "Worker", "Worker" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "478d1a5c-09b2-4bd6-9ac0-17afa2f092dc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cafada9a-2158-4200-8a91-01cc0f32d12d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8d9f0aaa-2514-48a2-a088-d256050422ff", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "871c87e6-da7f-4f7c-9472-9e6e3ec20aa3", "Worker", "Worker", "Worker" });
        }
    }
}
