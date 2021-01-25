using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace PrognozMdp.Services
{
    public class RepairScheme
    {
        public string RpsConnectionString { get; }

        public RepairScheme(IConfiguration configuration)
        {
            RpsConnectionString = configuration.GetSection("ConnectionStrings").GetSection("rpsConnectionString").Value;
        }

        public async Task<string> GetDevNameFromRpsDbAsync(string id)
        {
            if (string.IsNullOrEmpty(id)) return null;
            var query = new StringBuilder("SELECT [deviceName] " +
                                          "FROM [RPSheme].[dbo].[Bindings] " +
                                          $"WHERE [elementId] = '{id}'");

            await using var sqlConnection = new SqlConnection(RpsConnectionString);
            await using var sqlCommand = new SqlCommand(query.ToString(), sqlConnection);
            try
            {
                await sqlConnection.OpenAsync();
                var sqlDataAdapter = new SqlDataAdapter(sqlCommand);

                var ds = new DataSet();
                sqlDataAdapter.Fill(ds);

                return ds.Tables[0].Rows.Count > 0 
                    ? ds.Tables[0].Rows[0].ItemArray[0].ToString() 
                    : null;
            }
            catch(Exception)
            {
                return null;
            }
        }
    }
}
