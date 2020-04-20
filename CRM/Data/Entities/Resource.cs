using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data.Entities
{
    public class Resource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Task> ResourceTasks { get; set; }
        public ICollection<Task> ProductTasks { get; set; }
    }
}
