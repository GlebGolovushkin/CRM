using CRM.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data
{
    public class CRMContext : IdentityDbContext<User>
    {
        public CRMContext(DbContextOptions<CRMContext> options): base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Process> Processes { get; set; }
        public DbSet<TaskType> Types { get; set; }
        public DbSet<Resource> Resources { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProcessTasks>()
                .HasOne(pt => pt.Process)
                .WithMany(p => p.Tasks)
                .HasForeignKey(pt => pt.TaskId);

            modelBuilder.Entity<ProcessTasks>()
                .HasOne(pt => pt.Task)
                .WithMany(t => t.Processes)
                .HasForeignKey(pt => pt.ProcessId);

            modelBuilder.Entity<ProcessTasks>().HasKey(p => p.Id);
            modelBuilder.Entity<ProcessTasks>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            modelBuilder.Entity<TaskResource>()
                .HasOne(pt => pt.Resource)
                .WithMany(p => p.Tasks)
                .HasForeignKey(pt => pt.TaskId);

            modelBuilder.Entity<TaskResource>()
                .HasOne(pt => pt.Task)
                .WithMany(t => t.Resources)
                .HasForeignKey(pt => pt.ResourceId);

            modelBuilder.Entity<TaskResource>().HasKey(p => p.Id);
            modelBuilder.Entity<TaskResource>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            modelBuilder.Entity<TaskProduct>()
                .HasOne(pt => pt.Product)
                .WithMany(p => p.TasksP)
                .HasForeignKey(pt => pt.TaskId);

            modelBuilder.Entity<TaskProduct>()
                .HasOne(pt => pt.Task)
                .WithMany(t => t.Products)
                .HasForeignKey(pt => pt.ProductId);

            modelBuilder.Entity<TaskProduct>().HasKey(p => p.Id);
            modelBuilder.Entity<TaskProduct>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            modelBuilder.Entity<Process>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            modelBuilder.Entity<Resource>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            modelBuilder.Entity<Task>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

            modelBuilder.Entity<TaskType>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();

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
                TimeReserv = new DateTime()
            });

            modelBuilder.Entity<Process>().HasData(new Process
            {
                Id = 1,
                TimeStart = new DateTime(),
                TimeEnd = new DateTime(),
                Name = "Basic"
            });

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Head",
                ConcurrencyStamp = "Head",
                NormalizedName = "Head"
            });

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Worker",
                ConcurrencyStamp = "Worker",
                NormalizedName = "Worker"
            });
        }
    }
}
