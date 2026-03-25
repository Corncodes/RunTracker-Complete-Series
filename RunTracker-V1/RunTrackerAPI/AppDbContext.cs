using Microsoft.EntityFrameworkCore;

namespace RunTrackerAPI;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Run> Runs => Set<Run>();
}