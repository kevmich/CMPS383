using System;
using SP20.P05.Web.Features.Authentication;
using SP20.P05.Web.Features.FarmFields;

namespace SP20.P05.Web.Features.FarmFieldTickets
{
    public class FarmFieldTicket
    {
        public int Id { get; set; }
        public DateTimeOffset? Redeemed { get; set; }
        public DateTimeOffset TicketTimeSlot { get; set; }
        public int SmallBucket { get; set; }
        public int MediumBucket { get; set; }
        public int LargeBucket { get; set; }
        public int FarmFieldId { get; set; }
        public int UserId { get; set; }
        public virtual FarmField FarmField { get; set; }
        public virtual User User { get; set; }
    }
}