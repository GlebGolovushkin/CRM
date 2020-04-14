using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CRM.Data;
using CRM.Data.Entities;
using CRM.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace CRM.Controllers
{
    [Route("api/[Controller]")]
    public class UsersController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;
        private readonly IConfiguration config;

        public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper
            , IConfiguration config)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.config = config;
        }

        [HttpPost("{password}")]
        public async Task<IActionResult> AddUserAsync([FromBody]UserViewModel user, string password)
        {
            return Ok(await userManager.CreateAsync(mapper.Map<UserViewModel,User>(user), password));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTokenAsync([FromBody]LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (result.Succeeded)
            {
                var claims = new[]
                {
                    new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.EcdsaSha256);
                var token = new JwtSecurityToken(
                    "localhost",
                    "audiance",
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(30),
                    signingCredentials: creds
                    );
            }
        }
    }
}