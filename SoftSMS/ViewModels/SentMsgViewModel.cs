using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.MVC.ViewModels
{ public enum StatusEnum
    { Pending,Received}
    public class SentMsgViewModel
    {
        public int IDSentMsg { get; set; }
        [ForeignKey("Template")]
        public int IDTemplate { get; set; }
        [ForeignKey("Users")]
        public int IDUser { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        public StatusEnum Status { get; set; }
        public List<UsersViewModel> Owned { get; set; }
        public TemplateViewModel As { get; set; }
    }
}
