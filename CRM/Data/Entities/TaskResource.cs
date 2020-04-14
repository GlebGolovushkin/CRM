using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Data.Entities
{
    public class TaskResource
    {
        public string Id { get; set; }
        public string TaskId { get; set; }
        public Task Task { get; set; }
        public string ResourceId { get; set; }
        public Resource Resource { get; set; }
    }
}
