using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Data;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[Controller]")]
    public class StatusesController : Controller
    {
        private readonly CRMReposetory reposetory;

        public StatusesController(CRMReposetory reposetory)
        {
            this.reposetory = reposetory;
        }

        [HttpGet]
        public IActionResult GetStatuses()
        {
            return Ok(this.reposetory.GetallStatuses());
        }
    }
}