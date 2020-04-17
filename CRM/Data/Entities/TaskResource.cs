using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Data.Entities
{
    public class TaskResource
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public Task Task { get; set; }
        public int ResourceId { get; set; }
        public Resource Resource { get; set; }
    }
}
