using Microsoft.EntityFrameworkCore.Migrations;

namespace SP20.P05.Web.Migrations
{
    public partial class Dawnofthefinalday : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AmountOfBucket",
                table: "FarmFieldTickets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LargeBucket",
                table: "FarmFieldTickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MediumBucket",
                table: "FarmFieldTickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SmallBucket",
                table: "FarmFieldTickets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountOfBucket",
                table: "FarmFieldTickets");

            migrationBuilder.DropColumn(
                name: "LargeBucket",
                table: "FarmFieldTickets");

            migrationBuilder.DropColumn(
                name: "MediumBucket",
                table: "FarmFieldTickets");

            migrationBuilder.DropColumn(
                name: "SmallBucket",
                table: "FarmFieldTickets");
        }
    }
}
