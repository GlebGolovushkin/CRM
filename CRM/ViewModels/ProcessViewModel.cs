using CRM.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.ViewModels
{
    public class ProcessViewModel
    {
        public int Id { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public string Name { get; set; }
        public ICollection<TaskViewModel> Tasks { get; set; }
    }
}
