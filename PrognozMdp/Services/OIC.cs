using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.Extensions.Configuration;
using OICDAC;

namespace PrognozMdp.Services
{
    public class Oic
    {
        public string OicConnectionStringMainGroup { get; } 
        public string OicConnectionStringMainGroupReserve { get; }
        public string OicConnectionStringReserveGroup { get; }
        public Dictionary<string, string> OicParamsValues { get; set; }

        private readonly IConfiguration _configuration;
        private DAC _dac;
        private OIRequest _request;
        private RpnCalc _calc;

        public Oic(IConfiguration configuration, DAC dac)
        {
            _configuration = configuration;
            _dac = dac;
            _calc = new RpnCalc();
            OicParamsValues = new Dictionary<string, string>();
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

        public Dictionary<string, string> GetSchemeByBitMask(string sectionId, string mask)
        {
            if (string.IsNullOrEmpty(mask) || string.IsNullOrEmpty(sectionId))
                throw new ArgumentNullException();
            var bitMask = mask + new string('1', 64 - mask.Length);  
            // Convert bit mask to Int64
            var maskToQuery = Convert.ToInt64(bitMask, 2);
            var query = new StringBuilder("USE OIK " +
                                          "SELECT IDTI, Mask, Max1, Crash1, Max2, Crash2, Max1s, Max2s, " +
                                          "FMax1, FMax2, FMax1s, FMax2s, FCrash1, FCrash2 " +
                                          "FROM [OIK].[dbo].[psSchem] " +
                                          $"WHERE IDSect = {sectionId} AND Mask = {maskToQuery}");
            
            var data = GetDataBySqlQuery(query.ToString());
            var scheme = new Dictionary<string, string>();
            if (data != null && data.Count > 0)
            {
                scheme = data[0].Table.Columns
                    .Cast<DataColumn>()
                    .ToDictionary(c => c.ColumnName, c => data[0][c].ToString());
            }
            return scheme;
        }

        public void GetParamsByFormulaId(string formulaId, DateTime? dt)
        {
            var query = new StringBuilder("SELECT CONCAT(OI, SID) AS Prmtr " +
                                          "FROM [OIK].[dbo].[TIFormulasR] " +
                                          $"WHERE FID = {formulaId}");

            var data = GetDataBySqlQuery(query.ToString());
            var oicFormulaParams = data.Cast<DataRow>().Select(row => row.ItemArray[0].ToString()).ToArray();
            OicParamsValues?.Clear();
            GetOicParamsValues(oicFormulaParams, dt);
        }

        public string GetFormulaById(string formulaId)
        {
            var query = new StringBuilder("SELECT [Frml] FROM [OIK].[dbo].[TIFormulas] "+
                                          $"WHERE ID = {formulaId}");

            var data = GetDataBySqlQuery(query.ToString());
            var formula = data.Cast<DataRow>().Select(row => row.ItemArray[0].ToString()).FirstOrDefault();
            return formula;
        }

        public double CalcFlowByFormula(string formula)
        {
            //GetOicParamsValues(formulaParams, dt);
            Thread.Sleep(2000);
            var flowValue = _calc.Calculate(formula, OicParamsValues);
            return flowValue;
        }

        public void CreateConnection()
        {
            if (_dac.Connection.Connected)
                _dac.Connection.Connected = false;
            _dac.Connection.ConnectKind = ConnectKindEnum.ck_Default;

            try
            {
                _dac.Connection.Connected = true;
            }
            catch (Exception ex)
            {
                throw new COMException("Ошибка соединения с ОИК: ", ex);
            }
        }

        public void CloseConnection()
        {
            try
            {
                _dac.Connection.Connected = false;
            }
            catch (Exception ex)
            {
                throw new COMException("Ошибка разрыва соединения с ОИК: ", ex);
            }
        }

        private void CreateRequest()
        {
            _request = _dac.OIRequests.Add();
            _request.OnGetResult += Request_OnGetResult;
        }
        private void StopRequest()
        {
            if (_dac.OIRequests.Count > 0)
            {
                _dac.OIRequests.Item(0).Stop();
                _dac.OIRequests.Item(0).Delete();
                _request = null;
            }
        }
        private void Request_OnGetResult(string DataSource, KindRefreshEnum KindRefresh, DateTime Time, object Data, int Sign, int Tag)
        {
            if (!OicParamsValues.ContainsKey(DataSource))
                OicParamsValues.Add(DataSource, Data.ToString());
            else
                OicParamsValues[DataSource] = Data.ToString();
        }
        public void GetOicParamsValues(string[] oicParams, DateTime? dt)
        {
            CreateConnection();
            if (!_dac.Connection.Connected)
                return;
            OicParamsValues?.Clear();
            StopRequest();

            if (oicParams.Length > 0)
            {
                CreateRequest();
                foreach (var param in oicParams)
                {
                    OIRequestItem requestItem = _request.AddOIRequestItem();
                    requestItem.IsLocalTime = true;
                    requestItem.KindRefresh = KindRefreshEnum.kr_ActualData;
                    requestItem.DataSource = param;
                    requestItem.TimeStart = dt ?? DateTime.Now;
                    requestItem.TimeStop = dt ?? DateTime.Now;
                }
                _request.Start();
            }
        }

        ~Oic()
        {
            Dispose(false);
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                    if (_dac.Connection.Connected)
                    {
                        _dac.Connection.Connected = false;
                    }

                    _dac = null;
                    _request = null;
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~OIC()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // подавляем финализацию
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}

