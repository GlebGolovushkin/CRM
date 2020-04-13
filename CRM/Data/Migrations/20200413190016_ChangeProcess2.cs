using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class ChangeProcess2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Processes",
                columns: new[] { "Id", "Name", "TimeEnd", "TimeStart" },
                values: new object[] { 1, "Basic", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Resources",
                columns: new[] { "Id", "Name", "TaskId", "TaskId1" },
                values: new object[] { 1, "Test", null, null });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsChangeTime", "IsChangeUsers", "IsImportant", "IsStarted", "IsStopped", "Name", "Priority", "ProcessId", "TimeEnd", "TimeReserv", "TimeStart", "TypeId" },
                values: new object[] { 1, true, true, true, false, true, "test", 2, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null });

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Base" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "FullName", "LastName", "Password", "TaskId" },
                values: new object[] { 1, "Gleb", "Gleb Golovushkin", "Golovushkin", "Shadaw", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Processes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Resources",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Types",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
