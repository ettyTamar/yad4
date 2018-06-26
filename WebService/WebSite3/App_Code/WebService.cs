using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;




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
        return SQL.PostItem(email, catagory, name, phone, location, description, price, image64);
    }

    [WebMethod]
    public void DeleteItem(string email)
    {
        SQL.DeleteItem();
    }


}


