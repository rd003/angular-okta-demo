using ApiOktaDemo.Api;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
var domain= builder.Configuration["Auth0:Domain"];
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = builder.Configuration["Auth0:Audience"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("read:all", policy => policy.Requirements.Add(new
    HasScopedRequirement("read:all", domain)));
    options.AddPolicy("jobTitle:admin", policy => policy.Requirements.Add(new
   HasScopedRequirement("jobTitle:admin", domain)));
    options.AddPolicy("read:all", policy => policy.Requirements.Add(new
    HasScopedRequirement("read:all", domain)));
    options.AddPolicy("write:all", policy => policy.Requirements.Add(new
   HasScopedRequirement("write:all", domain)));
});

builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

builder.Services.AddCors(op => op.AddDefaultPolicy(
    p => p.WithOrigins("*")
    .AllowAnyHeader()
    .AllowAnyMethod()
    )
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/weatherforecast", () =>
{
    string[] Summaries =
       {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    {
        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        TemperatureC = Random.Shared.Next(-20, 55),
        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    }).ToArray();
}).RequireAuthorization();
app.MapGet("/read-all", () => "read:all scope").RequireAuthorization("read:all");
app.MapGet("/adminonly", () => "jobTitle:admin").RequireAuthorization("jobTitle:admin");

app.Run();


 