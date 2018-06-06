﻿using System;
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

<<<<<<< HEAD
    static string connectionStr = @"Data Source=ETTY\SQLEXPRESS;Initial Catalog=NirProject;Integrated Security=True";
    static DataSet ds = new DataSet();
    static SqlDataAdapter adtr = null;
=======
    public static class SQL
    {
>>>>>>> ac87ff27072dfefa57567536453ba8bf57f45834

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

            return new JavaScriptSerializer().Serialize(User);
        }
    }