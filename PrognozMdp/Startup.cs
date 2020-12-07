using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using OICDAC;
using PrognozMdp.Controllers;
using PrognozMdp.Services;

namespace PrognozMdp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            DAC dac = new DACClass();
            Oic oic = new Oic(Configuration, dac);
            services.AddSingleton(oic);
            services.AddSingleton(dac);

            //services.AddControllers().AddNewtonsoftJson();
            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            }).AddNewtonsoftJson();

            //services.AddControllersWithViews();
            //services.AddScoped<Oic>();
            //services.AddTransient(ctx => new SimplifiedAnalysisController(new Oic(Configuration)));
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();


            app.UsePathBase("/prognozmdp-tst");

            app.Use((context, next) =>
            {
                context.Request.PathBase = "/prognozmdp-tst";
                return next();
            });
            app.UseMvc();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            //app.UseMvc(routes =>
            //{
            //    if (env.IsDevelopment())
            //    {
            //        routes.MapRoute(
            //            name: "default",
            //            template: "prognozmdp-tst/{controller}/{action=GetData}");
            //    }
            //    if (env.IsProduction())
            //    {
            //        routes.MapRoute(
            //            name: "default",
            //            template: "{controller}/{action=GetData}");
            //    }                
            //});

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
