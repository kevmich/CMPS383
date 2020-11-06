using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP20.P05.Web.Data;
using SP20.P05.Web.Features.Authentication;
using SP20.P05.Web.Features.FarmFieldTickets;

namespace SP20.P05.Web.Controllers
{
    [ApiController]
    [Route("api/farm-field-tickets")]
    public class FarmFieldTicketsController : ControllerBase
    {
        private readonly DataContext context;
        private readonly UserManager<User> userManager;

        public FarmFieldTicketsController(DataContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize(Roles = Roles.Customer)]
        // Dear 383 student, below is an example of async / await
        // further reading: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/
        public async Task<ActionResult<FarmFieldTicketDto>> CreateTicket(FarmFieldTicketDto targetValue)
        {
            if (targetValue.TicketTimeSlot < DateTimeOffset.UtcNow ||
                !await context.FarmFields.AnyAsync(x => x.Active && x.Id == targetValue.FarmFieldId))
            {
                return BadRequest();
            }

            var user = await userManager.GetUserAsync(User);
            
            if(user == null)
            {
                return BadRequest();
            }

            var addedItem = context.Set<FarmFieldTicket>().Add(new FarmFieldTicket
            {
                UserId = user.Id,
                FarmFieldId = targetValue.FarmFieldId,
                TicketTimeSlot = targetValue.TicketTimeSlot
            });
            await context.SaveChangesAsync();
            targetValue.Id = addedItem.Entity.Id;
            return Created(string.Empty, targetValue);
        }

        [HttpPost("{id}/redeem")]
        [Authorize(Roles = Roles.EmplyoyeePlus)]
        public ActionResult<FarmFieldTicketDto> RedeemTicket(int id)
        {
            var targetValue = context.Set<FarmFieldTicket>()
                .Include(x => x.FarmField) // include ensures that the 'farm field' is eagerly loaded
                .FirstOrDefault(x => x.Id == id);
            if (targetValue == null)
            {
                return NotFound();
            }

            if (targetValue.Redeemed != null || !targetValue.FarmField.Active)
            {
                return BadRequest();
            }

            targetValue.Redeemed = DateTimeOffset.UtcNow;
            context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IList<FarmFieldTicketDto>>> ReturnUserTicketInfo()
        {

            var result = await userManager.GetUserAsync(User);
            if (result == null)
            {
                return BadRequest();
            }
            var user = await context.Set<User>().Where(x => x.Id == result.Id).FirstOrDefaultAsync();

            if(user == null)
            {
                return BadRequest();
            }

            var tickets = await context.Set<FarmFieldTicket>().Where(x => x.UserId == user.Id).ToListAsync();

            if(tickets == null){
                return NoContent();
            }

            return Ok(tickets);
        }
    }
}