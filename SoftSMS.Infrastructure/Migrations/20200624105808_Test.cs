using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SoftSMS.Infrastructure.Migrations
{
    public partial class Test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newId()"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newId()"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Login = table.Column<string>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    Profil = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MembershipAssociations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdGrp = table.Column<Guid>(nullable: false),
                    IdUser = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MembershipAssociations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MembershipAssociations_Grp",
                        column: x => x.IdGrp,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MembershipAssociations_User",
                        column: x => x.IdUser,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newId()"),
                    Text = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    NbVariables = table.Column<int>(nullable: false),
                    IDGrp = table.Column<int>(nullable: false),
                    IDUser = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Phone = table.Column<long>(nullable: false),
                    GroupId = table.Column<Guid>(nullable: true),
                    ListUsersId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Templates_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Templates_Users_ListUsersId",
                        column: x => x.ListUsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SentMsgs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newId()"),
                    Date = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    AsId = table.Column<Guid>(nullable: true),
                    ListUsersId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentMsgs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SentMsgs_Templates_AsId",
                        column: x => x.AsId,
                        principalTable: "Templates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SentMsgs_Users_ListUsersId",
                        column: x => x.ListUsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "LastName", "Login", "Profil", "Status" },
                values: new object[] { new Guid("1b0b3585-fc20-4053-bb52-7f3e6c1a7149"), "Teleperformance Tunisie", "", "Admin", 0, 2 });

            migrationBuilder.CreateIndex(
                name: "IX_MembershipAssociations_IdGrp",
                table: "MembershipAssociations",
                column: "IdGrp");

            migrationBuilder.CreateIndex(
                name: "IX_MembershipAssociations_IdUser",
                table: "MembershipAssociations",
                column: "IdUser");

            migrationBuilder.CreateIndex(
                name: "IX_SentMsgs_AsId",
                table: "SentMsgs",
                column: "AsId");

            migrationBuilder.CreateIndex(
                name: "IX_SentMsgs_ListUsersId",
                table: "SentMsgs",
                column: "ListUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Templates_GroupId",
                table: "Templates",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Templates_ListUsersId",
                table: "Templates",
                column: "ListUsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MembershipAssociations");

            migrationBuilder.DropTable(
                name: "SentMsgs");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
