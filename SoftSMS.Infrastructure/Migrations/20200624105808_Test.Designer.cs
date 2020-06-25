﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SoftSMS.Infrastructure;

namespace SoftSMS.Infrastructure.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200624105808_Test")]
    partial class Test
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SoftSMS.Data.Entity.Group", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("newId()");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("SoftSMS.Data.Entity.ListUsers", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("newId()");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Profil")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("1b0b3585-fc20-4053-bb52-7f3e6c1a7149"),
                            FirstName = "Teleperformance Tunisie",
                            LastName = "",
                            Login = "Admin",
                            Profil = 0,
                            Status = 2
                        });
                });

            modelBuilder.Entity("SoftSMS.Data.Entity.MembershipAssociations", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid>("IdGrp")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdUser")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("IdGrp");

                    b.HasIndex("IdUser");

                    b.ToTable("MembershipAssociations");
                });

            modelBuilder.Entity("SoftSMS.Data.Entity.SentMsg", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("newId()");

                    b.Property<Guid?>("AsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("ListUsersId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AsId");

                    b.HasIndex("ListUsersId");

                    b.ToTable("SentMsgs");
                });

            modelBuilder.Entity("SoftSMS.Data.Entity.Template", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("newId()");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("GroupId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("IDGrp")
                        .HasColumnType("int");

                    b.Property<Guid>("IDUser")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ListUsersId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NbVariables")
                        .HasColumnType("int");

                    b.Property<long>("Phone")
                        .HasColumnType("bigint");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("ListUsersId");

                    b.ToTable("Templates");
                });

            modelBuilder.Entity("SoftSMS.Data.Entity.MembershipAssociations", b =>
                {
                    b.HasOne("SoftSMS.Data.Entity.Group", "IdGroupNavigation")
                        .WithMany("MembershipAssociation")
                        .HasForeignKey("IdGrp")
                        .HasConstraintName("FK_MembershipAssociations_Grp")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SoftSMS.Data.Entity.ListUsers", "IdListUsersNavigation")
                        .WithMany("MembershipAssociation")
                        .HasForeignKey("IdUser")
                        .HasConstraintName("FK_MembershipAssociations_User")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SoftSMS.Data.Entity.SentMsg", b =>
                {
                    b.HasOne("SoftSMS.Data.Entity.Template", "As")
                        .WithMany()
                        .HasForeignKey("AsId");

                    b.HasOne("SoftSMS.Data.Entity.ListUsers", null)
                        .WithMany("SentmsgNavigation")
                        .HasForeignKey("ListUsersId");
                });

            modelBuilder.Entity("SoftSMS.Data.Entity.Template", b =>
                {
                    b.HasOne("SoftSMS.Data.Entity.Group", null)
                        .WithMany("TemplateNavigation")
                        .HasForeignKey("GroupId");

                    b.HasOne("SoftSMS.Data.Entity.ListUsers", null)
                        .WithMany("TemplateNavigation")
                        .HasForeignKey("ListUsersId");
                });
#pragma warning restore 612, 618
        }
    }
}