using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CRM.Data;
using CRM.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace CRM.Controllers
{
    [Route("api/[Controller]")]
    public class UsersController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;
        private readonly IConfiguration config;
        private readonly CRMReposetory reposetory;

        public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper
            , IConfiguration config, CRMReposetory reposetory)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.config = config;
            this.reposetory = reposetory;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(reposetory.GetAllUsers());
        }

        [HttpPost("{password}")]
        [Route("AddUser")]
        public async Task<IActionResult> AddUser([FromBody]User user, string password)
        {
            User applicationUser = user;
            var result = await userManager.CreateAsync(applicationUser, password);
            //var result = await userManager.AddToRoleAsync(applicationUser, user.Role);

            return Ok(result);
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser([FromBody]LoginModel model)
        {
            var users = this.reposetory.GetAllUsers();
            if (users.Count() < 3)
            {
                model.Role = "Head";
            }
            else
            {
                model.Role = "Worker";
            }

            var applicationUser = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };

            try
            {
                var res = await userManager.CreateAsync(applicationUser, model.Password);
                await userManager.AddToRoleAsync(applicationUser, model.Role);
                var user = await userManager.FindByNameAsync(model.UserName);
                var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                if (result.Succeeded)
                {
                    var role = await userManager.GetRolesAsync(user);
                    IdentityOptions _options = new IdentityOptions();
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                        }),
                        Expires = DateTime.UtcNow.AddDays(5),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"])), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    return Ok(new { token });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody]LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (result.Succeeded)
            {
                var role = await userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(5),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"])), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("Roles")]
        public IActionResult GetRoles()
        {
            return Ok(this.reposetory.GetAllRoles());
        }

        [HttpGet]
        [Route("UserRoles")]
        public IActionResult GetUserRoles()
        {
            return Ok(this.reposetory.GetAllUserRoles());
        }

        [HttpGet]
        [Route("UserProfile")]
        //Get : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await userManager.FindByIdAsync(userId);
            return new
            {
                user.Id,
                user.Email,
                user.UserName
            };
        }

        [HttpGet("{id:int}")]
        [Route("ByType")]
        public IActionResult ByType(int id)
        {
            Dictionary<string,int> usersByType = new Dictionary<string,int>();
            var users = this.reposetory.GetAllUsers();
            var tasks = this.reposetory.GetAllTasks();
            foreach(var user in users)
            {
                usersByType.Add(user.Id,0);
            }

            foreach (var task in tasks)
            {
                if(task.TaskTypeId != null && task.TaskTypeId == id)
                {
                    if (task.UserId!=null && usersByType.ContainsKey(task.UserId))
                    {
                        usersByType[task.UserId]++;
                    }
                }
            }

            usersByType.OrderBy(x => x.Value);

            return Ok(usersByType.OrderBy(x => x.Value));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id)
        {
            return Ok(this.reposetory.DeleteUser(id));
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> UpdateUserAsync([FromBody]LoginModel model)
        {
            var user = this.reposetory.GetAllUsers().FirstOrDefault(u => u.Id == model.Id);
            if (user != null)
            {
                user.UserName = model.UserName;
                user.Email = model.Email;
                if (model.Role != null)
                {
                    var roles = await userManager.GetRolesAsync(user);
                    if (!(roles.Count > 1 || roles.Contains(model.Role)))
                    {
                        this.reposetory.DeleteAllRolesForUser(user);
                        await userManager.AddToRoleAsync(user, model.Role);
                    }
                }
            }
            return Ok(this.reposetory.UpdateUser(user));
        }
    }
}