using Microsoft.EntityFrameworkCore;
using RunTrackerAPI;

var builder = WebApplication.CreateBuilder(args);

// 1. Tell the app to use Postgres with your Connection String
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// 2. Add "Controllers" (The logic that handles Web Requests)
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.WebHost.UseUrls("http://127.0.0.1:5018");
var app = builder.Build();

// 3. Map the routes so the internet can find your data
app.UseCors();
app.MapControllers();

app.Run();