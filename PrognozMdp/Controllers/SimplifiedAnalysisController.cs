using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using PrognozMdp.Services;

namespace PrognozMdp.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SimplifiedAnalysisController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly OIC _oic;
        public SimplifiedAnalysisController(IConfiguration configuration)
        {
            _configuration = configuration;
            _oic  = new OIC(_configuration);
        }

        [HttpGet]
        public JObject[] GetSections()
        {
            DataRowCollection sectionCollection = _oic.GetSectionsFromOic();
            var sectionList = new List<JObject>();

            if (sectionCollection != null && sectionCollection.Count > 0)
            {
                foreach (DataRow row in sectionCollection)
                {
                    var jObject = JObject.FromObject(new
                    {
                        value = row.ItemArray[0],
                        label = row.ItemArray[1]
                    });
                    sectionList.Add(jObject);
                }
            }
            return sectionList.ToArray();
        }

        [HttpGet]
        public JObject[] GetEquipmentBySection(string sectionId)
        {
            if (string.IsNullOrEmpty(sectionId))
                return null;
            DataRowCollection eqCollection = _oic.GetEquipmentBySectionFromOic(sectionId);
            var eqList = new List<JObject>();

            if (eqCollection != null && eqCollection.Count > 0)
            {
                foreach (DataRow row in eqCollection)
                {
                    var jObject = JObject.FromObject(new
                    {
                        //idEq = row.ItemArray[0],
                        typeEq = row.ItemArray[1],
                        nameEq = row.ItemArray[2],
                        tsId = row.ItemArray[3],
                        isEnabled = true
                    });
                    eqList.Add(jObject);
                }
            }
            return eqList.ToArray();
        }
    }
}
