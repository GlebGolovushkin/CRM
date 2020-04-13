using CRM.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data
{
    public class CRMContext : DbContext
    {
        public CRMContext(DbContextOptions<CRMContext> options): base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<Process> Processes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<TaskType> Types { get; set; }
        public DbSet<Resource> Resources { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User
            {
                FirstName = "Gleb",
                LastName = "Golovushkin",
                FullName = "Gleb Golovushkin",
                Id = 1,
                Password = "Shadaw"
            });

            modelBuilder.Entity<TaskType>().HasData(new TaskType
            {
                Id = 1,
                Name = "Base"
            });

            modelBuilder.Entity<Resource>().HasData(new Resource
            {
                Id = 1,
                Name = "Test"
            });

            modelBuilder.Entity<Task>().HasData(new Task
            {
                Id = 1,
                IsStarted = false,
                IsChangeTime = true,
                IsStopped = true,
                TimeStart = new DateTime(),
                TimeEnd = new DateTime(),
                IsChangeUsers = true,
                IsImportant = true,
                Name = "test",
                Priority = 2,
                Products = new List<Resource> { },
                Resources = new List<Resource> { },
                TimeReserv = new DateTime()
            });

            modelBuilder.Entity<Process>().HasData(new Process
            {
                Id = 1,
                TimeStart = new DateTime(),
                TimeEnd = new DateTime(),
                Tasks = new List<Task> { },
                Name = "Basic"
            });
        }
    }
}
