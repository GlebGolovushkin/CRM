using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Data;
using CRM.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[Controller]")]
    public class TypesController : Controller
    {
        private readonly CRMReposetory reposetory;

        public TypesController(CRMReposetory reposetory)
        {
            this.reposetory = reposetory;
        }

        [HttpGet]
        public IActionResult GetAllTypes()
        {
            return Ok(reposetory.GetAllTypes());
        }

        [HttpPost]
        public IActionResult CreateType([FromBody]TaskType type)
        {
            var res = reposetory.GetAllTypes().FirstOrDefault(t => t.Name == type.Name);
            if (res != null)
            {
                throw new Exception("Same task");
            }

            var result = reposetory.CreateType(type);
            return Created("", result);
        }
    }
}