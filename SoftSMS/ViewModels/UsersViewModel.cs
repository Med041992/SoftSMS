using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.MVC.ViewModels
{  public enum StatusType
    { Banned,Registered,Normal,Warned}
    public enum ProfilType
    { Admin,Manager,Agent}
    public class UsersViewModel
    { 
        public Guid IDUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public StatusType Status { get; set; }
        public ProfilType Profil { get; set; }
        public List<MembershipAssociationViewModel> MembershipAssociation { get; set; }
        public List<SentMsgViewModel> Sentmsg { get; set; }
    }
}
