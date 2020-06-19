using SoftSMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class MembershipAssociation : EntityBase
    {
        [ForeignKey("Group")]
        public int IDGrp { get; set; }
        [ForeignKey("Users")]
        public int IDUser { get; set; }
        public Group Grp { get; set; }
        public Users User { get; set; }
    }
}
