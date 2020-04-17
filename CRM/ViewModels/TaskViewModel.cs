using CRM.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.ViewModels
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public string Name { get; set; }
        public UserViewModel User { get; set; }
        public ICollection<ResourceViewModel> Products { get; set; }
        public ICollection<ResourceViewModel> Resources { get; set; }
        public TaskType Type { get; set; }
        public DateTime TimeReserv { get; set; }
        public int Priority { get; set; }
        public bool IsImportant { get; set; }
        public bool IsChangeTime { get; set; }
        public bool IsChangeUsers { get; set; }
        public bool IsStarted { get; set; }
        public bool IsStopped { get; set; }
        public TaskViewModel Parent { get; set; }
        public ICollection<TaskViewModel> Children { get; set; }
    }
}
