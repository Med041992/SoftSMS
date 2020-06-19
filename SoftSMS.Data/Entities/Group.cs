using SoftSMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Group : EntityBase
    {
        
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public List<MembershipAssociation> MembershipAssociation { get; set; }
    }
}
