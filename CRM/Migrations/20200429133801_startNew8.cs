using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class startNew8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2b5fbb75-128b-422d-83e8-afc2cea6e3ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f68cddd9-e8af-4d7a-87c5-f41359013861");

            migrationBuilder.DropColumn(
                name: "CriticalToEnd",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "CriticalToStart",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "RealToEnd",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "RealToStart",
                table: "Tasks");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e526c7df-7ff4-4961-a575-67d6b354c9ac", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a0117185-d2b1-4cd0-ad7e-a31c12665ffe", "Worker", "Worker", "Worker" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a0117185-d2b1-4cd0-ad7e-a31c12665ffe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e526c7df-7ff4-4961-a575-67d6b354c9ac");

            migrationBuilder.AddColumn<DateTime>(
                name: "CriticalToEnd",
                table: "Tasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CriticalToStart",
                table: "Tasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RealToEnd",
                table: "Tasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RealToStart",
                table: "Tasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2b5fbb75-128b-422d-83e8-afc2cea6e3ee", "Head", "Head", "Head" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f68cddd9-e8af-4d7a-87c5-f41359013861", "Worker", "Worker", "Worker" });
        }
    }
}
