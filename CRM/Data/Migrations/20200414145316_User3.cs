using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class User3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                table: "Processes",
                columns: new[] { "Id", "Name", "TimeEnd", "TimeStart" },
                values: new object[] { "b2f5444b-3fdb-4974-a22b-59f1b0fe075f", "Basic", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Resources",
                columns: new[] { "Id", "Name" },
                values: new object[] { "f573aca9-938d-415e-8d0e-d9ff8b0c08ef", "Test" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsChangeTime", "IsChangeUsers", "IsImportant", "IsStarted", "IsStopped", "Name", "Priority", "TimeEnd", "TimeReserv", "TimeStart", "TypeId" },
                values: new object[] { "9fc2a044-8367-4788-9ff7-da28f0c93262", true, true, true, false, true, "test", 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null });

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "Id", "Name" },
                values: new object[] { "a5ac299b-9662-4fb3-8a6f-61e408e16726", "Base" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Processes",
                keyColumn: "Id",
                keyValue: "b2f5444b-3fdb-4974-a22b-59f1b0fe075f");

            migrationBuilder.DeleteData(
                table: "Resources",
                keyColumn: "Id",
                keyValue: "f573aca9-938d-415e-8d0e-d9ff8b0c08ef");

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: "9fc2a044-8367-4788-9ff7-da28f0c93262");

            migrationBuilder.DeleteData(
                table: "Types",
                keyColumn: "Id",
                keyValue: "a5ac299b-9662-4fb3-8a6f-61e408e16726");

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
    }
}
