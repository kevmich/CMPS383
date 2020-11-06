using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP20.P05.Web.Features.Authentication
{
    public class LoggedInUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public IList<string> Roles { get; set; } = new List<string>(); 
    }
}
