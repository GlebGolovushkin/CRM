using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class startNew6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "30744cc1-1adf-414c-92ef-269fed51e55a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c92d301b-a076-4938-8295-eb2a9e99b3f9");

            migrationBuilder.AddColumn<DateTime>(
                name: "RealToEnd",
                table: "Tasks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "23d787bd-75c9-47cf-8867-c80a3c28865c", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f5eac307-a5f2-4582-ad56-3c7222dcfc31", "Worker", "Worker", "Worker" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "23d787bd-75c9-47cf-8867-c80a3c28865c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5eac307-a5f2-4582-ad56-3c7222dcfc31");

            migrationBuilder.DropColumn(
                name: "RealToEnd",
                table: "Tasks");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "30744cc1-1adf-414c-92ef-269fed51e55a", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c92d301b-a076-4938-8295-eb2a9e99b3f9", "Worker", "Worker", "Worker" });
        }
    }
}
