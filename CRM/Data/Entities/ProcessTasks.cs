using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Data.Entities
{
    public class ProcessTasks
    {
        public string Id { get; set; }
        public string ProcessId { get; set; }
        public Process Process { get; set; }
        public string TaskId { get; set; }
        public Task Task { get; set; }
    }
}
