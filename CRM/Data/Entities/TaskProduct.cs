using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Data.Entities
{
    public class TaskProduct
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public Task Task { get; set; }
        public int ProductId { get; set; }
        public Resource Product { get; set; }
    }
}
