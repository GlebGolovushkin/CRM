using CRM.Data.Entities;
using Microsoft.AspNetCore.Identity;
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
                      .OrderBy(p => p.CriticalDate.Date)
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

        public IEnumerable<IdentityRole> GetAllRoles()
        {
            return ctx.Roles
                      .ToList();
        }

        public IEnumerable<IdentityUserRole<string>> GetAllUserRoles()
        {
            return ctx.UserRoles
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

        public bool UpdateTask(Task task)
        {
            ctx.Tasks.Update(task);
            return SaveAll();
        }

        public bool UpdateUser(User user)
        {
            ctx.Users.Update(user);
            return SaveAll();
        }

        public bool DeleteAllRolesForUser(User user)
        {
            foreach(var ur in this.ctx.UserRoles)
            {
                if (ur.UserId == user.Id)
                {
                    this.ctx.UserRoles.Remove(ur);
                }
            }

            return true;
        }

        public bool DeleteTask(int id)
        {
            var task = ctx.Tasks.FirstOrDefault(t => t.Id == id);
            ctx.Tasks.Remove(task);
            foreach(var tas in ctx.Tasks)
            {
                if (tas.ParentId == id)
                {
                    tas.ParentId = null;
                }
            }
            return SaveAll();
        }

        public bool DeleteUser(string id)
        {
            var user = ctx.Users.FirstOrDefault(t => t.Id == id);
            ctx.Users.Remove(user);
            foreach(var task in ctx.Tasks)
            {
                if (task.UserId == id)
                {
                    task.UserId = "";
                    this.UpdateTask(task);
                }
            }

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

        public IEnumerable<Status> GetallStatuses()
        {
            return ctx.Statuses
                      .OrderBy(p => p.Name)
                      .ToList();
        }

        public bool SaveAll()
        {
            try
            {
                return ctx.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
