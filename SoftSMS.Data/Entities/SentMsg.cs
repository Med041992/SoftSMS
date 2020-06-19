using SoftSMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{ public enum StatusEnum
    { Pending,Received}
    public class SentMsg : EntityBase
    {
        
        [ForeignKey("Template")]
        public int IDTemplate { get; set; }
        [ForeignKey("Users")]
        public int IDUser { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        public StatusEnum Status { get; set; }
        public List<Users> Owned { get; set; }
        public Template As { get; set; }
    }
}
