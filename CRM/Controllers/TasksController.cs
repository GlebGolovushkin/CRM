using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using CRM.Data;
using CRM.Data.Entities;
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
            return Ok(tasks);
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            return Ok(context.GetTaskById(id));
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody]Task task)
        {
            var res = context.GetAllTasks().FirstOrDefault(t => t.Name == task.Name && t.Process == task.Process);
            if (res != null)
            {
                throw new Exception("Same task");
            }

            var result = context.CreateTask(task);
            return Created("", result);
        }
    }
}