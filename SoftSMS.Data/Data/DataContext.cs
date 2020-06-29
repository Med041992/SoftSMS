using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using SoftSMS.Data.Entity;

namespace SoftSMS.Data.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base (options)
        {

        }

        public DataContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);
            modelbuilder.Entity<ListUsers>().Property(x => x.Id).HasDefaultValueSql("newId()");
            modelbuilder.Entity<Group>().Property(x => x.Id).HasDefaultValueSql("newId()");
            modelbuilder.Entity<SentMsg>().Property(x => x.Id).HasDefaultValueSql("newId()");
            modelbuilder.Entity<Template>().Property(x => x.Id).HasDefaultValueSql("newId()");
            /* modelbuilder.Entity<MembershipAssociations>(entity =>
             {
                 entity.HasKey(e => e.IdUser);

                 entity.ToTable("MembershipAssociations");


                 entity.HasOne(d => d.ListUsers)
                 .WithMany(p => p.IdUser)
                 .HasForeignKey(d => d.Id)
                 .HasConstraintName("FK_MembershipAssociation_ListUsers");
             });*/

            modelbuilder.Entity<MembershipAssociations>(entity =>
            {
                entity.HasKey("Id");

                entity.ToTable("MembershipAssociations");

                entity.HasOne(d => d.IdListUsersNavigation)
                .WithMany(p => p.MembershipAssociation)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("FK_MembershipAssociations_User");

                entity.HasOne(d => d.IdGroupNavigation)
                .WithMany(p => p.MembershipAssociation)
                .HasForeignKey(d => d.IdGrp)
                .HasConstraintName("FK_MembershipAssociations_Grp");
            });
            /*modelbuilder.Entity<Template>(entity =>
             {
                 entity.HasKey("IDUser");

                 entity.ToTable("Users");
                 entity.HasMany(d => d.IDUser)
                 .WithMany(p => p.Id)
                 .HasForeignKey(d => d.IdUser)
                 .HasConstraintName("FK_SentMsg_User");

                 entity.HasMany(d => d.IDGrp)
                 .WithMany(p => p.IDGrp)
                 .HasForeignKey(d => d.IdGrp)
                 .HasConstraintName("FK_Templates_Grp");
             });*/
            
            modelbuilder.Entity<ListUsers>().HasData(
                new ListUsers()
                {
                    Id = Guid.NewGuid().ToString("N"),
                    FirstName = "Teleperformance Tunisie",
                    LastName = "",
                    UserName = "Admin",
                    Profil = ProfilType.Admin,
                    Status = StatusType.Normal

                }) ;
        }
        public DbSet<ListUsers> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<MembershipAssociations> MembershipAssociations { get; set; }
        public DbSet<SentMsg> SentMsgs { get; set; }
        public DbSet<Template> Templates { get; set; }
    }
}
