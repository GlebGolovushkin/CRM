using CRM.Data.Entities;
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
                      .OrderBy(p => p.Name)
                      .ToList();
        }

        public IEnumerable<Task> GetAllTasks()
        {
            return ctx.Tasks
                      .OrderBy(p => p.Name)
                      .ToList();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return ctx.Users
                      .OrderBy(p => p.FullName)
                      .ToList();
        }

        public bool SaveAll()
        {
            return ctx.SaveChanges() > 0;
        }
    }
}
