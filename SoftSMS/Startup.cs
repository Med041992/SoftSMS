using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using SoftSMS.Data.Data;
using SoftSMS.Data.Entities;
using SoftSMS.Data.Interfaces;

namespace SoftSMS.MVC
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
            /* services.AddControllersWithViews();
             services.AddDbContext<DataContext>(options =>
             { options.UseSqlServer(Configuration.GetConnectionString("SoftSMSDB"));
                 services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));
             });*/
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            GlobalVariable.ConnectionString = Configuration.GetConnectionString("DB");

                services.Configure<CookiePolicyOptions>(options =>
                {
                    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                    options.CheckConsentNeeded = context => true;
                    options.MinimumSameSitePolicy = SameSiteMode.None;
                });

                //services.AddDbContext<TP_SMSContext>(options => options.UseSqlServer(GlobalVariable.ConnectionString));
                services.AddMvc(options =>
                {
                    options.EnableEndpointRouting = false;

                }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

                services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => options.AccessDeniedPath = "/Account/Denied");

                services.AddAuthorization(options =>
                {
                    options.AddPolicy("Invio_SMS", policy =>
                    {
                        policy.RequireAssertion(context => checkUserPolicy(context, "Invio_SMS"));
                    });
                    options.AddPolicy("Lavora_SMS", policy =>
                    {
                        policy.RequireAssertion(context => checkUserPolicy(context, "Lavora_SMS"));
                    });
                    options.AddPolicy("Report_SMS", policy =>
                    {
                        policy.RequireAssertion(context => checkUserPolicy(context, "Report_SMS"));
                    });
                    options.AddPolicy("Dashboard", policy =>
                    {
                        policy.RequireAssertion(context => checkUserPolicy(context, "Dashboard"));
                    });
                    options.AddPolicy("Gestione_Utenze", policy =>
                    {
                        policy.RequireAssertion(context => checkUserPolicy(context, "Gestione_Utenze"));
                    });
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
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();
            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Login}/{action=Index}/{id?}");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "login",
                    pattern: "{controller=Login}/{action=Login}/{id?}");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "writeSMS",
                    pattern: "{controller=SMS}/{action=Write}/{id?}");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "predefined",
                    pattern: "{controller=SMS}/{action=Display}/{id?}");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "ldap",
                    pattern: "{controller=LDAP}/{action=Display}/{id?}");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Group}/{action=display}/{id?}");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=SMS}/{action=WritePredef}/{id?}");
            });
            
        }
        private bool checkUserPolicy(AuthorizationHandlerContext context, string permissionName)
        {
            var result = false;
            try
            {
                string nome = context.User.Identity.Name.Split("\\").Last();
                int[] PermissionsOnRole = { };
                int permissionId = 0;

                using (var db = new DataContext())
                {
                    /*permissionId = db.SmsPermissions.First(s => s.PerName.Equals(permissionName)).PerId;
                    int roleId = db.SmsUserRole.First(s => s.UroAgentLogin.Equals(nome) && s.UroActive.Equals(true)).UroFkRolId;
                    PermissionsOnRole = db.SmsRolesPermissions.Where(prm => prm.RpeFkRolId == roleId).Select(e => e.RpeFkPerId).ToArray();*/
                }
                if (PermissionsOnRole.Contains(permissionId))
                {
                    result = true;
                }
            }
            catch (Exception ex)
            {
                Log.Logger.Fatal($"Problem with checking permission{permissionName} for user {context.User.Identity.Name} \n\t Message: {ex.Message} " +
                    $"\n\t StackTrace: {ex.StackTrace}");
                result = false;
            }

            return result;
        }
    }
}
