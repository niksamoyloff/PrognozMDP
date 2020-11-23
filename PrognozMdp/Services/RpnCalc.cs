using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PrognozMdp.Services
{
    /// <summary>
    /// Calculator for OIC formula in Reverse Polish notation
    /// </summary>
    public class RpnCalc
    {
        public double Calculate(string formula, Dictionary<string, double> paramsDict)
        {
            var stack = new Stack<double>();
            var aliases = new Dictionary<string, double>();
            var paramCount = 0;
            IFormatProvider formatter = new NumberFormatInfo { NumberDecimalSeparator = "." };
            foreach (var element in formula.Trim().Split(' ')) {
                switch (element) {
                    //A+B
                    case "+": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a + b);
                        break;
                    }
                    //A-B
                    case "-": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a - b);
                        break;
                    }
                    //A*B
                    case "*": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a * b);
                        break;
                    }
                    //A/B
                    case "/": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a / b);
                        break;
                    }
                    //A>B
                    case ">": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a > b ? 1 : 0);
                        break;
                    }
                    //A<B
                    case "<": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a < b ? 1 : 0);
                        break;
                    }
                    //A>=B
                    case ">=": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a >= b ? 1 : 0);
                        break;
                    }
                    //A<=B
                    case "{": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a <= b ? 1 : 0);
                        break;
                    }
                    //A<>B
                    case "#": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(!a.Equals(b) ? 1 : 0);
                        break;
                    }
                    //A==B
                    case "=": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a.Equals(b) ? 1 : 0);
                        break;
                    }
                    //ABS(A)
                    case "ca": {
                        var a = stack.Pop();
                        stack.Push(Math.Abs(a));
                        break;
                    }
                    //POS(A)
                    case "cp": {
                        var a = stack.Pop();
                        stack.Push(a > 0 ? a : 0);
                        break;
                    }
                    //NEG(A) 
                    case "cn": {
                        var a = stack.Pop();
                        stack.Push(a < 0 ? a : 0);
                        break;
                    }
                    //COS(A)
                    case "cc": {
                        var a = stack.Pop();
                        stack.Push(Math.Cos(a));
                        break;
                    }
                    //CIN(A)
                    case "cd": {
                        var a = stack.Pop();
                        stack.Push(Math.Sin(a));
                        break;
                    }
                    //TG(A)
                    case "ch": {
                        var a = stack.Pop();
                        stack.Push(Math.Tan(a));
                        break;
                    }
                    //POW(A,B)
                    case "cb": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(Math.Pow(a, b));
                        break;
                    }
                    //EXP(A)
                    case "ce": {
                        var a = stack.Pop();
                        stack.Push(Math.Exp(a));
                        break;
                    }
                    //LOG(A)
                    case "cl": {
                        var a = stack.Pop();
                        stack.Push(Math.Log(a));
                        break;
                    }
                    // Get count of parameters for MAX(A1,...,AN),MIN(A1,...,AN) and Interp(A1,...,AN)
                    case var expression when new Regex(@"\b[i]\d+").IsMatch(expression):
                        paramCount = int.Parse(expression.Substring(1));
                        break;
                    //MAX(A1,...,AN)
                    case "cx":
                    {
                        if (paramCount <= 0)
                            throw new InvalidOperationException("Calculate exception in function MAX(A1,...,AN)");
                        var max = stack.Pop();
                        for (var i = 1; i < paramCount; i++) {
                            var newMax = stack.Pop();
                            if (newMax > max) {
                                max = newMax;
                            }
                        }
                        paramCount = 0;
                        stack.Push(max);
                        break;
                    }
                    //MIN(A1,...,AN)
                    case "cy":
                    {
                        if (paramCount <= 0)
                            throw new InvalidOperationException("Calculate exception in function MIN(A1,...,AN)");
                        var min = stack.Pop();
                        for (var i = 1; i < paramCount; i++) {
                            var newMin = stack.Pop();
                            if (newMin < min) {
                                min = newMin;
                            }
                        }
                        paramCount = 0;
                        stack.Push(min);
                        break;
                    }
                    //SQRT(A)
                    case "cq": {
                        var a = stack.Pop();
                        stack.Push(Math.Sqrt(a));
                        break;
                    }
                    //HYPO (A,B)
                    case "clb": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(Math.Sqrt(Math.Pow(a, 2) + Math.Pow(b, 2)));
                        break;
                    }
                    //IF (A,B,C)
                    case "ci": {
                        var c = stack.Pop();
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(Math.Abs(a) > 0 ? b : c);
                        break;
                    }
                    //IF2 (A,B)
                    case "c2i": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        if (Math.Abs(a) > 0) {
                            stack.Push(b);
                        } else {
                            throw new ArgumentNullException($"Condition exception in function IF2 (A,B), {a}, {b}");
                        }
                        break;
                    }
                    //QDS (A,B,C)
                    case "c2q": {
                        var c = stack.Pop();
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a);
                        //TODO
                        break;
                    }
                    //FMOD (A,B)
                    case "cm": {
                        var b = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(a % b);
                        break;
                    }
                    //ROUND (A,n)
                    case "cld": {
                        var n = stack.Pop();
                        var a = stack.Pop();
                        stack.Push(Math.Round(a, (int)n));
                        break;
                    }
                    //FLOOR (A)
                    case "cz": {
                        var a = stack.Pop();
                        stack.Push(Math.Floor(a));
                        break;
                    }
                    //ATAN (X)
                    case "c2g": {
                        var x = stack.Pop();
                        stack.Push(Math.Atan(x));
                        break;
                    }
                    //ATAN2 (Y,X)
                    case "c2h": {
                        var x = stack.Pop();
                        var y = stack.Pop();
                        stack.Push(Math.Atan2(y, x));
                        break;
                    }
                    //CEIL (A)
                    case "cj": {
                        var a = stack.Pop();
                        stack.Push(Math.Ceiling(a));
                        break;
                    }
                    //EXIT
                    case ")":
                        return stack.Pop();
                    //Aliases D[1..N]V and D[1..N]F
                    case var expression when new Regex(@"\b[D]\d+[F,V]").IsMatch(expression):
                    {
                        // key is D[1..N]
                        var key = expression.Substring(0, expression.Length - 1);
                        if (expression.EndsWith("V"))
                        {
                            stack.Push(aliases[key]);
                            break;
                        }
                        aliases.Add(key, double.NaN);
                        break;
                    }
                    //Parameters [S,I,..][1..N]V
                    case var expression when new Regex(@"[A-Z]{1,2}\d+[V]").IsMatch(expression):
                    {
                        stack.Push(paramsDict[expression]);
                        break;
                    }
                    //A=B
                    case ":":
                    {
                        var lastAlias = aliases.LastOrDefault();
                        var a = stack.Peek();
                        aliases[lastAlias.Key] = a;
                        break;
                    }
                    //OR
                    case "$":
                    {
                        var b = Convert.ToBoolean(stack.Pop());
                        var a = Convert.ToBoolean(stack.Pop());
                        stack.Push(a || b ? 1 : 0);
                        break;
                    }
                    //AND
                    case "@":
                    {
                        var b = Convert.ToBoolean(stack.Pop());
                        var a = Convert.ToBoolean(stack.Pop());
                        stack.Push(a && b ? 1 : 0);
                        break;
                    }
                    //Interp(K,X,X1,Y1,...,XN,YN)
                    case "c2j":
                    {
                        if (paramCount <= 0)
                            throw new InvalidOperationException("Calculate exception in function Interp(A1,...,AN)");

                        var listXi = new List<double>();
                        var listYi = new List<double>();
                        double X = 0;
                        double K = 0;
                        double result = 0;

                        for (var i = 0; i < paramCount; i++) 
                        {
                            if (i < paramCount - 2)
                            {
                                if (i % 2 == 0)
                                    listYi.Add(stack.Pop());
                                else
                                    listXi.Add(stack.Pop());
                            }
                            if (i == paramCount - 2)
                                X = stack.Pop();
                            if (i == paramCount - 1)
                                K = stack.Pop();
                        }

                        switch (K)
                        {
                            case 1:
                            {
                                result = LagrangeInterpolation(X, listXi.ToArray(), listYi.ToArray());
                                break;
                            }
                        }

                        paramCount = 0;
                        stack.Push(result);
                        break;
                    }
                    default:
                    {
                        var el = element.StartsWith("r") ? element.Substring(1) : element;
                        stack.Push(double.Parse(el, formatter));
                        break;
                    }
                }
            }

            if (stack.Count == 1)
                return stack.Pop();
            return 0;
        }

        public double LagrangeInterpolation(double x, double[] xd, double[] yd)
        {
            if (xd.Length != yd.Length)
            {
                throw new ArgumentException("Arrays must be of equal length.");
            }
            double sum = 0;
            for (int i = 0, n = xd.Length; i < n; i++)
            {
                if (x - xd[i] == 0)
                {
                    return yd[i];
                }
                var product = yd[i];
                for (var j = 0; j < n; j++)
                {
                    if ((i == j) || (xd[i] - xd[j] == 0))
                    {
                        continue;
                    }
                    product *= (x - xd[j]) / (xd[i] - xd[j]);
                }
                sum += product;
            }
            return sum;
        }
    }
}
