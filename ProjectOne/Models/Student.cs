using System;
using System.Collections.Generic;

namespace ProjectOne.Models
{
    public partial class Student
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; } = null!;
        public int? DepId { get; set; }
        public DateTime EntryDate { get; set; }

        public virtual Department? Dep { get; set; }
    }
}
