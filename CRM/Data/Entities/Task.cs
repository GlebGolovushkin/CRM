using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public DateTime CriticalDate { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
        public ICollection<TaskProduct> Products { get; set; }
        public ICollection<TaskResource> Resources { get; set; }
        public TaskType Type { get; set; }
        public DateTime TimeReserv { get; set; }
        public int Priority { get; set; }
        public bool IsImportant { get; set; }
        public bool IsChangeTime { get; set; }
        public bool IsChangeUsers { get; set; }
        public bool IsStarted { get; set; }
        public bool IsStopped { get; set; }
        public Task Parent { get; set; }
        public ICollection<Task> Children { get; set; }
        public ICollection<ProcessTasks> Processes { get; set; }
    }
}
