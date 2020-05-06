using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace CRM.Data.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int? ProcessId { get; set; }
        public int? ResourceId { get; set; }
        public int? ProductId { get; set; }
        public int? TaskTypeId { get; set; }
        public string UserId { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public DateTime CriticalDate { get; set; }
        public string Name { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [ForeignKey("ProductId")]
        public Resource Product { get; set; }
        [ForeignKey("ResourceId")]
        public Resource Resource { get; set; }
        [ForeignKey("TaskTypeId")]
        public TaskType TaskType { get; set; }
        public DateTime TimeReserv { get; set; }
        public int Priority { get; set; }
        public bool IsChangeTime { get; set; }
        public bool IsChangeUsers { get; set; }
        public int? StatusId { get; set; }
        public ICollection<Task> Children { get; set; }
        public Process Process { get; set; }
        public int? ProcessQueuParentId { get; set; }
        public int? UserQueuParentId { get; set; }
    }
}
