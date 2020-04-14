﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data.Entities
{
    public class Task
    {
        public string Id { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public string Name { get; set; }
        public ICollection<TaskUser> Users { get; set; }
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
        public ICollection<ProcessTasks> Processes { get; set; }
    }
}
