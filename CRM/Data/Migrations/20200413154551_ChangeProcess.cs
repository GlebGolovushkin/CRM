using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.Migrations
{
    public partial class ChangeProcess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resource_Tasks_TaskId",
                table: "Resource");

            migrationBuilder.DropForeignKey(
                name: "FK_Resource_Tasks_TaskId1",
                table: "Resource");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_TaskType_TypeId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Processes_ProcessId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Tasks_TaskId",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_ProcessId",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskType",
                table: "TaskType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Resource",
                table: "Resource");

            migrationBuilder.DropColumn(
                name: "ProcessId",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "TaskType",
                newName: "Types");

            migrationBuilder.RenameTable(
                name: "Resource",
                newName: "Resources");

            migrationBuilder.RenameIndex(
                name: "IX_User_TaskId",
                table: "Users",
                newName: "IX_Users_TaskId");

            migrationBuilder.RenameIndex(
                name: "IX_Resource_TaskId1",
                table: "Resources",
                newName: "IX_Resources_TaskId1");

            migrationBuilder.RenameIndex(
                name: "IX_Resource_TaskId",
                table: "Resources",
                newName: "IX_Resources_TaskId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Types",
                table: "Types",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Resources",
                table: "Resources",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Tasks_TaskId",
                table: "Resources",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Tasks_TaskId1",
                table: "Resources",
                column: "TaskId1",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Types_TypeId",
                table: "Tasks",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Tasks_TaskId",
                table: "Users",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Tasks_TaskId",
                table: "Resources");

            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Tasks_TaskId1",
                table: "Resources");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Types_TypeId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Tasks_TaskId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Types",
                table: "Types");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Resources",
                table: "Resources");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "Types",
                newName: "TaskType");

            migrationBuilder.RenameTable(
                name: "Resources",
                newName: "Resource");

            migrationBuilder.RenameIndex(
                name: "IX_Users_TaskId",
                table: "User",
                newName: "IX_User_TaskId");

            migrationBuilder.RenameIndex(
                name: "IX_Resources_TaskId1",
                table: "Resource",
                newName: "IX_Resource_TaskId1");

            migrationBuilder.RenameIndex(
                name: "IX_Resources_TaskId",
                table: "Resource",
                newName: "IX_Resource_TaskId");

            migrationBuilder.AddColumn<int>(
                name: "ProcessId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskType",
                table: "TaskType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Resource",
                table: "Resource",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_User_ProcessId",
                table: "User",
                column: "ProcessId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resource_Tasks_TaskId",
                table: "Resource",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Resource_Tasks_TaskId1",
                table: "Resource",
                column: "TaskId1",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_TaskType_TypeId",
                table: "Tasks",
                column: "TypeId",
                principalTable: "TaskType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Processes_ProcessId",
                table: "User",
                column: "ProcessId",
                principalTable: "Processes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Tasks_TaskId",
                table: "User",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
