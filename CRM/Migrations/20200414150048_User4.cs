using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class User4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                values: new object[] { "15b28748-8d90-4022-bdc0-06454279411c", "Basic", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Resources",
                columns: new[] { "Id", "Name" },
                values: new object[] { "e9a29727-091e-48a5-a2c3-fac84881c157", "Test" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsChangeTime", "IsChangeUsers", "IsImportant", "IsStarted", "IsStopped", "Name", "Priority", "TimeEnd", "TimeReserv", "TimeStart", "TypeId" },
                values: new object[] { "6a107157-6c1c-4ce3-b118-9a2c1dbd10ce", true, true, true, false, true, "test", 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null });

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "Id", "Name" },
                values: new object[] { "b836f448-21ff-4af6-8c8a-bf7105d0b358", "Base" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Processes",
                keyColumn: "Id",
                keyValue: "15b28748-8d90-4022-bdc0-06454279411c");

            migrationBuilder.DeleteData(
                table: "Resources",
                keyColumn: "Id",
                keyValue: "e9a29727-091e-48a5-a2c3-fac84881c157");

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: "6a107157-6c1c-4ce3-b118-9a2c1dbd10ce");

            migrationBuilder.DeleteData(
                table: "Types",
                keyColumn: "Id",
                keyValue: "b836f448-21ff-4af6-8c8a-bf7105d0b358");

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
    }
}
