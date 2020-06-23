﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.MVC.ViewModels
{
    public class GroupViewModel
    {
        public int IDGrp { get; set; }
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public List<MembershipAssociationViewModel> MembershipAssociation { get; set; }
    }
}