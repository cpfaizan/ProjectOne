using System;
using System.Collections.Generic;

namespace ProjectOne.Models
{
    public partial class Department
    {
        public Department()
        {
            Students = new HashSet<Student>();
        }

        public int DepId { get; set; }
        public string DepName { get; set; } = null!;
        public DateTime EntryDate { get; set; }

        public virtual ICollection<Student> Students { get; set; }
    }
}
