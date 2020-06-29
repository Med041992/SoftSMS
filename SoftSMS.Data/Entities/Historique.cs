using System;
using System.Collections.Generic;
using System.Text;

namespace SoftSMS.Data.Entities
{
    public partial class Historique
    {
        public int Id { get; set; }
        public string IdUtilisateur { get; set; }
        public string Action { get; set; }

        public DateTime? DateAction { get; set; }
        public string EtatAction { get; set; }
        public string EtatInitial { get; set; }
        public string EtatFinal { get; set; }
    }
}
