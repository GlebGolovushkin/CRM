using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Data.Entities
{
    public class TaskProduct
    {
        public string Id { get; set; }
        public string TaskId { get; set; }
        public Task Task { get; set; }
        public string ProductId { get; set; }
        public Resource Product { get; set; }
    }
}
