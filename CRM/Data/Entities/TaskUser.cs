using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Data.Entities
{
    public class TaskUser
    {
        public string Id { get; set; }
        public string TaskId { get; set; }
        public Task Task { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
