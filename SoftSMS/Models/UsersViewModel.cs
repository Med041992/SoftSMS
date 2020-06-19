using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{  public enum StatusType
    { Banned,Registered,Normal,Warned}
    public enum ProfilType
    { Admin,Manager,Agent}
    public class UsersViewModel
    { 
        public int IDUser { get; set; }
        [DataType(DataType.Text)]
        public string FirstName { get; set; }
        [DataType(DataType.Text)]
        public string LastName { get; set; }
        [DataType(DataType.Text)]
        [Required]
        public string Login { get; set; }
        public StatusType Status { get; set; }
        public ProfilType Profil { get; set; }
        public List<MembershipAssociationViewModel> MembershipAssociation { get; set; }
        public List<SentMsgViewModel> Sentmsg { get; set; }
    }
}
