using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP20.P05.Web.Features.Authentication
{
    public class UserDataDto
    {
        public string Username { get; set; }

        public ICollection<string> Role { get; set; }

    }
}
