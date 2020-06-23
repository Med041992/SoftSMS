using SoftSMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.Data.Entity
{
    public class Group : EntityBase
    {
        
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public List<MembershipAssociations> MembershipAssociation { get; set; }
        public virtual ICollection<Template> TemplateNavigation { get; set; }
    }
}
