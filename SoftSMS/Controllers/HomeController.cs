using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SoftSMS.Data.Entity;
using SoftSMS.Data.Interfaces;
using SoftSMS.MVC.ViewModels;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IUnitOfWork<ListUsers> _user;
        private readonly IUnitOfWork<Group> _group;
        private readonly IUnitOfWork<MembershipAssociations> _mA;
        private readonly IUnitOfWork<Template> _template;
        private readonly IUnitOfWork<SentMsg> _sentMsg;

        public HomeController(IUnitOfWork<ListUsers> User,
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
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var homeviewmodel = new HomeViewModel
            {
                UserVM = _user.Entity.GetAll().First(),
                GroupVM = _group.Entity.GetAll().ToList(),
                MAVM = _mA.Entity.GetAll().ToList(),
                TemplateVM = _template.Entity.GetAll().First(),
                SentMsgVM = _sentMsg.Entity.GetAll().First()


            };
            return View(homeviewmodel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
