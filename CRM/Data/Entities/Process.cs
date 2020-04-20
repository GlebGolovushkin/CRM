using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data.Entities
{
    public class Process
    {
        public int Id { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public string Name { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}
