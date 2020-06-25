using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Novell.Directory.Ldap;
using SoftSMS.Data.Entity;
using SoftSMS.Data.Interfaces;
using SoftSMS.MVC.Controllers;
using SoftSMS.MVC.ViewModels;

namespace SoftSMS.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IUnitOfWork<ListUsers> _user;
        private readonly IUnitOfWork<Group> _group;
        private readonly IUnitOfWork<MembershipAssociations> _mA;
        private readonly IUnitOfWork<Template> _template;
        private readonly IUnitOfWork<SentMsg> _sentMsg;
        public LoginController(IUnitOfWork<ListUsers> User,
            IUnitOfWork<Group> Group,
            IUnitOfWork<MembershipAssociations> MA,
            IUnitOfWork<Template> Template,
            IUnitOfWork<SentMsg> SentMsg)
        {
         _user = User;
            _group = Group;
            _mA = MA;
            _template = Template;
            _sentMsg = SentMsg;
        }
        public LoginController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        
        //string Host = "localhost";
        //int Port = 10389;
        //string login = "admin";
        //string Category = "system";
        //string Password = "secret";
        //string Company = "Company";
        //string searchFilter = "objectClass=inetOrgPerson";
        public string userList(string ldapHost = "localhost", int ldapPort = 10389, string loginDN = "uid=admin,ou=system", string password = "secret", string searchBase = "ou=users,o=Company", string searchFilter = "objectClass=inetOrgPerson")
        {
            try
            {

                LdapConnection conn = new LdapConnection();
                //Console.WriteLine("Connecting to " + ldapHost);
                conn.Connect(ldapHost, ldapPort);
                conn.Bind(loginDN, password);
                return "success";
                
            }
            catch (Exception e)
            {
                return "error " + e.Message;
            } }
        [HttpPost]
        public IActionResult Index(string Host = "localhost", int Port = 10389, string login = "admin", string Category="system", string Password = "secret", string Company="Company", string searchFilter = "objectClass=inetOrgPerson")
        {
            var homeviewmodel = new HomeViewModel
            {
                UserVM = _user.Entity.GetAll().First(),
                GroupVM = _group.Entity.GetAll().ToList(),
                MAVM = _mA.Entity.GetAll().ToList(),
                TemplateVM = _template.Entity.GetAll().First(),
                SentMsgVM = _sentMsg.Entity.GetAll().First()


            };
            string Result = userList(Host,(int)Port, ("uid=" + login + ",ou=" + Category), Password,"ou=users,o="+Company, searchFilter);
            if (Result == "success") {
                return RedirectToRoute("SendSMS/Index", new { name = ViewBag.Login });
            }
            else
                return View();

        }

        [HttpPost]
        public bool Login(string Login)
        { 
            
            return true; }
    }
    //public IActionResult Privacy()
    //{
    //    return View();
    //}

    //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    //public IActionResult Error()
    //{
    //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    //}
}
