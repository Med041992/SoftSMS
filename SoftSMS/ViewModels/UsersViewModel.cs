using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.MVC.ViewModels
{  ///public enum StatusType
//    { Banned,Registered,Normal,Warned}
    public enum ProfilType
    { Admin, ACM, RE, Agent }
    public class UsersViewModel : IdentityUser
    { 
        //public Guid IDUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool? IsActive { get; set; }
        //public string login { get; set; }
        //public StatusType Status { get; set; }
        public ProfilType Profil { get; set; }
        //public string Password { get; set; }
        public List<MembershipAssociationViewModel> MembershipAssociation { get; set; }
        public List<SentMsgViewModel> Sentmsg { get; set; }
    }
}
