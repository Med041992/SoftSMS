using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Novell.Directory.Ldap;
using SoftSMS.MVC.Controllers;

namespace SoftSMS.Controllers
{
    public class LoginController : Controller
    {
        string Host = "localhost";
        int Port = 10389;
        string login = "admin";
        string Category = "system";
        string Password = "secret";
        string Company = "Company";
        string searchFilter = "objectClass=inetOrgPerson";
        public string userList(string ldapHost = "localhost", int ldapPort = 10389, string loginDN = "uid=admin,ou=system", string password = "secret", string searchBase = "ou=users,o=Company", string searchFilter = "objectClass=inetOrgPerson")
        {
            try
            {

                LdapConnection conn = new LdapConnection();
                Console.WriteLine("Connecting to " + ldapHost);
                conn.Connect(ldapHost, ldapPort);
                conn.Bind(loginDN, password);
                return "success";
                
            }
            catch (Exception e)
            {
                return "error " + e.Message;
            } }
                public IActionResult Index()
        {
            string Result = userList(Host,(int)Port, ("uid=" + login + ",ou=" + Category), Password,"ou=users,o="+Company, searchFilter);
            if (Result == "success") {
                return RedirectToRoute("Login/Index", new { name = ViewBag.Login });
            }
            else
                return View();

        }

        [HttpPost]
        public bool Login(string Login)
        { 
            
            return true; }
    }
}
