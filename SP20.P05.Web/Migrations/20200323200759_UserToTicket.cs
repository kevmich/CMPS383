using Microsoft.EntityFrameworkCore.Migrations;

namespace SP20.P05.Web.Migrations
{
    public partial class UserToTicket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "FarmFieldTickets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FarmFieldTickets_UserId",
                table: "FarmFieldTickets",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FarmFieldTickets_AspNetUsers_UserId",
                table: "FarmFieldTickets",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FarmFieldTickets_AspNetUsers_UserId",
                table: "FarmFieldTickets");

            migrationBuilder.DropIndex(
                name: "IX_FarmFieldTickets_UserId",
                table: "FarmFieldTickets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FarmFieldTickets");
        }
    }
}
