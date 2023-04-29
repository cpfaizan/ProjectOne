using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProjectOne.Models
{
    public partial class CRContext : DbContext
    {
        public CRContext()
        {
        }

        public CRContext(DbContextOptions<CRContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Course> Courses { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Logger> Loggers { get; set; } = null!;
        public virtual DbSet<Student> Students { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-AVI9DPS;Database=CR;Trusted_Connection=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("Course");

                entity.Property(e => e.CourseName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EntryDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.DepId)
                    .HasName("PK__Departme__DB9CAA5F58962B60");

                entity.ToTable("Department");

                entity.Property(e => e.DepName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EntryDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Logger>(entity =>
            {
                entity.ToTable("logger");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Mail)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("mail");

                entity.Property(e => e.Pass)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("pass");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("Student");

                entity.Property(e => e.EntryDate).HasColumnType("datetime");

                entity.Property(e => e.StudentName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Dep)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.DepId)
                    .HasConstraintName("FK_Student_Department");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
