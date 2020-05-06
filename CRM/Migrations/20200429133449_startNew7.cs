using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class startNew7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "23d787bd-75c9-47cf-8867-c80a3c28865c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5eac307-a5f2-4582-ad56-3c7222dcfc31");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2b5fbb75-128b-422d-83e8-afc2cea6e3ee", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f68cddd9-e8af-4d7a-87c5-f41359013861", "Worker", "Worker", "Worker" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2b5fbb75-128b-422d-83e8-afc2cea6e3ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f68cddd9-e8af-4d7a-87c5-f41359013861");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "23d787bd-75c9-47cf-8867-c80a3c28865c", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f5eac307-a5f2-4582-ad56-3c7222dcfc31", "Worker", "Worker", "Worker" });
        }
    }
}
