using SoftSMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SoftSMS.Data.Entity
{ public enum StatusEnum
    { Pending,Received}
    public class SentMsg : EntityBase
    {
        
        
        //public int IdTemplate { get; set; }
        
        //public Guid IdUser { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        public StatusEnum Status { get; set; }
        
        public Template As { get; set; }
    }
}
