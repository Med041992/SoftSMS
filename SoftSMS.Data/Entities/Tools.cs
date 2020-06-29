using System;
using System.Collections.Generic;
using System.Text;
using SoftSMS.Data.Data;
using SoftSMS.Data.Entities;

namespace SoftSMS.Data.Entities
{
    public class Tools
    {
        public static void Log(string s)
        {
            try
            {
                System.IO.File.AppendAllText("C:\\logs\\SoftSMS\\" + "\\log-" + DateTime.Now.ToString("ddMMyyyy") + ".txt", DateTime.Now.ToString("HH:mm:ss") + " || " + s + Environment.NewLine);
            }
            catch
            {
            }
        }


        public static void Historique(string Id_user, string a, string e, string i, string f)
        {

            try
            {
                DataContext context = new DataContext();
                Historique item = new Historique();
                item.IdUtilisateur = Id_user;
                item.Action = a;
                item.EtatAction = e;
                item.EtatInitial = i;
                item.EtatFinal = f;
                item.DateAction = DateTime.Now;
                context.Add(item);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                Tools.Log("Tools, Historique, " + ex.ToString());
            }

        }


        public static string masque(string item)
        {

            try
            {
                string item_masqué = "";
                string temp = "";
                for (int i = 0; i < item.Length - 6; i++)
                {
                    temp += '*';
                }
                item_masqué = item.Substring(0, 4) + temp + item.Substring(item.Length - 2, 2);
                return item_masqué;
            }
            catch (Exception ex)
            {
                Tools.Log("Tools, masque, " + ex.ToString());
                return string.Empty;
            }
        }


    }

}
