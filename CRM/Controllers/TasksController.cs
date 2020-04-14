using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using CRM.Data;
using CRM.Data.Entities;
using CRM.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[Controller]")]
    public class TasksController : Controller
    {
        private readonly CRMReposetory context;
        private readonly IMapper mapper;

        public TasksController(CRMReposetory reposetory, IMapper mapper)
        {
            this.context = reposetory;
            this.mapper = mapper;
        }

        public IActionResult Get()
        {
            var tasks = context.GetAllTasks();
            return Ok(mapper.Map<IEnumerable<Task>, IEnumerable<TaskViewModel>>(tasks));
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return Ok(context.GetTaskById(id));
        }
    }
}