using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP20.P05.Web.Features.Events
{
    public class EventDto
    {
        public int Id { get; set; }
        public DateTimeOffset EventTimeSlot { get; set; }
        public bool Booked { get; set; }
        public int FarmFieldId { get; set; }
    }
}
