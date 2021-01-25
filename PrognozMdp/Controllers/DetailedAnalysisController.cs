using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting.Internal;
using Newtonsoft.Json.Linq;
using PrognozMdp.Services;

namespace PrognozMdp.Controllers
{
    [Route("[controller]/[action]")]
    //[ApiController]
    public class DetailedAnalysisController : ControllerBase
    {
        private readonly RepairScheme _scheme;
        public DetailedAnalysisController(RepairScheme scheme)
        {
            _scheme = scheme;
        }
        
        [HttpGet]
        public async Task<string> GetNetworkItemName(string itemId)
        {
            if (string.IsNullOrEmpty(itemId)) return null;
            string itemName;
            try
            {
                itemName = await _scheme.GetDevNameFromRpsDbAsync(itemId);
            }
            catch (Exception)
            {
                return null;
            }
            return itemName;
        }

        [HttpGet]
        public JObject[] GetUncontrolledSections(string[] items)
        {
            if (items == null || !items.Any()) return null;
            var sections = new List<JObject>();
            return sections.ToArray();
        }
    }
}
