using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class User2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a44f65d2-5163-48d5-8fd1-21b4e40604de");

            migrationBuilder.DeleteData(
                table: "Processes",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000000");

            migrationBuilder.DeleteData(
                table: "Resources",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000000");

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000000");

            migrationBuilder.DeleteData(
                table: "Types",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000000");

            migrationBuilder.InsertData(
                table: "Processes",
                columns: new[] { "Id", "Name", "TimeEnd", "TimeStart" },
                values: new object[] { "de48a720-5496-4d3c-bb15-b122ef6a6829", "Basic", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Resources",
                columns: new[] { "Id", "Name" },
                values: new object[] { "0ce1c541-8595-47e5-8706-c81297dc25f6", "Test" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsChangeTime", "IsChangeUsers", "IsImportant", "IsStarted", "IsStopped", "Name", "Priority", "TimeEnd", "TimeReserv", "TimeStart", "TypeId" },
                values: new object[] { "7cd82fc3-5c49-4e9e-941f-849363ce3ddd", true, true, true, false, true, "test", 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null });

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "Id", "Name" },
                values: new object[] { "27dbb4d5-f676-4991-b8df-14aa682442bc", "Base" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Processes",
                keyColumn: "Id",
                keyValue: "de48a720-5496-4d3c-bb15-b122ef6a6829");

            migrationBuilder.DeleteData(
                table: "Resources",
                keyColumn: "Id",
                keyValue: "0ce1c541-8595-47e5-8706-c81297dc25f6");

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: "7cd82fc3-5c49-4e9e-941f-849363ce3ddd");

            migrationBuilder.DeleteData(
                table: "Types",
                keyColumn: "Id",
                keyValue: "27dbb4d5-f676-4991-b8df-14aa682442bc");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "FullName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "a44f65d2-5163-48d5-8fd1-21b4e40604de", 0, "403ebe8b-4f07-48cc-bf3b-1df33f8e6a33", null, false, "Gleb", "Gleb Golovushkin", "Golovushkin", false, null, null, null, null, null, false, "064f6e0a-9748-4211-b54d-61a0aff92d6f", false, null });

            migrationBuilder.InsertData(
                table: "Processes",
                columns: new[] { "Id", "Name", "TimeEnd", "TimeStart" },
                values: new object[] { "00000000-0000-0000-0000-000000000000", "Basic", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Resources",
                columns: new[] { "Id", "Name" },
                values: new object[] { "00000000-0000-0000-0000-000000000000", "Test" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsChangeTime", "IsChangeUsers", "IsImportant", "IsStarted", "IsStopped", "Name", "Priority", "TimeEnd", "TimeReserv", "TimeStart", "TypeId" },
                values: new object[] { "00000000-0000-0000-0000-000000000000", true, true, true, false, true, "test", 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null });

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "Id", "Name" },
                values: new object[] { "00000000-0000-0000-0000-000000000000", "Base" });
        }
    }
}
