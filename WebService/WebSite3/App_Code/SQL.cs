using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for SQL
/// </summary>
public static class SQL
{

    static string connectionStr = @"Data Source=DESKTOP-7DK9IUH\SQLEXPRESS;Initial Catalog=NirProject;Integrated Security=True";
    static DataSet ds = new DataSet();
    static SqlDataAdapter adtr = null;


    static public string Login(string email , string password)
    {
        SqlConnection con = new SqlConnection(connectionStr);
        adtr = new SqlDataAdapter($"SELECT dbo.Users.* " +
                                  $"FROM dbo.Users " +
                                  $"WHERE(Email = @Email) AND(UPassword = @Password) ", con);
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Password", password));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Email", email));

        ds.Clear();
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

        var Items = new Dictionary<string, object>();
        foreach (DataColumn col in ds.Tables["User_Items"].Rows[0].Table.Columns)
        {
            Items.Add(col.ColumnName, ds.Tables["User_Items"].Rows[0][col]);
        }

        User.Add("Items", Items);

        return new JavaScriptSerializer().Serialize(User);
    }
}