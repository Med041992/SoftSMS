using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SoftSMS.Data.Entity;
using SoftSMS.Data.Interfaces;
using SoftSMS.Infrastructure;
using SoftSMS.MVC.ViewModels;

namespace SoftSMS.MVC.Controllers
{
    public class ListUsersController : Controller
    {
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
        public IActionResult Details(Guid? id)
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
        public async Task<IActionResult> Create([Bind("FirstName,LastName,Login,Status,Profil,Id")] ListUsers listUsers)
        {
            if (ModelState.IsValid)
            {
                /*listUsers.Id = Guid.NewGuid();
                _context.Add(listUsers);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));*/
                ListUsers listUsers1 = new ListUsers
                {
                    FirstName = listUsers.FirstName,
                    LastName = listUsers.LastName,
                    Login = listUsers.Login,
                    Profil = listUsers.Profil,
                    Status = listUsers.Status,
                    MembershipAssociation=listUsers.MembershipAssociation
                };
                _users.Entity.Insert(listUsers1);
                _users.Save();
                return RedirectToAction(nameof(Index));
            }
            return View(listUsers);
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
                Login = listUsers.Login,
                Profil = listUsers.Profil,
                Status = listUsers.Status,
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
            if (!id.Equals(model.IDUser))
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
                            Login = model.Login,
                            Profil = (Data.Entity.ProfilType)model.Profil,
                            Status = (Data.Entity.StatusType)model.Status,
                            MembershipAssociation = (ICollection<MembershipAssociations>)model.MembershipAssociation
                        };
                        _users.Entity.Update(listUsers1);
                        _users.Save();
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ListUsersExists(model.IDUser))
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

        private bool ListUsersExists(Guid id)
        {
            return _users.Entity.GetAll().Any(e => e.Id == id);
        }
    }
}
