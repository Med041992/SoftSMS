using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class MembershipAssociationViewModel
    {
        [ForeignKey("Group")]
        public int IDGrp { get; set; }
        [ForeignKey("Users")]
        public int IDUser { get; set; }
        public GroupViewModel Grp { get; set; }
        public UsersViewModel User { get; set; }
    }
}
