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
    public class ResourcesController : Controller
    {
        private readonly CRMReposetory reposetory;

        public ResourcesController(CRMReposetory reposetory)
        {
            this.reposetory = reposetory;
        }

        [HttpGet]
        public IActionResult GetAllResources()
        {
            return Ok(reposetory.GetallResources());
        }

        [HttpPost]
        public IActionResult CreateResource([FromBody]Resource resource)
        {
            var res = reposetory.GetallResources().FirstOrDefault(t => t.Name == resource.Name);
            if (res != null)
            {
                throw new Exception("Same task");
            }

            var result = reposetory.CreateResource(resource);
            return Created("", result);
        }
    }
}