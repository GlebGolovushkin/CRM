using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CRM.Data;
using CRM.Data.Entities;
using CRM.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[Controller]")]
    public class ProcessesController : Controller
    {
        private readonly CRMReposetory reposetory;
        private readonly IMapper mapper;

        public ProcessesController(CRMReposetory reposetory, IMapper mapper)
        {
            this.reposetory = reposetory;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var processes = reposetory.GetAllProcess();
            return Ok(mapper.Map<IEnumerable<Process>, IEnumerable<ProcessViewModel>>(processes));
        }
    }
}