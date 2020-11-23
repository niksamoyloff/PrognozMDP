using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using PrognozMdp.Services;

namespace PrognozMdp.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SimplifiedAnalysisController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly Oic _oic;
        public SimplifiedAnalysisController(IConfiguration configuration)
        {
            _configuration = configuration;
            _oic  = new Oic(_configuration);
        }

        [HttpGet]
        public JObject[] GetSections()
        {
            var sectionCollection = _oic.GetSectionsFromOic();
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
            var eqCollection = _oic.GetEquipmentBySectionFromOic(sectionId);
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

        [HttpGet]
        public double? CalculateFlowByScheme(string flow, string sectionId, string mask, DateTime? dt)
        {
            var scheme = _oic.GetSchemeByBitMask(sectionId, mask);
            double? result;
            string formula;
            string[] oicFormulaParams;
            if (scheme == null || scheme.Count == 0)
                return null;
            _oic.GetOicParamsValues(new[] {"I" + scheme["IDTI"]}, DateTime.Now);
            var oicParamsVals = _oic.OicParamsValues;
            var flowCurrentValue = oicParamsVals.FirstOrDefault().Value;

            if (flow.Equals("mdp"))
            {
                if (flowCurrentValue >= 0)
                {
                    if (scheme["Max1"] != null)
                    {
                        if (scheme["FMax1"] != 1) return scheme["Max1"];
                        formula = _oic.GetFormulaById(scheme["Max1"]);
                        oicFormulaParams = _oic.GetParamsByFormulaId(scheme["Max1"]);
                        result = _oic.CalcFlowByFormula(formula, oicFormulaParams, dt);
                        return result;
                    }
                }
                else
                {
                    if (scheme["Max2"] != null)
                    {
                        if (scheme["FMax2"] != 1) return scheme["Max2"];
                        formula = _oic.GetFormulaById(scheme["Max2"]);
                        oicFormulaParams = _oic.GetParamsByFormulaId(scheme["Max2"]);
                        result = _oic.CalcFlowByFormula(formula, oicFormulaParams, dt);
                        return result;
                    }
                }
            }

            if (flow.Equals("adp"))
            {
                if (flowCurrentValue >= 0)
                {
                    if (scheme["Crash1"] != null)
                    {
                        if (scheme["FCrash1"] != 1) return scheme["Crash1"];
                        formula = _oic.GetFormulaById(scheme["Crash1"]);
                        oicFormulaParams = _oic.GetParamsByFormulaId(scheme["Crash1"]);
                        result = _oic.CalcFlowByFormula(formula, oicFormulaParams, dt);
                        return result;
                    }
                }
                else
                {
                    if (scheme["Crash2"] != null)
                    {
                        if (scheme["FCrash2"] != 1) return scheme["Crash2"];
                        formula = _oic.GetFormulaById(scheme["Crash2"]);
                        oicFormulaParams = _oic.GetParamsByFormulaId(scheme["Crash2"]);
                        result = _oic.CalcFlowByFormula(formula, oicFormulaParams, dt);
                        return result;
                    }
                }
            }
            return null;
        }
    }
}
