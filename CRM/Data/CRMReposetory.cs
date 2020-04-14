using CRM.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data
{
    public class CRMReposetory
    {
        private readonly CRMContext ctx;

        public CRMReposetory(CRMContext ctx)
        {
            this.ctx = ctx;
        }

        public IEnumerable<Process> GetAllProcess()
        {
            return ctx.Processes
                      .Include(p => p.Tasks)
                      .ThenInclude(p => p.Task)
                      .ThenInclude(p => p.Users)
                      .ThenInclude(p => p.User)
                      .Include(p => p.Tasks)
                      .ThenInclude(p => p.Task)
                      .ThenInclude(p => p.Resources)
                      .ThenInclude(p => p.Resource)
                      .Include(p => p.Tasks)
                      .ThenInclude(p => p.Task)
                      .ThenInclude(p => p.Products)
                      .ThenInclude(p => p.Product)
                      .OrderBy(p => p.Name)
                      .ToList();
        }

        public IEnumerable<Task> GetAllTasks()
        {
            return ctx.Tasks
                      .Include(p => p.Users)
                      .ThenInclude(p => p.User)
                      .Include(p => p.Resources)
                      .ThenInclude(p => p.Resource)
                      .Include(p => p.Products)
                      .ThenInclude (p => p.Product)
                      .OrderBy(p => p.Name)
                      .ToList();
        }

        public Task GetTaskById(string id)
        {
            return ctx.Tasks
                      .Include(p => p.Users)
                      .ThenInclude(p => p.User)
                      .Include(p => p.Resources)
                      .ThenInclude(p => p.Resource)
                      .Include(p => p.Products)
                      .ThenInclude (p => p.Product)
                      .Where(p => p.Id == id)
                      .FirstOrDefault();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return ctx.Users
                      .OrderBy(p => p.UserName)
                      .ToList();
        }

        public bool SaveAll()
        {
            return ctx.SaveChanges() > 0;
        }
    }
}
