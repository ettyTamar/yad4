using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
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
    static DataSet ds = new DataSet();
    static SqlDataAdapter adtr = null;


    static public string Login(string email, string password)
    {
        SqlConnection con = new SqlConnection(connectionStr);
        adtr = new SqlDataAdapter($"SELECT site04.Users.* " +
                                  $"FROM site04.Users " +
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

<<<<<<< HEAD
        return new JavaScriptSerializer().Serialize(User);
    }


    static public string Register(string email, string fname, string lname, string password)
=======
            return new JavaScriptSerializer().Serialize(User);
        }

    static public string Register(string email, string password , string name, string last_name)
>>>>>>> c1738d5b8012a7457000e8a9be5c801b4fb83cd0
    {
        SqlConnection con = new SqlConnection(connectionStr);
        adtr = new SqlDataAdapter($"Register", con);
        adtr.SelectCommand.CommandType = CommandType.StoredProcedure;
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Email", email));
<<<<<<< HEAD
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Fname", Fname));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Lname", Lname));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Pass", password));
=======
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Fname", name));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("Lname", last_name));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("pass", password));
>>>>>>> c1738d5b8012a7457000e8a9be5c801b4fb83cd0

        DataSet errorsSet = new DataSet();
        adtr.Fill(errorsSet, "Errors");

<<<<<<< HEAD
        if (DefaultSettingValueAttribute.Tables["Errors"].Rows.Count == 0)
            return Login(email, password);
        return ds.Tables["User_Items"].Rows[0][0].ToString();
=======
        if (ds.Tables["Errors"].Rows.Count == 0)
            return Login(email , password);
        return ds.Tables["User_Items"].Rows[0][0].ToString();
    }
>>>>>>> c1738d5b8012a7457000e8a9be5c801b4fb83cd0
    }
}
