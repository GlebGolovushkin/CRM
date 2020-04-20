using CRM.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
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
                      .OrderBy(p => p.Id)
                      .ToList();
        }

        public Task GetTaskById(int id)
        {
            return ctx.Tasks
                      .FirstOrDefault();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return ctx.Users
                      .ToList();
        }

        public IEnumerable<TaskType> GetAllTypes()
        {
            return ctx.Types
                      .OrderBy(p => p.Id)
                      .ToList();
        }

        public bool CreateTask(Task task)
        {
            ctx.Tasks.Add(task);
            return SaveAll();
        }

        public bool CreateProcess(Process process)
        {
            ctx.Processes.Add(process);
            return SaveAll();
        }

        public bool CreateResource(Resource resource)
        {
            ctx.Resources.Add(resource);
            return SaveAll();
        }

        public bool CreateType(TaskType type)
        {
            ctx.Types.Add(type);
            return SaveAll();
        }

        internal void Upsert(object entity)
        {
            ctx.ChangeTracker.TrackGraph(entity, e =>
            {
                if (e.Entry.IsKeySet)
                {
                    e.Entry.State = EntityState.Modified;
                }
                else
                {
                    e.Entry.State = EntityState.Added;
                }
            });
        }

        public IEnumerable<Resource> GetallResources()
        {
            return ctx.Resources
                      .OrderBy(p => p.Name)
                      .ToList();
        }

        public bool SaveAll()
        {
            return ctx.SaveChanges() > 0;
        }
    }
}
