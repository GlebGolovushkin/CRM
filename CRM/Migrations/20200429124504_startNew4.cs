using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class startNew4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0b4517b4-8789-495a-ad44-821a84005d09");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4dc59385-d15b-44a1-b894-ad26b015432f");

            migrationBuilder.AddColumn<DateTime>(
                name: "CriticalToStart",
                table: "Tasks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RealToStart",
                table: "Tasks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "958dac31-5d63-4cab-bf0f-aff09e24b5c7", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9f48c9d6-aae8-4b56-b4e2-757a411cbdad", "Worker", "Worker", "Worker" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "958dac31-5d63-4cab-bf0f-aff09e24b5c7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f48c9d6-aae8-4b56-b4e2-757a411cbdad");

            migrationBuilder.DropColumn(
                name: "CriticalToStart",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "RealToStart",
                table: "Tasks");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4dc59385-d15b-44a1-b894-ad26b015432f", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0b4517b4-8789-495a-ad44-821a84005d09", "Worker", "Worker", "Worker" });
        }
    }
}
