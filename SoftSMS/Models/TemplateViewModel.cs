using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class TemplateViewModel
    {
        public int IDTemplate { get; set; }
        [DataType(DataType.MultilineText)]
        public string Text { get; set; }
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public int NbVariables { get; set; }
        [ForeignKey("Group")]
        public int IDGrp { get; set; }
        [ForeignKey("Users")]
        public int IDUser { get; set; }
        public DateTime Date { get; set; }
        public virtual List<GroupViewModel> IDGroup { get; set; }
    }
}
