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
        [Route("Add")]
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

        [HttpPost]
        [Route("Update")]
        public IActionResult UpdateTask([FromBody]Task task)
        {
            var result = context.UpdateTask(task);
            return Created("", result);
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteTask(int id)
        {
            var res = context.GetAllTasks().FirstOrDefault(t => t.Id == id);
            if (res == null)
            {
                return null;
                //throw new Exception("Same task");
            }
            var result = context.DeleteTask(id);
            return Created("", result);
        }
    }
}