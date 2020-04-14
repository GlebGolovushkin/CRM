using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data.Entities
{
    public class Resource
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<TaskResource> Tasks { get; set; }
        public ICollection<TaskProduct> TasksP { get; set; }
    }
}
