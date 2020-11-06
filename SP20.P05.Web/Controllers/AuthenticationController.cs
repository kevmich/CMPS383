using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using SP20.P05.Web.Data;
using SP20.P05.Web.Features.Authentication;


namespace SP20.P05.Web.Controllers
{
    [ApiController]
    [Route("api/authentication")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly DataContext context;

        public AuthenticationController(UserManager<User> userManager, SignInManager<User> signInManager, DataContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.context = context;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto dto)
        {
            var user = await userManager.FindByNameAsync(dto.Username);
            if (user == null)
            {
                return NotFound();
            }
            var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, true);
            if (!result.Succeeded)
            {
                return NotFound();
            }
            await signInManager.SignInAsync(user, false, "Password");
            return Ok(new UserDto
            {
                Username = user.UserName
            });
        }

        [HttpPost("logout")]
        public async Task<ActionResult<UserDto>> LogOut()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<UserDataDto>> ReturnOfUserData()
        {
            var result = await userManager.GetUserAsync(User);
            var user = await context.Set<User>().Where(x => x.Id == result.Id).FirstOrDefaultAsync();
            var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);
            if (user == null)
            {
                return Unauthorized();
            }

            var dataToReturn = new UserDataDto
            {
                Role = rolesList,
                Username = user.UserName
            };

            return Ok(dataToReturn);
        }
    }
}
