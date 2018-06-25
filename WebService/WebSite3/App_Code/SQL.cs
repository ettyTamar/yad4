using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for SQL
/// </summary>
/// 

public static class SQL
{

    static string connectionStr = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
    static SqlDataAdapter adtr = null;


    static public string Login(string email, string password)
    {
        SqlConnection con = new SqlConnection(connectionStr);
        adtr = new SqlDataAdapter($"SELECT site04.Users.* " +
                                  $"FROM site04.Users " +
                                  $"WHERE(Email = @Email) AND(UPassword = @Password) ", con);
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Password", password));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Email", email));

        DataSet ds = new DataSet();
        adtr.Fill(ds, "User");



        if (ds.Tables["User"].Rows.Count == 0)
            return null;

        var User = new Dictionary<string, object>();
        foreach (DataColumn col in ds.Tables["User"].Rows[0].Table.Columns)
        {
            User.Add(col.ColumnName, ds.Tables["User"].Rows[0][col]);
        }



        adtr = new SqlDataAdapter($"User_Items", con);
        adtr.SelectCommand.CommandType = CommandType.StoredProcedure;
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Email", email));

        adtr.Fill(ds, "User_Items");

        var Items = new List<Dictionary<string, object>>();
        for (int i = 0; i < ds.Tables["User_Items"].Rows.Count; i++)
        {
            var Item = new Dictionary<string, object>();
            foreach (DataColumn col in ds.Tables["User_Items"].Rows[i].Table.Columns)
            {
                Item.Add(col.ColumnName, ds.Tables["User_Items"].Rows[i][col]);
            }
            Items.Add(Item);
        }

        User.Add("Items", Items);

            return new JavaScriptSerializer().Serialize(User);
        }

    static public string Register(string email, string password , string name, string last_name)
    {
        SqlConnection con = new SqlConnection(connectionStr);
        adtr = new SqlDataAdapter($"Register", con);
        adtr.SelectCommand.CommandType = CommandType.StoredProcedure;
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Email", email));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Fname", name));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Lname", last_name));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("pass", password));

        DataSet errorsSet = new DataSet();
        adtr.Fill(errorsSet, "Errors");

        if (errorsSet.Tables["Errors"]  == null)
            return Login(email , password);
        return errorsSet.Tables["Errors"].Rows[0][0].ToString();
    }
    
    static public DataSet GetAllItems()
    {
        DataSet SQLItems = new DataSet();
        SqlConnection con = new SqlConnection(connectionStr);
        adtr = new SqlDataAdapter($"SELECT * FROM site04.GetAllItems", con);
        adtr.Fill(SQLItems, "Items");

        return SQLItems;

    }


    
    static public string GetCatagories()
    {
        SqlConnection con = new SqlConnection(connectionStr);
        adtr = new SqlDataAdapter("SELECT CatagoryName from Catagory", con);
      

        DataSet ds = new DataSet();
        adtr.Fill(ds, "Catagories");

        var Catagories = new List<string>();
        foreach (DataColumn col in ds.Tables["Catagories"].Rows[0].Table.Columns)
        {
            Catagories.Add(ds.Tables["Catagories"].Rows[0][col].ToString());
        }
        return new JavaScriptSerializer().Serialize(Catagories);
    }
    
    static public string PostItem(string email, string catagory, string name, string phone, string location, string description, int price, string image64) {


      
        string ImgName = $"ImageStorage/{email}/{catagory}/{name}_{price}_image.jpg";
        String path = HttpContext.Current.Server.MapPath($"~/"); //Path

        //Check if directory exist
        if (!System.IO.Directory.Exists(path))
        {
            System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
        }


        //set the image path
        string imgPath = Path.Combine(path, ImgName);

        byte[] imageBytes = Convert.FromBase64String(image64);

        File.WriteAllBytes(imgPath, imageBytes);

        string returnPath = $"http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/"+ ImgName;

        SqlConnection con = new SqlConnection(connectionStr);
        adtr = new SqlDataAdapter($"Post", con);
        adtr.SelectCommand.CommandType = CommandType.StoredProcedure;
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Email", email));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Catagory", catagory));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Phone", phone));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Location", location));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("ItemImg", returnPath));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Description", description));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("title", name));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Price", price));

        DataSet errorsSet = new DataSet();
        adtr.Fill(errorsSet);

        return returnPath;
    }
}
