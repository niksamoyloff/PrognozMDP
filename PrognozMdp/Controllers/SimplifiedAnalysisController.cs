using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
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
    public class SimplifiedAnalysisController : ControllerBase
    {
        private readonly Oic _oic;
        public SimplifiedAnalysisController(Oic oic)
        {
            _oic = oic;
        }

        [HttpGet]
        public async Task<JObject[]> GetSectionsAsync()
        {
            if (_oic == null) return null;

            var sectionCollection = await _oic.GetSectionsFromOicAsync();
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
        public async Task<JObject[]> GetEquipmentBySectionAsync(string sectionId)
        {
            if (_oic == null || string.IsNullOrEmpty(sectionId))
                return null;
            var eqCollection = await _oic.GetEquipmentBySectionFromOicAsync(sectionId);
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
        public async Task<JObject> CalculateFlowBySchemeAsync(string flow, string sectionId, string mask, DateTime? dt)
        {
            if (_oic == null) return null;
            var scheme = await _oic.GetSchemeByBitMaskAsync(sectionId, mask);
            var result = new JObject
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
            _oic.SetOicParamsValues(new[] {"I" + scheme["IDTI"]}, DateTime.Now);

            var flowCurrentValue = Convert.ToDouble(_oic.OicParamsValues?.FirstOrDefault().Value);
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
                        formula = await _oic.GetFormulaByIdAsync(scheme["Max1"]);
                        var parameters = _oic.GetParamsByFormulaIdAsync(scheme["Max1"]).Result;
                        _oic.SetOicParamsValues(parameters, dt);
                        result["flowCalcValue"] = _oic.CalcFlowByFormula(formula);
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
                        formula = await _oic.GetFormulaByIdAsync(scheme["Max2"]);
                        var parameters = _oic.GetParamsByFormulaIdAsync(scheme["Max2"]).Result;
                        _oic.SetOicParamsValues(parameters, dt);
                        result["flowCalcValue"] = _oic.CalcFlowByFormula(formula);
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
                        formula = await _oic.GetFormulaByIdAsync(scheme["Crash1"]);
                        var parameters = _oic.GetParamsByFormulaIdAsync(scheme["Crash1"]).Result;
                        _oic.SetOicParamsValues(parameters, dt);
                        result["flowCalcValue"] = _oic.CalcFlowByFormula(formula);
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
                        formula = await _oic.GetFormulaByIdAsync(scheme["Crash2"]);
                        var parameters = _oic.GetParamsByFormulaIdAsync(scheme["Crash2"]).Result;
                        _oic.SetOicParamsValues(parameters, dt);
                        result["flowCalcValue"] = _oic.CalcFlowByFormula(formula);
                        return result;
                    }
                }
            }
            return result;
        }
    }
}
