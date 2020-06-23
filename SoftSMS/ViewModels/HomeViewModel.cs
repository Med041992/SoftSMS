using SoftSMS.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.MVC.ViewModels
{
    public class HomeViewModel
    {
        public ListUsers UserVM { get; set; }
        public List<Group> GroupVM { get; set; }
        public List<MembershipAssociations> MAVM { get; set; }
        public Template TemplateVM { get; set; }
        public SentMsg SentMsgVM { get; set; }
    }
}
