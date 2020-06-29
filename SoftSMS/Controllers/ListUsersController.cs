using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceReferenceAuthentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SoftSMS.Data.Data;
using SoftSMS.Data.Entities;
using SoftSMS.Data.Entity;
using SoftSMS.Data.Interfaces;
using SoftSMS.MVC.ViewModels;

namespace SoftSMS.MVC.Controllers
{
    public class ListUsersController : Controller
    {
        private readonly DataContext _context;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<ListUsers> userManager;
        private readonly IConfiguration configuration;
        private readonly IUnitOfWork<ListUsers> _users;

        //private readonly DataContext _context;

        public ListUsersController(IUnitOfWork<ListUsers> Users/*DataContext context*/)
        {
            _users = Users;
            //_context = context;
        }

        // GET: ListUsers
        public IActionResult Index()
        {
            return View(_users.Entity.GetAll());
        }

        // GET: ListUsers/Details/5
        public async Task<IActionResult> DetailsAsync(Guid? id)
        {
            
            if (id == null)
            {
                return NotFound();
            }

            var listUsers = await userManager.FindByIdAsync(id.ToString());
            /*await _context.Users
            .FirstOrDefaultAsync(m => m.Id == id);*/
            if (listUsers == null)
            {
                return NotFound();
            }

            return View(listUsers);
        }

        // GET: ListUsers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ListUsers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserName,FirstName,LastName,Profil,IsActive")] ListUsers listUsers)
        {
            try
            {
                TPFAuthenticationSoapClient.EndpointConfiguration endpointConfiguration = new TPFAuthenticationSoapClient.EndpointConfiguration();
                TPFAuthenticationSoapClient servAuth = new TPFAuthenticationSoapClient(endpointConfiguration);
                if ((Boolean)TempData["isValid"] == false)
                {
                    IdentityUser u = await userManager.FindByNameAsync(listUsers.UserName);

                    if (u != null)
                    {
                        ViewBag.IsValid = false;
                        ModelState.AddModelError(string.Empty, "Ce Compte existe déja");
                    }

                    else
                    {
                        GetEmployeeByLoginResponseGetEmployeeByLoginResult x = await servAuth.GetEmployeeByLoginAsync(configuration.GetSection("MySettings").GetSection("login").Value, configuration.GetSection("MySettings").GetSection("pwd").Value, listUsers.UserName);


                        if (x != null)
                        {
                            System.Xml.Linq.XElement b = x.Any1;
                            ViewBag.Result1 = b.Descendants("employee_common_name").First().Value;
                            ViewBag.IsValid = true;

                            listUsers.Id = b.Descendants("employee_ident").First().Value;
                            listUsers.FirstName = b.Descendants("employee_first_name").First().Value;
                            listUsers.LastName = b.Descendants("employee_last_name").First().Value;
                            //listUsers.FullName = b.Descendants("employee_common_name").First().Value;
                            //listUsers.Email = b.Descendants("email1").First().Value;


                            return View(listUsers);
                        }
                        else
                        {
                            Tools.Log(listUsers.UserName);
                            ViewBag.IsValid = false;
                            ModelState.AddModelError(string.Empty, "Compte Inexistant!");
                            //return View(user);

                        }
                    }
                }
                else
                {
                    ListUsers myuser = new ListUsers { UserName = listUsers.UserName, Email = listUsers.Email, Id = listUsers.Id, FirstName = listUsers.FirstName, LastName = listUsers.LastName };
                    await userManager.CreateAsync(myuser);
                    await userManager.AddToRoleAsync(myuser, "Manager");

                    Tools.Historique(User.Identity.Name, "Creation d'utilisateur", "Success", "", myuser.UserName);
                    return RedirectToAction(nameof(Index));
                }
                return View(listUsers);

            }
            catch (Exception ex)
            {
                Tools.Log("UsersController, Post Create, Utilisateur (" + User.Identity.Name + ") : " + ex.ToString());
                TempData["errorMessage"] = "Impossible de creer l'utilisateur";
                return RedirectToAction(nameof(Create));
            }
        }

        // GET: ListUsers/Edit/5
        public IActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var listUsers = _users.Entity.GetById(id);
                /*await _context.Users.FindAsync(id);*/
            if (listUsers == null)
            {
                return NotFound();
            }
            ListUsers listUsers1 = new ListUsers
            { 
                Id=listUsers.Id,
                FirstName = listUsers.FirstName,
                LastName = listUsers.LastName,
                UserName = listUsers.UserName,
                Profil = listUsers.Profil,
                MembershipAssociation = listUsers.MembershipAssociation
            };
            return View(listUsers);
        }

        // POST: ListUsers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Guid id,UsersViewModel model)
        {
            if (!id.Equals(model.Id))
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    if (ModelState.IsValid)
                    {
                        /*listUsers.Id = Guid.NewGuid();
                        _context.Add(listUsers);
                        await _context.SaveChangesAsync();
                        return RedirectToAction(nameof(Index));*/
                        ListUsers listUsers1 = new ListUsers
                        {
                            FirstName = model.FirstName,
                            LastName = model.LastName,
                            UserName = model.UserName,
                            Profil = (Data.Entity.ProfilType)model.Profil,
                            MembershipAssociation = (ICollection<MembershipAssociations>)model.MembershipAssociation
                        };
                        _users.Entity.Update(listUsers1);
                        _users.Save();
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ListUsersExists(model.Id.ToString()))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        // GET: ListUsers/Delete/5
        public IActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var listUsers = _users.Entity.GetById(id); 
                /*await _context.Users
                .FirstOrDefaultAsync(m => m.Id == id);*/
            if (listUsers == null)
            {
                return NotFound();
            }

            return View(listUsers);
        }

        // POST: ListUsers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(Guid id)
        {
           _users.Entity.Delete(id);
            _users.Save();
            /* var listUsers = await _context.Users.FindAsync(id);
        _context.Users.Remove(listUsers);
        await _context.SaveChangesAsync();*/
            return RedirectToAction(nameof(Index));
        }

        private bool ListUsersExists(string id)
        {
            return _users.Entity.GetAll().Any(e => e.Id == id);
        }
    }
}
