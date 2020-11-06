using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SP20.P05.Web.Features.FarmFields;

namespace SP20.P05.Web.Features.Events
{
    public class Event
    {
        public int Id { get; set; }
        public DateTimeOffset EventTimeSlot { get; set; }
        public bool Booked { get; set; }
        public virtual FarmField FarmField { get; set; }

    }
}
