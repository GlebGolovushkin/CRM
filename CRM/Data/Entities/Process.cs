﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data.Entities
{
    public class Process
    {
        public string Id { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public string Name { get; set; }
        public ICollection<ProcessTasks> Tasks { get; set; }
    }
}
