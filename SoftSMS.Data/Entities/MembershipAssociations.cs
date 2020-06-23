using SoftSMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.Data.Entity
{
    public class MembershipAssociations
    {
        public int Id { get; set; }
        public Guid IdGrp { get; set; }
        public Guid IdUser { get; set; }

        public virtual ListUsers IdListUsersNavigation { get; set; }
        public virtual Group IdGroupNavigation { get; set; }

    }
}