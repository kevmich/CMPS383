using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP20.P05.Web.Data;
using SP20.P05.Web.Features.Events;
using SP20.P05.Web.Features.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace SP20.P05.Web.Controllers
{
    [ApiController]
    [Route("api/events")]
    public class EventsController : ControllerBase
    {
        private readonly DataContext context;
        public EventsController(DataContext context)
        {
            this.context = context;
        }

        private static Expression<Func<Event, EventDto>> Map()
        {
            return x => new EventDto
            {
                Id = x.Id,
                Booked = x.Booked,
                EventTimeSlot = x.EventTimeSlot,

            };
        }

        [HttpGet]
        [Authorize(Roles = Roles.ManagerPlus)]
        public IEnumerable<EventDto> GetAll()
        {
            return context.Set<Event>().Select(Map()).ToList();
        }

        [HttpGet("booked")]
        public IEnumerable<EventDto> GetAllBooked()
        {
            return context.Set<Event>().Where(x => x.Booked).Select(Map()).ToList();
        }

        [HttpGet("{id}")]
        public IEnumerable<EventDto> GetAllById(int id)
        {
            return context.Set<Event>().Where(x => x.Id == id).Select(Map()).ToList();
        }

        [HttpPost]
        [Authorize(Roles = Roles.Customer)]
        public async Task<ActionResult<EventDto>> CreateEvent(EventDto targetValue)
        {
            if(targetValue.EventTimeSlot < DateTimeOffset.UtcNow || targetValue.Booked == true)
            {
                return BadRequest();
            }

            var addData = context.Set<Event>().Add(new Event
            {
                Booked = targetValue.Booked,
                EventTimeSlot = targetValue.EventTimeSlot  // make sure this is all you need to remake 
            });

            await context.SaveChangesAsync();
            targetValue.Id = addData.Entity.Id;
            return Created(string.Empty, targetValue);

        }

        [HttpPut("{id}")]
        public ActionResult<EventDto> UpdateEvent(int id, EventDto targetValue)
        {
            var data = context.Set<Event>().FirstOrDefault(x => x.Id == id);
            if(data == null)
            {
                return NotFound();
            }

            data.Booked = targetValue.Booked;
            data.EventTimeSlot = targetValue.EventTimeSlot;  

            context.SaveChanges();
            return Ok();

        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Customer)]
        public ActionResult<EventDto> DeleteEvent(int id)
        {
            var data = context.Set<Event>().FirstOrDefault(x => x.Id == id);
            if(data == null)
            {
                return NotFound();
            }

            context.Set<Event>().Remove(data);
            context.SaveChanges();
            return Ok();

        }

    }
}