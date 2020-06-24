using Microsoft.AspNetCore.Html;
/*using Microsoft.AspNetCore.Mvc;
using Serilog;*/
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using SoftSMS.Data;

namespace SoftSMS.Data.Entities
{
    public class Client
    {
        public int ClientId { get; set; }
        public string ClientName { get; set; }
    }

    public class Campaign
    {
        public int CampaignId { get; set; }
        public string CampaignName { get; set; }
        public bool CmpIBActive { get; set; }
        public bool CmpOBActive { get; set; }
    }

    public class DrawTagReturn
    {
        public IHtmlContent Html { get; set; }
        public string DivId { get; set; }
    }

    public class Lavorazione
    {
        public int OBQ_ID { get; set; }
        public int? OBQ_FK_THR_ID { get; set; }
        public string OBQ_SMS_TEXT { get; set; }
        public DateTime? OBQ_DT_INSERT { get; set; }
        public string OBQ_USR_INSERT { get; set; }
        public DateTime? OBQ_DT_SCHEDULED { get; set; }
        public DateTime? OBQ_DT_SENT { get; set; }
        public string OBQ_SEND_NOTES { get; set; }
        public int? OBQ_FK_OST_ID { get; set; }
    }

    /*public static class LoggerExtensions
    {
        public static ILogger Here(this ILogger logger,
            [CallerMemberName] string memberName = "")
        {
            return logger
                .ForContext("MemberName", memberName);
        }
    }*/

    //Global Variable with DBContext that can be used in every class, not only in the controller
    public static class GlobalVariable
    {
        //public static DataContext DBcontext { get; set; }
        public static string ConnectionString { get; set; }
        public static string SysUser { get; set; }
        public static int CampaignId { get; set; }
        public static string CategoryId { get; set; }
    }

    #region Classi pagina Send Sms

    public class Categoria
    {
        public int Category_Id { get; set; }
        public string Category { get; set; }
        public string Text { get; set; }
        public int Read_Only { get; set; }
    }

    public class CustomFields
    {
        public string THR_CUSTOM1 { get; set; }
        public string THR_CUSTOM2 { get; set; }
        public string THR_CUSTOM3 { get; set; }
        public string THR_CUSTOM4 { get; set; }
        public string THR_CUSTOM5 { get; set; }
    }

    public class CMP
    {
        public string Sender { get; set; }
        public CustomFields ThrCusFields { get; set; }
    }

    public class SendingSms
    {
        public List<Categoria> CategoryList { get; set; }
        public CMP CMP { get; set; }
    }

    public class SmsInsertObq
    {
        public SmsInsertObq()
        {
            Thr_custom1 = null;
            Thr_custom2 = null;
            Thr_custom3 = null;
            Thr_custom4 = null;
            Thr_custom5 = null;
            Dt_scheduled = null;
        }

        [Required]
        public string Sms_text { get; set; }
        [Required]
        [Phone()]
        public string SMS_PhoneNumberTo { get; set; }
        [Required]
        public string User_insert { get; set; }
        [Required]
        public int Campaign_Id { get; set; }
        public int CategoryId { get; set; }
        public DateTime? Dt_scheduled { get; set; }
        public string Thr_custom1 { get; set; }
        public string Thr_custom2 { get; set; }
        public string Thr_custom3 { get; set; }
        public string Thr_custom4 { get; set; }
        public string Thr_custom5 { get; set; }
    }

    #endregion

    public class ClsReturn
    {
        public string Outcome { get; set; }
        public string Description { get; set; }
        public int Code { get; set; }

        public ClsReturn()
        {
            Outcome = "";
            Description = "";
            Code = 0;
        }
    }

    public class AnagraficaAgente
    {
        public double Id_CCMS { get; set; }
        public string CognomeNome { get; set; }
        public string AgentLogin { get; set; }
        public string Sede { get; set; }
        public string CampagnaCCMS { get; set; }
        public string LstCampaign { get; set; }
        public string Role { get; set; }
        public bool Active { get; set; }

        public AnagraficaAgente()
        {
            LstCampaign = string.Empty;
        }

    }
    public class CustomReport : Campaign
    {
        public int CreId { get; set; }
        public string CreReportName { get; set; }
    }
}
