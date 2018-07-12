using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Net;
using System.Collections.Specialized;

/// <summary>
/// Summary description for WebService
/// </summary>
/// 


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{
    static Dictionary<string, List<string>> UsersNotify = new Dictionary<string, List<string>>();
    static public DataSet Items;
    public WebService()
    {
        Items = SQL.GetAllItems();

    }

    [WebMethod]
    public string Login(string email, string password)
    {
        return SQL.Login(email, password);
    }


    [WebMethod]
    public string Register(string email, string fname, string lname, string password)
    {
        return SQL.Register(email, password, fname, lname);
    }


    [WebMethod]
    public string GetAllItems()
    {

        var ItemsList = new List<Dictionary<string, object>>();
        for (int i = 0; i < Items.Tables["Items"].Rows.Count; i++)
        {
            var Item = new Dictionary<string, object>();
            foreach (DataColumn col in Items.Tables["Items"].Rows[i].Table.Columns)
            {
                Item.Add(col.ColumnName, Items.Tables["Items"].Rows[i][col]);
            }
            ItemsList.Add(Item);
        }

        return new JavaScriptSerializer().Serialize(ItemsList);

    }


    
    [WebMethod]
    public string GetCatagories()
    {
        return SQL.GetCatagories();
    }

   [WebMethod]
    public string PostItem(string email, string catagory, string name, string phone, string location, string description, int price, string image64)
    {
        List<string> res = SQL.PostItem(email, catagory, name, phone, location, description, price, image64);
        foreach (var user in UsersNotify)
        {
            if (email == user.Key.ToString())
                continue;
            string token = user.Value[0].ToString();
            string _catagory = user.Value[1].ToString();

            if (catagory == _catagory)
            {
                using (var client = new WebClient())
                {
                    var values = new NameValueCollection();
                    values["to"] = token;
                    values["body"] = $"some one posted a new item at {_catagory}";

                    var response = client.UploadValues("https://exp.host/--/api/v2/push/send", values);

                }
            }


        }
        return res[0];
    }

    [WebMethod]
    public void DeleteItem(string email, string id)
    {
        SQL.DeleteItem(email, id);
    }


    [WebMethod]
    public void RegisterNotification(string token , string email, string catagory)
    {
        List<string> userDetail = new List<string>();
        userDetail.Add( token);
        userDetail.Add(catagory);
        if (UsersNotify.ContainsKey(email))
        {
            UsersNotify[email] = userDetail;
        }
        else
        {
            UsersNotify.Add(email, userDetail);

        }
    }

    [WebMethod]
    public void UnSub(string email)
    { 
    if (UsersNotify.ContainsKey(email))
        {
            UsersNotify.Remove(email);
        }
        
    }

   [WebMethod]
    public string GetSubs()
    {
        return new JavaScriptSerializer().Serialize(UsersNotify);
    }

}


