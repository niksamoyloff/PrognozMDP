using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using PrognozMdp.Services;

namespace PrognozMdp.Controllers
{
    [Route("[controller]/[action]")]
    //[ApiController]
    public class SimplifiedAnalysisController : ControllerBase
    {
        //private readonly IConfiguration _configuration;
        private readonly Oic _oic;
        public SimplifiedAnalysisController(Oic oic)
        {
            _oic = oic;
        }

        [HttpGet]
        public JObject[] GetSections()
        {
            var sectionCollection = _oic?.GetSectionsFromOic();
            var sectionList = new List<JObject>();
            var test = new List<JObject>();

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
            //return test.ToArray();
        }

        [HttpGet]
        public JObject[] GetEquipmentBySection(string sectionId)
        {
            if (string.IsNullOrEmpty(sectionId))
                return null;
            var eqCollection = _oic?.GetEquipmentBySectionFromOic(sectionId);
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
        public JObject CalculateFlowByScheme(string flow, string sectionId, string mask, DateTime? dt)
        {
            var scheme = _oic?.GetSchemeByBitMask(sectionId, mask);
            JObject result = new JObject
            {
                {"flowCurrentValue", null},
                {"flowCalcValue", null}
            };
            if (scheme == null || scheme.Count == 0)
                return result;
            if (string.IsNullOrEmpty(scheme["Max1"]) &&
                string.IsNullOrEmpty(scheme["Max2"]) &&
                string.IsNullOrEmpty(scheme["Crash1"]) &&
                string.IsNullOrEmpty(scheme["Crash1"]))
                return result;
            
            string formula;
            
            _oic?.GetOicParamsValues(new[] {"I" + scheme["IDTI"]}, DateTime.Now);
            var flowCurrentValue = Convert.ToDouble(_oic?.OicParamsValues?.FirstOrDefault().Value);
            result["flowCurrentValue"] = flowCurrentValue;

            if (flow.Equals("mdp"))
            {
                if (flowCurrentValue >= 0)
                {
                    if (!string.IsNullOrEmpty(scheme["Max1"]))
                    {
                        if (scheme["FMax1"] != true.ToString())
                        {
                            result["flowCalcValue"] = Convert.ToDouble(scheme["Max1"]);
                            return result;
                        }
                        formula = _oic?.GetFormulaById(scheme["Max1"]);
                        _oic.GetParamsByFormulaId(scheme["Max1"], dt);
                        result["flowCalcValue"] = _oic?.CalcFlowByFormula(formula);
                        return result;
                    }
                }
                else
                {
                    if (!string.IsNullOrEmpty(scheme["Max2"]))
                    {
                        if (scheme["FMax2"] != true.ToString())
                        {
                            result["flowCalcValue"] = Convert.ToDouble(scheme["Max2"]);
                            return result;
                        }
                        formula = _oic?.GetFormulaById(scheme["Max2"]);
                        _oic?.GetParamsByFormulaId(scheme["Max2"], dt);
                        result["flowCalcValue"] = _oic?.CalcFlowByFormula(formula);
                        return result;
                    }
                }
            }

            if (flow.Equals("adp"))
            {
                if (flowCurrentValue >= 0)
                {
                    if (!string.IsNullOrEmpty(scheme["Crash1"]))
                    {
                        if (scheme["FCrash1"] != true.ToString())
                        {
                            result["flowCalcValue"] = Convert.ToDouble(scheme["Crash1"]);
                            return result;
                        }
                        formula = _oic?.GetFormulaById(scheme["Crash1"]);
                        _oic?.GetParamsByFormulaId(scheme["Crash1"], dt);
                        result["flowCalcValue"] = _oic?.CalcFlowByFormula(formula);
                        return result;
                    }
                }
                else
                {
                    if (!string.IsNullOrEmpty(scheme["Crash2"]))
                    {
                        if (scheme["FCrash2"] != true.ToString())
                        {
                            result["flowCalcValue"] = Convert.ToDouble(scheme["Crash2"]);
                            return result;
                        }
                        formula = _oic?.GetFormulaById(scheme["Crash2"]);
                        _oic?.GetParamsByFormulaId(scheme["Crash2"], dt);
                        result["flowCalcValue"] = _oic?.CalcFlowByFormula(formula);
                        return result;
                    }
                }
            }
            return result;
        }
    }
}
