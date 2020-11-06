using System;

namespace SP20.P05.Web.Features.FarmFieldTickets
{
    public class FarmFieldTicketDto
    {
        public int Id { get; set; }
        public int SmallBucket { get; set; }
        public int MediumBucket { get; set; }
        public int LargeBucket { get; set; }
        public DateTimeOffset TicketTimeSlot { get; set; }
        public int FarmFieldId { get; set; }
    }
}