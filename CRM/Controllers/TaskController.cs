using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Data;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    public class TaskController : Controller
    {
        private readonly CRMReposetory context;

        public TaskController(CRMReposetory reposetory)
        {
            this.context = reposetory;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}