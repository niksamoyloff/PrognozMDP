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
    public class OIC 
    {
        public string OicConnectionStringMainGroup { get; }
        public string OicConnectionStringMainGroupReserve { get; }
        public string OicConnectionStringReserveGroup { get; }

        private readonly IConfiguration _configuration;

        public OIC(IConfiguration configuration)
        {
            _configuration = configuration;
            OicConnectionStringMainGroup = _configuration.GetSection("ConnectionStrings").GetSection("oicConnectionStringMainGroup").Value;
            OicConnectionStringMainGroupReserve = _configuration.GetSection("ConnectionStrings").GetSection("oicConnectionStringMainGroupReserve").Value;
            OicConnectionStringReserveGroup = _configuration.GetSection("ConnectionStrings").GetSection("oicConnectionStringReserveGroup").Value;
        }
        private DataRowCollection GetDataBySqlQuery(string query)
        {
            using (var sqlConnection = new SqlConnection(GetConnectionString()))
            {
                using (var sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    try
                    {
                        sqlConnection.Open();
                        var sqlDataAdapter = new SqlDataAdapter(sqlCommand);

                        var ds = new DataSet();
                        sqlDataAdapter.Fill(ds);

                        return ds.Tables[0].Rows;
                    }
                    catch
                    {
                        return null;
                    }
                }
            }
        }

        private string GetConnectionString()
        {
            string host;

            if ((host = GetActiveHost(OicConnectionStringMainGroup)) != null)
            {
                return GetConnectionStringByHost(host);
            }

            if ((host = GetActiveHost(OicConnectionStringMainGroupReserve)) != null)
            {
                return GetConnectionStringByHost(host);
            }

            if ((host = GetActiveHost(OicConnectionStringReserveGroup)) != null)
            {
                return GetConnectionStringByHost(host);
            }

            return null;
        }
        private static string GetActiveHost(string connectionString)
        {
            using (var sqlConnection = new SqlConnection(connectionString))
            {
                using (var sqlCommand = new SqlCommand("select oik.dbo.fn_getmainoikservername()", sqlConnection))
                {
                    try
                    {
                        sqlConnection.Open();
                        return sqlCommand.ExecuteScalar().ToString();
                    }
                    catch (Exception e)
                    {
                        var msg = e.ToString();
                        return msg;
                    }
                }
            }
        }
        private string GetConnectionStringByHost(string host)
        {
            var uHost = host.ToUpper();
            if (uHost == new OicConnectionStringParser(OicConnectionStringMainGroup).Server.ToUpper())
            {
                return OicConnectionStringMainGroup;
            }

            if (uHost == new OicConnectionStringParser(OicConnectionStringMainGroupReserve).Server.ToUpper())
            {
                return OicConnectionStringMainGroupReserve;
            }

            if (uHost == new OicConnectionStringParser(OicConnectionStringReserveGroup).Server.ToUpper())
            {
                return OicConnectionStringReserveGroup;
            }

            return null;
        }

        public DataRowCollection GetSectionsFromOic()
        {
            var query = new StringBuilder("SELECT ID, RTRIM (LTRIM (Name)) AS Name " +
                                          "FROM [OIK].[dbo].[psSect] " +
                                          "ORDER BY Name");
            var sections = GetDataBySqlQuery(query.ToString());
            return sections;
        }

        public DataRowCollection GetEquipmentBySectionFromOic(string sectionId)
        {
            if (string.IsNullOrEmpty(sectionId))
                return null;
            var query =  new StringBuilder("USE OIK " +
                                          "SELECT e.ID, et.Abbr, e.Name, s.ID " +
                                          "FROM psSect AS bg " +
                                          "INNER JOIN psEqSect AS bge ON bg.ID = bge.IDSect " +
                                          "INNER JOIN EnObj AS e ON bge.IDEquip = e.ID " +
                                          "INNER JOIN EnObjType AS et ON e.Type = et.ID " +
                                          "LEFT JOIN enFactorOI AS efoi ON efoi.IDEnObj = e.ID AND efoi.IDFactor = 100 " +
                                          "LEFT JOIN DefTS AS s ON efoi.OI = 'S' AND efoi.OIID = s.ID " +
                                          $"WHERE bg.ID = {sectionId}");
            
            var sections = GetDataBySqlQuery(query.ToString());
            return sections;
        }
    }
}

