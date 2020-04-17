using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Data.Entities
{
    public class ProcessTasks
    {
        public int Id { get; set; }
        public int ProcessId { get; set; }
        public Process Process { get; set; }
        public int TaskId { get; set; }
        public Task Task { get; set; }
    }
}
