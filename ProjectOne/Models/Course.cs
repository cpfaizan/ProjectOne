using System;
using System.Collections.Generic;

namespace ProjectOne.Models
{
    public partial class Course
    {
        public int CourseId { get; set; }
        public int? DepId { get; set; }
        public string CourseName { get; set; } = null!;
        public DateTime EntryDate { get; set; }
    }
}
