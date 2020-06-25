using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.MVC.ViewModels
{
    public class TemplateViewModel
    {
        public int IDTemplate { get; set; }
        public string Text { get; set; }
        public string Name { get; set; }
        public int NbVariables { get; set; }
        public int IDGrp { get; set; }
        public int IDUser { get; set; }
        public DateTime Date { get; set; }
        public long Phone { get; set; }
        public virtual List<GroupViewModel> IDGroup { get; set; }
    }
}
