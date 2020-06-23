using SoftSMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.Data.Entity
{  public enum StatusType
    { Banned,Registered,Normal,Warned}
    public enum ProfilType
    { Admin,Manager,Agent}
    public class ListUsers : EntityBase
    { 
        
        [DataType(DataType.Text)]
        public string FirstName { get; set; }
        [DataType(DataType.Text)]
        public string LastName { get; set; }
        [DataType(DataType.Text)]
        [Required]
        public string Login { get; set; }
        public StatusType Status { get; set; }
        public ProfilType Profil { get; set; }
        
        public virtual ICollection<MembershipAssociations> MembershipAssociation { get; set; }
        public virtual ICollection<Template> TemplateNavigation { get; set; }
        public virtual ICollection<SentMsg> SentmsgNavigation { get; set; }
    }
}
